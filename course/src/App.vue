<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import { launchConfetti } from "./confetti.js";
import {
  highlightCode,
  labelForPath,
  renderMarkdown,
  splitWalkthrough,
  storageKey,
  storagePrefix,
  titleWithoutDuration,
} from "./course-utils.js";

function initialTheme() {
  const saved = localStorage.getItem(`${storagePrefix}:theme`);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const course = window.COURSE_DATA;

// The success line each exercise's starter prints. Exercise 1 greets; every
// money-transfer exercise (2-8) ends with the same line. A run is "correct"
// when the workflow output's last non-empty line matches (earlier lines like
// "Status: PENDING" are ignored).
const expectedOutputs = { exercise1: "Hello, Temporal!" };
const defaultExpectedOutput = "Transfer completed successfully";

function outputMatchesExpected(exerciseId, output) {
  const expected = expectedOutputs[exerciseId] ?? defaultExpectedOutput;
  const trimmed = String(output ?? "").trim();
  if (!trimmed) return false;
  if (trimmed === expected) return true;
  const lines = trimmed.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines[lines.length - 1] === expected;
}

const state = reactive({
  exerciseIndex: initialExerciseIndex(),
  theme: initialTheme(),
  activeFilePath: "",
  fileView: "exercise",
  toast: "",
  sandboxStatus: "checking",
  sandboxAvailable: false,
  sandboxMessage: "",
  sandboxId: localStorage.getItem(`${storagePrefix}:sandbox-id`) ?? "",
  temporalUiUrl: localStorage.getItem(`${storagePrefix}:temporal-ui-url`) ?? "",
  runnerPanel: "console",
  logs: [],
  spinner: "",
  workflowOutput: "",
  running: false,
  codeWidth: localStorage.getItem(`${storagePrefix}:code-width`) ?? "",
  dockHeight: localStorage.getItem(`${storagePrefix}:dock-height`) ?? "",
});

const editorValue = ref("");
const walkVersion = ref(0);
const editorRef = ref(null);
const highlightRef = ref(null);
let toastTimer = 0;
let abortController = null;

const highlightedCode = computed(() => `${highlightCode(editorValue.value)}\n`);
const themeToggleLabel = computed(() => (state.theme === "dark" ? "Light mode" : "Dark mode"));
const viewToggleLabel = computed(() =>
  state.fileView === "solution" ? "Switch to exercise" : "Switch to solution",
);

const currentExercise = computed(() => course.exercises[state.exerciseIndex]);
const currentFiles = computed(() => currentExercise.value?.files ?? []);
const hasSolution = computed(() => currentFiles.value.some((file) => typeof file.solution === "string"));
const currentFile = computed(() =>
  currentFiles.value.find((file) => file.path === state.activeFilePath) ?? currentFiles.value[0],
);
const walkthrough = computed(() =>
  currentExercise.value.sandbox ? splitWalkthrough(currentExercise.value.sandbox) : null,
);
const walkState = computed(() => {
  walkVersion.value;
  return readWalkState(currentExercise.value);
});
const instructionHtml = computed(() => renderMarkdown(currentExercise.value.readme));
const editorStats = computed(() => {
  const value = editorValue.value;
  const lines = value.length ? value.split("\n").length : 0;
  return `${lines} lines - ${value.length} chars`;
});
const canRunSandbox = computed(() => state.sandboxAvailable);
const canStopSandbox = computed(() => !!state.sandboxId && !state.running);
const generatedAt = computed(() => `Course data ${new Date(course.generatedAt).toLocaleString()}`);

function initialExerciseIndex() {
  const fromHash = window.location.hash.replace(/^#/, "");
  const found = course.exercises.findIndex((exercise) => exercise.id === fromHash);
  return found >= 0 ? found : 0;
}

function readWalkState(exercise) {
  try {
    const raw = localStorage.getItem(storageKey("walk", exercise.id));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setWalkStep(id, checked) {
  const saved = readWalkState(currentExercise.value);
  saved[id] = checked;
  localStorage.setItem(storageKey("walk", currentExercise.value.id), JSON.stringify(saved));
  walkVersion.value += 1;
}

// The editor has two independent views: the exercise (starter) and the solution.
// Each keeps its own edits in localStorage, so toggling between them never
// overwrites the other view's work.
function fileStorageKey(filePath) {
  const prefix = state.fileView === "solution" ? "sol-edit" : "edit";
  return storageKey(prefix, currentExercise.value.id, filePath);
}

// Pristine content for the active view (solution falls back to starter when a
// file has no solution variant).
function baseContent(file) {
  return state.fileView === "solution" && typeof file.solution === "string"
    ? file.solution
    : file.content;
}

function fileContent(file) {
  return localStorage.getItem(fileStorageKey(file.path)) ?? baseContent(file);
}

function isDirty(file) {
  return fileContent(file) !== baseContent(file);
}

function allEditedFiles() {
  return Object.fromEntries(currentFiles.value.map((file) => [file.path, fileContent(file)]));
}

function activateFile(filePath) {
  state.activeFilePath = filePath;
  localStorage.setItem(storageKey("active-file", currentExercise.value.id), filePath);
  syncEditorFromState();
}

function syncEditorFromState() {
  if (!currentFile.value) {
    editorValue.value = "";
    return;
  }
  editorValue.value = fileContent(currentFile.value);
}

function persistCurrentEdit() {
  if (!currentFile.value) return;
  if (editorValue.value === baseContent(currentFile.value)) {
    localStorage.removeItem(fileStorageKey(currentFile.value.path));
  } else {
    localStorage.setItem(fileStorageKey(currentFile.value.path), editorValue.value);
  }
}

function selectExercise(index) {
  state.exerciseIndex = Math.max(0, Math.min(course.exercises.length - 1, index));
  state.fileView = "exercise";
  const exercise = currentExercise.value;
  const savedFile = localStorage.getItem(storageKey("active-file", exercise.id));
  state.activeFilePath = exercise.files.some((file) => file.path === savedFile)
    ? savedFile
    : exercise.files[0]?.path ?? "";
  state.logs = [];
  state.workflowOutput = "";
  syncEditorFromState();
  updateHash();
}

function updateHash() {
  const exercise = currentExercise.value;
  if (window.location.hash !== `#${exercise.id}`) {
    history.replaceState(null, "", `#${exercise.id}`);
  }
}

function resetCurrentFile() {
  if (!currentFile.value) return;
  localStorage.removeItem(fileStorageKey(currentFile.value.path));
  syncEditorFromState();
  showToast("File reset");
}

function toggleFileView() {
  state.fileView = state.fileView === "solution" ? "exercise" : "solution";
  syncEditorFromState();
  showToast(state.fileView === "solution" ? "Showing solution" : "Showing exercise");
}

function showToast(message) {
  state.toast = message;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    state.toast = "";
  }, 1700);
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(`${storagePrefix}:theme`, theme);
}

function syncEditorScroll() {
  if (!editorRef.value || !highlightRef.value) return;
  highlightRef.value.scrollTop = editorRef.value.scrollTop;
  highlightRef.value.scrollLeft = editorRef.value.scrollLeft;
}

// Drag-driven splitters. `onMove` maps the pointer position to a size, `persist`
// stores the final value, and we clamp inside each move so the panes stay usable.
function startDrag(event, onMove, persist) {
  event.preventDefault();
  const previousCursor = document.body.style.cursor;
  document.body.style.userSelect = "none";
  document.body.style.cursor = event.currentTarget.dataset.cursor ?? "default";
  const handleMove = (e) => onMove(e);
  const handleUp = () => {
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
    document.body.style.userSelect = "";
    document.body.style.cursor = previousCursor;
    persist();
  };
  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", handleUp);
}

function startPaneResize(event) {
  const shell = event.currentTarget.parentElement;
  startDrag(
    event,
    (e) => {
      const styles = getComputedStyle(shell);
      const padLeft = parseFloat(styles.paddingLeft) || 0;
      const padRight = parseFloat(styles.paddingRight) || 0;
      const rect = shell.getBoundingClientRect();
      const inner = rect.width - padLeft - padRight;
      if (inner <= 0) return;
      const ratio = ((e.clientX - rect.left - padLeft) / inner) * 100;
      state.codeWidth = `${Math.min(78, Math.max(28, ratio)).toFixed(2)}%`;
    },
    () => localStorage.setItem(`${storagePrefix}:code-width`, state.codeWidth),
  );
}

function startDockResize(event) {
  const dock = event.currentTarget.nextElementSibling;
  const startY = event.clientY;
  const startHeight = dock.getBoundingClientRect().height;
  startDrag(
    event,
    (e) => {
      const next = startHeight - (e.clientY - startY);
      state.dockHeight = `${Math.round(Math.min(640, Math.max(120, next)))}px`;
    },
    () => localStorage.setItem(`${storagePrefix}:dock-height`, state.dockHeight),
  );
}

function handleEditorKeydown(event) {
  if (event.key !== "Tab") return;
  event.preventDefault();
  const target = event.target;
  const start = target.selectionStart;
  const end = target.selectionEnd;
  editorValue.value = `${editorValue.value.slice(0, start)}  ${editorValue.value.slice(end)}`;
  nextTick(() => {
    target.selectionStart = start + 2;
    target.selectionEnd = start + 2;
  });
}

async function checkSandbox() {
  state.sandboxStatus = "checking";
  try {
    const response = await fetch("/api/health");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    state.sandboxAvailable = Boolean(data.daytona);
    state.sandboxStatus = data.daytona ? "ready" : "unavailable";
    state.sandboxMessage = data.daytona
      ? "Live sandbox ready"
      : "Start the sandbox runner to enable live execution.";
  } catch {
    state.sandboxAvailable = false;
    state.sandboxStatus = "unavailable";
    state.sandboxMessage = "Start npm run course:sandbox to enable live runs.";
  }
}

async function runInSandbox() {
  if (!canRunSandbox.value) return;
  // Cancel any run already in flight so a click always starts a fresh run.
  abortController?.abort();
  const controller = new AbortController();
  abortController = controller;
  state.running = true;
  state.runnerPanel = "console";
  state.spinner = "";
  state.logs = [];
  state.workflowOutput = "";

  try {
    const response = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sandboxId: state.sandboxId || undefined,
        exerciseId: currentExercise.value.id,
        files: allEditedFiles(),
      }),
      signal: controller.signal,
    });
    if (!response.ok || !response.body) {
      throw new Error((await response.text().catch(() => "")) || `HTTP ${response.status}`);
    }
    await readEventStream(response.body);
  } catch (err) {
    if (err.name !== "AbortError") {
      state.logs.push(`ERROR: ${err.message}`);
      state.runnerPanel = "console";
    }
  } finally {
    // Only the most recent run clears shared state; a superseded run bails out
    // so it doesn't reset `running` or drop the new run's abort controller.
    if (abortController === controller) {
      state.running = false;
      abortController = null;
    }
  }
}

