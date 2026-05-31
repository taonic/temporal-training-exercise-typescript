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
const appDir = "/opt/app";
const temporalBin = "/usr/local/bin/temporal";
const temporalUiPort = 8233;

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

  async launchAndRun(exerciseId, files, events, onUiReady) {
    const exercise = await resolveExercise(exerciseId);
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
      const workflowResult = await this.startWorkerAndRunStarter(sandbox, exercise, events);
      return { ...uiInfo, workflowResult };
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

  async runEdited(sandboxId, exerciseId, files, events) {
    const exercise = await resolveExercise(exerciseId);
    events.log("Resolving sandbox...");
    const sandbox = await this.daytona.get(sandboxId);
    await this.uploadExercise(sandbox, exercise, files);
    return this.startWorkerAndRunStarter(sandbox, exercise, events, { restartWorker: true });
  }

  async stop(sandboxId) {
    const sandbox = await this.daytona.get(sandboxId);
    await sandbox.delete();
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

  async startWorkerAndRunStarter(sandbox, exercise, events, opts = {}) {
    if (opts.restartWorker) {
      events.log("Stopping previous worker...");
      await sandbox.process.executeCommand(`pkill -f "${exercise.workerProcessPattern}" 2>/dev/null; true`);
      try {
        await sandbox.process.deleteSession("worker");
      } catch {
        /* no worker session */
      }
    }

    events.log("Starting worker...");
    events.log(`$ ${exercise.worker}`);
    await sandbox.process.createSession("worker");
    await sandbox.process.executeSessionCommand("worker", {
      command: `cd ${appDir} && ${exercise.worker}`,
      runAsync: true,
    });
    await sleep(3000);

    events.log("Triggering starter...");
    events.log(`$ ${exercise.starter}`);
    const result = await sandbox.process.executeCommand(
      `cd ${appDir} && ${exercise.starter}`,
      undefined,
      undefined,
      120,
    );
    if (result.exitCode !== 0) throw new Error(`Workflow run failed: ${result.result}`);
    const output = (result.result ?? "").trim();
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
      const result = body.sandboxId
        ? await getManager().runEdited(body.sandboxId, body.exerciseId, body.files, events)
        : await getManager().launchAndRun(body.exerciseId, body.files, events, (ui) => writeSse(res, "ui", ui));
      writeSse(res, "result", typeof result === "string" ? { workflowResult: result } : result);
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
      await getManager().stop(body.sandboxId);
      json(res, 200, { ok: true });
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
