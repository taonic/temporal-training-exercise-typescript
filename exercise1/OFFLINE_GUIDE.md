# Exercise 1: Hello Temporal

## What you'll build
Your first Temporal application: a **Workflow** that calls an **Activity** to
produce the message `Hello, Temporal!`.

## Running this exercise locally

> This is the offline version of the guide for running the exercise on your own machine. The in-browser version is in `ONLINE_GUIDE.md`.

These steps assume you've cloned the repo and installed the prerequisites (Node.js 18+ and the Temporal CLI — see the top-level [README](../README.md)).

1. Install dependencies once from the repo root:
   ```bash
   npm install
   ```
2. Start a local Temporal dev server and leave it running:
   ```bash
   temporal server start-dev --search-attribute AccountId=Keyword --search-attribute TransferStatus=Keyword
   ```
   The Temporal Web UI is then available at http://localhost:8233.

Edit the files under `exercise1/src/`, then run the Worker and Starter as shown in the final step. Each step below tells you which file to edit, what code to add, and why.

## Step 1 — Implement the Activity

**File:** open `exercise1/src/activities.ts`.

Activities are where real work happens — anything that talks to the outside
world (APIs, databases, sending email). They run as ordinary async functions and
can fail and be retried. Our Activity just builds the greeting string.

Replace the body of `createGreeting`:

```typescript
export async function createGreeting(name: string): Promise<string> {
  return `Hello, ${name}!`;
}
```

**Why:** the Workflow itself stays small and deterministic; it delegates the
actual greeting work to this Activity.

## Step 2 — Implement the Workflow

**File:** open `exercise1/src/workflow.ts`.

The Workflow is the orchestrator. It must be deterministic, so it never calls
external services directly — instead it calls Activities through the
`proxyActivities` handle that's already created at the top of the file:

```typescript
const { createGreeting } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});
```

Replace the body of `greet` so it calls the Activity and returns the result:

```typescript
export async function greet(name: string): Promise<string> {
  return await createGreeting(name);
}
```

**Why:** `proxyActivities` returns stand-ins that, when called, tell Temporal to
schedule the real Activity on a Worker and durably record the result. Awaiting it
gives you the returned greeting.

## Step 3 — Register the Workflow with the Worker

**File:** open `exercise1/src/worker/index.ts`.

A Worker polls a task queue and runs your Workflow and Activity code. It already
registers the Activities (`activities`), but the Workflow registration is
commented out. Uncomment it:

```typescript
const worker = await Worker.create({
  workflowsPath: require.resolve('../workflow'),
  activities,
  taskQueue: TASK_QUEUE,
});
```

**Why:** without `workflowsPath`, the Worker doesn't know where your Workflow
code lives, so it can't execute `greet` and the Starter would wait forever.

## Step 4 — Review the Starter (no changes needed)

**File:** open `exercise1/src/starter/index.ts`.

The Starter is the client that begins a Workflow execution. It's already
complete — read it to see what happens:

```typescript
const handle = await client.workflow.start(greet, {
  taskQueue: 'hello-task-queue',
  workflowId: `greeting-workflow-${randomSuffix()}`,
  args: ['Temporal'],
});

const result = await handle.result();
console.log(result);
```

**Why it matters:** the Starter and the Worker connect through the *same task
queue* (`hello-task-queue`). The `args: ['Temporal']` value becomes the `name`
parameter of your Workflow, which is why the output ends with `Temporal!`. The
random suffix on the `workflowId` keeps each run unique so you can run the Starter
repeatedly without hitting an "already started" error.

## Step 5 — Run it

In one terminal, start the Worker:
```bash
npx ts-node exercise1/src/worker/index.ts
```
In a second terminal, run the Starter:
```bash
npx ts-node exercise1/src/starter/index.ts
```

When it finishes, the Starter's terminal output shows:

```
Hello, Temporal!
```

You can also open the Temporal Web UI at http://localhost:8233 to inspect the
`greeting-workflow-<suffix>` execution and its event history.

## Recap
- **Activity** (`createGreeting`) does the work.
- **Workflow** (`greet`) orchestrates and calls the Activity through `proxyActivities`.
- **Worker** runs both, and must register the Workflow via `workflowsPath`.
- **Starter** begins the execution on a shared task queue and prints the result.

## Questions to ponder

Take a moment to consolidate what you learned:

1. Why must the Workflow reach the Activity through `proxyActivities` instead of importing and calling `createGreeting` directly?
2. If the Worker started without registering `workflowsPath`, who would be left waiting, and why?
3. The Starter and Worker never reference each other directly — what actually connects them? What breaks if they use different task queue names?
4. Workflows must be deterministic. Why does putting the greeting logic in an Activity (rather than the Workflow) respect that rule?

Stuck? Compare with the completed code in the `solution1/` directory.