async function readEventStream(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let index;
    while ((index = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, index).trim();
      buffer = buffer.slice(index + 2);
      if (!frame.startsWith("data:")) continue;
      handleRunnerEvent(JSON.parse(frame.slice(5).trim()));
    }
  }
}

function handleRunnerEvent({ kind, payload }) {
  if (kind === "log") state.logs.push(payload);
  else if (kind === "spinner") state.spinner = payload || "";
  else if (kind === "ui") {
    state.sandboxId = payload.sandboxId;
    state.temporalUiUrl = payload.uiUrl;
    localStorage.setItem(`${storagePrefix}:sandbox-id`, payload.sandboxId);
    localStorage.setItem(`${storagePrefix}:temporal-ui-url`, payload.uiUrl);
  } else if (kind === "result") {
    state.workflowOutput = payload.workflowResult || "(no output)";
    state.runnerPanel = "output";
    currentFiles.value.forEach((file) => {
      if (fileContent(file) === baseContent(file)) return;
      localStorage.setItem(fileStorageKey(file.path), fileContent(file));
    });
    // Celebrate out-of-band so a confetti hiccup can never disrupt the stream
    // handler (a throw here would otherwise bubble up and hide the output).
    if (outputMatchesExpected(currentExercise.value.id, payload.workflowResult)) {
      window.setTimeout(() => {
        try {
          launchConfetti();
        } catch {
          /* celebration is best-effort */
        }
      }, 0);
    }
  } else if (kind === "error") {
    state.logs.push(`ERROR: ${payload}`);
    state.runnerPanel = "console";
    if (/not found/i.test(String(payload))) clearSandboxState();
  }
}

