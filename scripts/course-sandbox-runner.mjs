import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

import { Daytona, Image } from "@daytonaio/sdk";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runtimePackagePath = path.join(rootDir, "course", "runtime", "typescript", "package.json");
const tsconfigPath = path.join(rootDir, "tsconfig.json");

const host = process.env.HOST ?? "127.0.0.1";
const port = Number(process.env.PORT ?? 8787);
// In production (Fly.io) a single process serves both the built course site and
// the /api/* endpoints from the same origin, so the SPA's relative /api calls
// keep working. In local dev Vite serves the site and proxies /api here, so this
// stays unset and the runner only answers the API.
const distDir = process.env.COURSE_DIST_DIR
  ? path.resolve(process.env.COURSE_DIST_DIR)
  : null;
const appDir = "/opt/app";
const temporalBin = "/usr/local/bin/temporal";
const temporalUiPort = 8233;
// How long the starter may wait for its Workflow to finish. The Workflow can sit
// idle waiting for a worker (e.g. when the worker is started *after* the starter)
// or for a signal, so this is generous - it's only a safety net to avoid hanging
// forever, kept under the sandbox auto-stop interval.
const starterTimeoutMs = 10 * 60_000;

const temporalCliInstall = [
  "apt-get update",
  "apt-get install -y --no-install-recommends curl ca-certificates",
  'arch=$(uname -m | sed "s/x86_64/amd64/;s/aarch64/arm64/")',
  'curl -fsSL "https://temporal.download/cli/archive/latest?platform=linux&arch=$arch" -o /tmp/t.tgz',
  `tar -xzf /tmp/t.tgz -C ${path.dirname(temporalBin)} temporal`,
  `chmod +x ${temporalBin}`,
  "rm /tmp/t.tgz",
  "rm -rf /var/lib/apt/lists/*",
].join(" && ");

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function writeSse(res, kind, payload) {
  res.write(`data: ${JSON.stringify({ kind, payload })}\n\n`);
}

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json; charset=utf-8",
};

// Serves the built SPA from distDir. Unknown paths fall back to index.html so
// client-side routing works; hashed assets get long-lived caching, the entry
// HTML stays uncached so deploys are picked up.
async function serveStatic(req, res, urlPath) {
  const rel = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(distDir, rel);
  if (!filePath.startsWith(distDir)) filePath = path.join(distDir, "index.html");

  let body;
  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) throw new Error("is a directory");
    body = await fs.readFile(filePath);
  } catch {
    filePath = path.join(distDir, "index.html");
    body = await fs.readFile(filePath);
  }

  const ext = path.extname(filePath).toLowerCase();
  const isAsset = filePath.includes(`${path.sep}assets${path.sep}`);
  res.writeHead(200, {
    "Content-Type": contentTypes[ext] ?? "application/octet-stream",
    "Cache-Control": isAsset ? "public, max-age=31536000, immutable" : "no-cache",
  });
  res.end(req.method === "HEAD" ? undefined : body);
}

async function sourceFilePaths(exerciseId) {
  const dir = path.join(rootDir, exerciseId, "src");
  const out = [];
  async function walk(current, base = dir) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(abs, base);
      else if (/\.(ts|tsx|js|json)$/.test(entry.name)) {
        out.push(path.relative(base, abs).split(path.sep).join("/"));
      }
    }
  }
  await walk(dir);
  return out.sort();
}

async function resolveExercise(exerciseId) {
  if (!/^exercise\d+$/.test(exerciseId ?? "")) {
    throw new Error("exerciseId must be an exercise directory such as exercise1");
  }
  const exerciseDir = path.join(rootDir, exerciseId);
  await fs.access(exerciseDir);
  const files = await sourceFilePaths(exerciseId);
  return {
    id: exerciseId,
    dir: exerciseDir,
    files,
    worker: `npx ts-node ${exerciseId}/src/worker/index.ts`,
    starter: `npx ts-node ${exerciseId}/src/starter/index.ts`,
    workerProcessPattern: `${exerciseId}/src/worker/index.ts`,
  };
}

