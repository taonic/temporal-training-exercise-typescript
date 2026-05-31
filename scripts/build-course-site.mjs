import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const courseDir = path.join(rootDir, "course");
const outputPath = path.join(courseDir, "course-data.js");

const sourceExtensions = new Set([".ts", ".tsx", ".js", ".json"]);
const preferredOrder = [
  "src/workflow.ts",
  "src/activities.ts",
  "src/models.ts",
  "src/worker/index.ts",
  "src/starter/index.ts",
  "src/workflow.test.ts",
];
const inputFiles = [];

function sortFiles(a, b) {
  const ai = preferredOrder.indexOf(a.path);
  const bi = preferredOrder.indexOf(b.path);
  if (ai !== -1 || bi !== -1) {
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  }
  return a.path.localeCompare(b.path);
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readInputFile(filePath) {
  inputFiles.push(filePath);
  return fs.readFile(filePath, "utf8");
}

async function walk(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(abs, baseDir)));
    } else if (sourceExtensions.has(path.extname(entry.name))) {
      files.push(path.relative(baseDir, abs).split(path.sep).join("/"));
    }
  }
  return files;
}

function titleFromReadme(markdown, fallback) {
  const line = markdown
    .split("\n")
    .find((item) => item.startsWith("# "));
  return line ? line.replace(/^#\s+/, "").trim() : fallback;
}

function durationFromTitle(title) {
  const match = title.match(/\(([^)]+)\)\s*$/);
  return match ? match[1] : "";
}

async function readExercise(entry) {
  const number = Number(entry.name.replace("exercise", ""));
  const exerciseDir = path.join(rootDir, entry.name);
  const readmePath = path.join(exerciseDir, "README.md");
  const solutionPath = path.join(exerciseDir, "SOLUTION.md");
  // Sandbox-specific, step-by-step instructions tailored to the click-to-run
  // browser environment. Falls back to the generic README when absent.
  const sandboxPath = path.join(exerciseDir, "SANDBOX.md");
  const readme = await readInputFile(readmePath);
  const solutionDir = path.join(rootDir, `solution${number}`);
  const solutionContent = {};
  if (await exists(path.join(solutionDir, "src"))) {
    const solutionPaths = await walk(path.join(solutionDir, "src"), solutionDir);
    await Promise.all(
      solutionPaths.map(async (filePath) => {
        solutionContent[filePath] = await readInputFile(path.join(solutionDir, filePath));
      }),
    );
  }
  const sourcePaths = await walk(path.join(exerciseDir, "src"), exerciseDir);
  const files = await Promise.all(
    sourcePaths.map(async (filePath) => {
      const file = {
        path: filePath,
        content: await readInputFile(path.join(exerciseDir, filePath)),
      };
      if (filePath in solutionContent) file.solution = solutionContent[filePath];
      return file;
    }),
  );

  const title = titleFromReadme(readme, `Exercise ${number}`);

  return {
    id: entry.name,
    number,
    title,
    duration: durationFromTitle(title),
    root: entry.name,
    readme,
    sandbox: (await exists(sandboxPath)) ? await readInputFile(sandboxPath) : "",
    solution: (await exists(solutionPath)) ? await readInputFile(solutionPath) : "",
    files: files.sort(sortFiles),
  };
}

const entries = await fs.readdir(rootDir, { withFileTypes: true });
const exercises = (
  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && /^exercise\d+$/.test(entry.name))
      .map(readExercise),
  )
).sort((a, b) => a.number - b.number);
const generatedAt = new Date(
  Math.max(...(await Promise.all(inputFiles.map(async (filePath) => (await fs.stat(filePath)).mtimeMs)))),
).toISOString();

const data = {
  generatedAt,
  title: "Temporal TypeScript Training",
  exercises,
};

const json = JSON.stringify(data, null, 2)
  .replace(/<\/script/gi, "<\\/script")
  .replace(/\u2028/g, "\\u2028")
  .replace(/\u2029/g, "\\u2029");

await fs.mkdir(courseDir, { recursive: true });
await fs.writeFile(outputPath, `window.COURSE_DATA = ${json};\n`);
console.log(`Built ${path.relative(rootDir, outputPath)} with ${exercises.length} exercises.`);