async function stopSandbox() {
  if (!canStopSandbox.value) return;
  const id = state.sandboxId;
  try {
    const response = await fetch("/api/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sandboxId: id }),
    });
    if (!response.ok) throw new Error(await response.text());
    state.logs.push(`Sandbox ${id} deleted.`);
    clearSandboxState();
    showToast("Sandbox stopped");
  } catch (err) {
    state.logs.push(`Stop failed: ${err.message}`);
  }
}

function clearSandboxState() {
  state.sandboxId = "";
  state.temporalUiUrl = "";
  localStorage.removeItem(`${storagePrefix}:sandbox-id`);
  localStorage.removeItem(`${storagePrefix}:temporal-ui-url`);
}

watch(editorValue, persistCurrentEdit);

watch(() => state.theme, applyTheme, { immediate: true });

watch(
  () => currentExercise.value.id,
  () => {
    const exercise = currentExercise.value;
    state.fileView = "exercise";
    const savedFile = localStorage.getItem(storageKey("active-file", exercise.id));
    state.activeFilePath = exercise.files.some((file) => file.path === savedFile)
      ? savedFile
      : exercise.files[0]?.path ?? "";
    syncEditorFromState();
  },
  { immediate: true },
);

onMounted(() => {
  // Exposed for quick manual testing in the DevTools console: launchConfetti().
  window.launchConfetti = launchConfetti;
  checkSandbox();
  updateHash();
  window.addEventListener("hashchange", () => {
    const id = window.location.hash.replace(/^#/, "");
    const index = course.exercises.findIndex((exercise) => exercise.id === id);
    if (index >= 0 && index !== state.exerciseIndex) selectExercise(index);
  });
});

onBeforeUnmount(() => {
  abortController?.abort();
  window.clearTimeout(toastTimer);
});
</script>

<template>
  <div class="app-frame">
    <header class="topbar">
      <div class="brand">
        <img class="brand-image" src="/assets/course-visual.png" alt="Temporal">
        <div class="brand-copy">
          <p class="eyebrow">Temporal TypeScript Training</p>
          <h2>Workflow Exercises</h2>
        </div>
      </div>
      <div class="topbar-controls">
        <button class="button button-secondary" type="button" :disabled="state.exerciseIndex === 0" @click="selectExercise(state.exerciseIndex - 1)">
          Previous
        </button>
        <label class="exercise-picker">
          <select :value="state.exerciseIndex" @change="selectExercise(Number($event.target.value))">
            <option v-for="(exercise, index) in course.exercises" :key="exercise.id" :value="index">
              Exercise {{ exercise.number }}: {{ exercise.title.replace(/^Exercise\s+\d+:\s*/, "") }}
            </option>
          </select>
        </label>
        <button class="button button-secondary" type="button" :disabled="state.exerciseIndex === course.exercises.length - 1" @click="selectExercise(state.exerciseIndex + 1)">
          Next
        </button>
        <button class="button button-secondary theme-toggle" type="button" :aria-pressed="state.theme === 'dark'" :title="themeToggleLabel" @click="toggleTheme">
          {{ state.theme === "dark" ? "☀" : "☾" }}
        </button>
      </div>
    </header>

    <main class="course-shell" :style="{ '--code-col': state.codeWidth || undefined }">
      <section class="workspace-panel code-panel" aria-label="Code workspace">
        <div class="file-tabs" role="tablist" aria-label="Source files">
          <button
            v-for="file in currentFiles"
            :key="file.path"
            class="file-tab"
            :class="{ active: file.path === state.activeFilePath, dirty: isDirty(file) }"
            type="button"
            role="tab"
            :title="file.path"
            @click="activateFile(file.path)"
          >
            {{ labelForPath(currentExercise, file.path) }}
          </button>
          <button
            v-if="hasSolution"
            class="view-tab"
            :class="{ active: state.fileView === 'solution' }"
            type="button"
            :title="viewToggleLabel"
            @click="toggleFileView"
          >
            {{ viewToggleLabel }}
          </button>
        </div>

        <div class="editor-shell">
          <pre ref="highlightRef" class="code-highlight" aria-hidden="true"><code v-html="highlightedCode" /></pre>
          <textarea
            ref="editorRef"
            v-model="editorValue"
            class="code-editor"
            spellcheck="false"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            wrap="off"
            @keydown="handleEditorKeydown"
            @scroll="syncEditorScroll"
          />
        </div>
        <div class="dock-resizer" data-cursor="row-resize" role="separator" aria-orientation="horizontal" aria-label="Resize runner panel" @pointerdown="startDockResize" />
        <div class="runner-dock" :style="{ height: state.dockHeight || undefined }">
          <div class="runner-header">
            <div>
              <p class="panel-kicker">Live sandbox</p>
              <strong>{{ state.sandboxMessage }}</strong>
            </div>
            <div class="runner-actions">
              <button class="button button-primary" type="button" :disabled="!canRunSandbox" @click="runInSandbox">
                Run
              </button>
              <a v-if="state.sandboxId && state.temporalUiUrl" class="button button-link button-cta" :href="state.temporalUiUrl" target="_blank" rel="noopener">Temporal UI</a>
              <button class="button" type="button" @click="resetCurrentFile">Reset</button>
              <button class="button" type="button" :disabled="!canStopSandbox" @click="stopSandbox">Stop</button>
            </div>
          </div>
          <div class="runner-tabs" role="tablist" aria-label="Runner output">
            <button class="runner-tab" :class="{ active: state.runnerPanel === 'console' }" type="button" @click="state.runnerPanel = 'console'">Console</button>
            <button class="runner-tab" :class="{ active: state.runnerPanel === 'output' }" type="button" @click="state.runnerPanel = 'output'">Output</button>
            <span v-if="state.sandboxId" class="sandbox-id">{{ state.sandboxId }}</span>
          </div>
          <pre v-show="state.runnerPanel === 'console'" class="runner-output">{{ state.logs.length ? state.logs.join('\n') : 'Runner logs appear here once you launch.' }}<template v-if="state.spinner">{{ `\n${state.spinner}` }}</template></pre>
          <pre v-show="state.runnerPanel === 'output'" class="runner-output">{{ state.workflowOutput || 'Workflow output appears here after a successful run.' }}</pre>
        </div>
        <div class="editor-footer">
          <span>{{ editorStats }}</span>
          <span>{{ generatedAt }}</span>
        </div>
      </section>

      <div class="pane-resizer" data-cursor="col-resize" role="separator" aria-orientation="vertical" aria-label="Resize panels" @pointerdown="startPaneResize" />

      <section class="workspace-panel instruction-panel" aria-label="Exercise instructions">
        <div class="instruction-heading">
          <p class="panel-kicker">Instructions</p>
        </div>

        <div class="instruction-content">
          <div v-if="walkthrough" class="walkthrough">
            <div v-html="walkthrough.intro" />
            <template v-for="step in walkthrough.steps" :key="`${currentExercise.id}-${step.id}`">
              <div v-if="step.checkable" class="step-row" :class="{ completed: walkState[step.id] }">
                <input
                  type="checkbox"
                  :checked="walkState[step.id]"
                  :aria-label="step.title"
                  @change="setWalkStep(step.id, $event.target.checked)"
                >
                <div class="step-body" v-html="step.html" />
              </div>
              <div v-else class="step-plain" v-html="step.html" />
            </template>
          </div>
          <div v-else v-html="instructionHtml" />
        </div>
      </section>
    </main>
  </div>

  <div class="toast" :class="{ visible: state.toast }" role="status" aria-live="polite">{{ state.toast }}</div>
</template>