function runtimeImage() {
  return Image.base("node:20-bookworm-slim")
    .runCommands(temporalCliInstall)
    .workdir(appDir)
    .addLocalFile(runtimePackagePath, `${appDir}/package.json`)
    .runCommands(`cd ${appDir} && npm install --silent`);
}

class CourseSandboxManager {
  constructor() {
    if (!process.env.DAYTONA_KEY) {
      throw new Error("DAYTONA_KEY environment variable is required");
    }
    this.daytona = new Daytona({ apiKey: process.env.DAYTONA_KEY });
  }

  // Dispatches a run request. `action` selects which parts run:
  //   "worker"  - (re)start the long-running worker, creating the sandbox if needed
  //   "starter" - run the starter once against an already-running worker
  //   "all"     - the combined flow: (re)start the worker, then run the starter
  async run({ action = "all", sandboxId, exerciseId, files }, events, onUiReady) {
    const exercise = await resolveExercise(exerciseId);
    const wantWorker = action === "all" || action === "worker";
    const wantStarter = action === "all" || action === "starter";

    let sandbox = sandboxId ? await this.resolveRunningSandbox(sandboxId, events) : null;
    let uiInfo = {};
    let created = false;
    if (sandbox) {
      await this.uploadExercise(sandbox, exercise, files);
    } else {
      // No usable sandbox (never created, or the previous one expired) - make a
      // fresh one. createSandbox brings up Temporal and emits the new UI info.
      ({ sandbox, uiInfo } = await this.createSandbox(exercise, files, events, onUiReady));
      created = true;
    }

    // A freshly created sandbox has no worker yet, so even a starter-only run
    // must start one first.
    const mustStartWorker = wantWorker || (created && wantStarter);
    try {
      if (mustStartWorker) await this.startWorker(sandbox, exercise, events);
      const out = {};
      if (wantStarter) out.workflowResult = await this.runStarter(sandbox, exercise, events);
      return { ...uiInfo, sandboxId: sandbox.id, ...out };
    } catch (err) {
      if (created) {
        events.log(`Launch failed: ${err.message}. Cleaning up sandbox...`);
        try {
          await sandbox.delete();
        } catch (cleanupErr) {
          events.log(`Cleanup error ignored: ${cleanupErr.message}`);
        }
      }
      throw err;
    }
  }

  // Returns the existing sandbox only if it's still usable. Sandboxes auto-stop
  // after a period of inactivity and are auto-deleted soon after, so a stored id
  // may point at something that's been deleted (get throws) or merely stopped
  // (state !== "started"). In either "expired" case we discard it - and delete a
  // stale stopped one - so the caller creates a fresh sandbox instead.
  async resolveRunningSandbox(sandboxId, events) {
    events.log("Resolving sandbox...");
    let sandbox;
    try {
      sandbox = await this.daytona.get(sandboxId);
    } catch (err) {
      events.log(`Sandbox ${sandboxId} is gone (${err.message}). Starting a new one...`);
      return null;
    }
    try {
      await sandbox.refreshData();
    } catch {
      /* best effort - fall back to whatever state get() returned */
    }
    if (sandbox.state && sandbox.state !== "started") {
      events.log(`Sandbox ${sandboxId} is ${sandbox.state}. Starting a new one...`);
      try {
        await sandbox.delete();
      } catch {
        /* it will be auto-deleted anyway */
      }
      return null;
    }
    return sandbox;
  }

  async createSandbox(exercise, files, events, onUiReady) {
    events.log(`Creating sandbox for ${exercise.id}...`);
    const sandbox = await this.daytona.create(
      {
        image: runtimeImage(),
        language: "typescript",
        autoStopInterval: 15,
        autoDeleteInterval: 30,
        resources: { disk: 1, memory: 2 },
      },
      { timeout: 120 },
    );

    try {
      events.log(`Sandbox created: ${sandbox.id}`);
      await this.uploadExercise(sandbox, exercise, files);
      await this.startTemporal(sandbox, events);
      const preview = await sandbox.getSignedPreviewUrl(temporalUiPort, 3600);
      const uiInfo = { sandboxId: sandbox.id, uiUrl: preview.url };
      events.log(`Temporal UI: ${preview.url}`);
      onUiReady(uiInfo);
      return { sandbox, uiInfo };
    } catch (err) {
      events.log(`Launch failed: ${err.message}. Cleaning up sandbox...`);
      try {
        await sandbox.delete();
      } catch (cleanupErr) {
        events.log(`Cleanup error ignored: ${cleanupErr.message}`);
      }
      throw err;
    }
  }

  async stop(sandboxId) {
    const sandbox = await this.daytona.get(sandboxId);
    await sandbox.delete();
  }

  async stopWorker(sandboxId) {
    const sandbox = await this.daytona.get(sandboxId);
    await sandbox.process.executeCommand(`pkill -f "src/worker/index.ts" 2>/dev/null; true`);
    try {
      await sandbox.process.deleteSession("worker");
    } catch {
      /* no worker session */
    }
  }

  async uploadExercise(sandbox, exercise, files) {
    await sandbox.fs.uploadFile(await fs.readFile(tsconfigPath), `${appDir}/tsconfig.json`);
    const dirs = new Set([`${appDir}/${exercise.id}`, `${appDir}/${exercise.id}/src`]);
    for (const file of exercise.files) {
      const remotePath = `${appDir}/${exercise.id}/src/${file}`;
      dirs.add(path.posix.dirname(remotePath));
    }
    for (const dir of [...dirs].sort((a, b) => a.length - b.length)) {
      try {
        await sandbox.fs.createFolder(dir, "755");
      } catch {
        /* already exists */
      }
    }
    for (const file of exercise.files) {
      const incoming = files?.[`src/${file}`] ?? files?.[file];
      const content =
        incoming === undefined
          ? await fs.readFile(path.join(exercise.dir, "src", file), "utf8")
          : String(incoming).replace(/\r\n/g, "\n");
      await sandbox.fs.uploadFile(Buffer.from(content), `${appDir}/${exercise.id}/src/${file}`);
    }
  }

  async startTemporal(sandbox, events) {
    events.log("Starting Temporal dev server...");
    await sandbox.process.createSession("temporal-server");
    const response = await sandbox.process.executeSessionCommand("temporal-server", {
      command: `${temporalBin} server start-dev --ip 0.0.0.0 --ui-ip 0.0.0.0 --log-level warn --search-attribute AccountId=Keyword --search-attribute TransferStatus=Keyword`,
      runAsync: true,
    });
    await this.waitForTemporal(sandbox, "temporal-server", response.cmdId, events);
  }

  // (Re)starts the long-running worker. Killing any existing worker first makes
  // this safe to call whether or not one is already running.
  async startWorker(sandbox, exercise, events) {
    events.log("Stopping previous worker...");
    await sandbox.process.executeCommand(`pkill -f "${exercise.workerProcessPattern}" 2>/dev/null; true`);
    try {
      await sandbox.process.deleteSession("worker");
    } catch {
      /* no worker session */
    }

    events.log("Starting worker...");
    events.log(`$ ${exercise.worker}`);
    await sandbox.process.createSession("worker");
    await sandbox.process.executeSessionCommand("worker", {
      command: `cd ${appDir} && ${exercise.worker}`,
      runAsync: true,
    });
    await sleep(3000);
  }

  // Runs the starter once and returns its output. We launch it as an async
  // session command and poll for completion instead of using a fixed command
  // timeout, so a Workflow that's waiting for a worker (started after the
  // starter) or for a signal doesn't time out before it can finish.
  async runStarter(sandbox, exercise, events) {
    events.log("Triggering starter...");
    events.log(`$ ${exercise.starter}`);

    // A fresh session each run; drop any leftover one so a re-run cleanly
    // supersedes (and kills) a previous starter command.
    try {
      await sandbox.process.deleteSession("starter");
    } catch {
      /* no previous starter session */
    }
    await sandbox.process.createSession("starter");
    const { cmdId } = await sandbox.process.executeSessionCommand("starter", {
      command: `cd ${appDir} && ${exercise.starter}`,
      runAsync: true,
    });

    const startedAt = Date.now();
    const deadline = startedAt + starterTimeoutMs;
    let command;
    while (Date.now() < deadline) {
      command = await sandbox.process.getSessionCommand("starter", cmdId);
      if (command?.exitCode !== null && command?.exitCode !== undefined) break;
      events.spinner(`Waiting for the Workflow to finish (${Math.round((Date.now() - startedAt) / 1000)}s)...`);
      await sleep(1500);
    }
    events.spinner("");

    // Prefer the clean stdout channel (where the starter's console.log lands).
    // The combined `output` log can interleave stderr or a trailing session
    // marker, which would stop the result's last line from matching the
    // exercise's expected output and suppress the success confetti.
    const logs = await sandbox.process.getSessionCommandLogs("starter", cmdId);
    const output = (logs?.stdout || logs?.output || "").trim();
    try {
      await sandbox.process.deleteSession("starter");
    } catch {
      /* best-effort cleanup */
    }

    if (command?.exitCode === null || command?.exitCode === undefined) {
      throw new Error("Workflow did not finish in time - is the worker running?");
    }
    if (command.exitCode !== 0) throw new Error(`Workflow run failed: ${output}`);
    events.log("Workflow output:");
    for (const line of output.split("\n")) events.log(`  ${line}`);
    return output;
  }

  async waitForTemporal(sandbox, sessionId, cmdId, events) {
    const deadline = Date.now() + 120_000;
    await sleep(3000);
    while (Date.now() < deadline) {
      const result = await sandbox.process.executeCommand(
        `${temporalBin} operator cluster health 2>&1`,
        undefined,
        undefined,
        10,
      );
      if (result.exitCode === 0) return;
      await sleep(2000);
    }
    try {
      const logs = await sandbox.process.getSessionCommandLogs(sessionId, cmdId);
      const tail = (logs?.output || logs?.stderr || logs?.stdout || "").trim();
      if (tail) {
        events.log("temporal-server output:");
        for (const line of tail.split("\n").slice(-20)) events.log(`  ${line}`);
      }
    } catch (err) {
      events.log(`Could not fetch Temporal server logs: ${err.message}`);
    }
    throw new Error("Temporal dev server did not become healthy within 120 seconds");
  }
}

let manager;
function getManager() {
  if (!manager) manager = new CourseSandboxManager();
  return manager;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${host}:${port}`);
  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      json(res, 200, {
        ok: true,
        daytona: Boolean(process.env.DAYTONA_KEY),
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/run") {
      const body = await readJson(req);
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      });
      const events = {
        log: (message) => writeSse(res, "log", message),
        spinner: (message) => writeSse(res, "spinner", message),
      };
      const result = await getManager().run(body, events, (ui) => writeSse(res, "ui", ui));
      writeSse(res, "result", result);
      writeSse(res, "done", null);
      res.end();
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/stop") {
      const body = await readJson(req);
      if (!body.sandboxId) {
        json(res, 400, { error: "sandboxId required" });
        return;
      }
      if (body.target === "worker") {
        await getManager().stopWorker(body.sandboxId);
      } else {
        await getManager().stop(body.sandboxId);
      }
      json(res, 200, { ok: true });
      return;
    }

    if (distDir && (req.method === "GET" || req.method === "HEAD") && !url.pathname.startsWith("/api/")) {
      await serveStatic(req, res, url.pathname);
      return;
    }

    json(res, 404, { error: "not found" });
  } catch (err) {
    if (res.headersSent) {
      writeSse(res, "error", err.message);
      writeSse(res, "done", null);
      res.end();
    } else {
      json(res, 500, { error: err.message });
    }
  }
});

server.listen(port, host, () => {
  console.log(`Course runner listening on http://${host}:${port}`);
});
