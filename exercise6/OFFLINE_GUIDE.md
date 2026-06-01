# Exercise 6: Complete Implementation

## What this is
This exercise is the **complete, working implementation** that combines
everything from Exercises 1–5:

- multiple Activities with error simulation (`withdraw`, `deposit`, `refund`),
- a signal-based approval (`approveSignal` + `condition()`),
- a status **Query** (`getStatus`),
- custom **search attributes** (`AccountId`, `TransferStatus`),
- per-Activity **summaries** for observability.

There are no TODOs to fill in. Use it as a reference and a sandbox to experiment
in.

## Running this exercise locally

> This is the offline version of the guide for running the exercise on your own machine. The in-browser version is in `ONLINE_GUIDE.md`.

These steps assume you've cloned the repo and installed the prerequisites (Node.js 18+ — see the top-level [README](../README.md)). Install dependencies once from the repo root:

```bash
npm install
```

This exercise runs a Worker and a Starter against a local Temporal dev server, so you need three terminals.

Edit the files under `exercise6/src/`. Each step below tells you which file to open, what to read, and why.

## Step 1 — Read through the files

Open each file and connect it back to the earlier exercises:

- `exercise6/src/activities.ts` — `withdraw`/`deposit` randomly fail; Temporal retries them automatically.
- `exercise6/src/workflow.ts` — registers the Query and approval Signal, upserts `TransferStatus` at each transition, and gives each Activity a descriptive summary.
- `exercise6/src/worker/index.ts` — registers the Workflow (`workflowsPath`) and Activities on the shared task queue.
- `exercise6/src/starter/index.ts` — starts the Workflow, queries status, and sends the approval signal.

## Step 2 — Run it

You need three terminals, all run from the repo root.

**Terminal 1 — Temporal dev server:**
```bash
temporal server start-dev
```

**Terminal 2 — Worker:**
```bash
npx ts-node exercise6/src/worker/index.ts
```

**Terminal 3 — Starter:**
```bash
npx ts-node exercise6/src/starter/index.ts
```

The test runner's terminal output (Terminal 3) shows:

```
Transfer completed successfully
```

You can open the Temporal Web UI at [http://localhost:8233](http://localhost:8233) to see it all together: the Activity summaries, the `getStatus` query, the approval signal, and the `TransferStatus` search attribute moving from `PENDING` to `COMPLETED`.

## Step 3 — Experiment

Because this version is complete, it's a good place to try things and re-run the Starter (Terminal 3):

- change the `amount` or account names in `exercise6/src/starter/index.ts`,
- send `approveSignal` as `false` to watch the refund (compensation) path,
- filter the workflow list in the Temporal Web UI by `TransferStatus` or `AccountId`.

## Recap
- Exercise 6 is the reference implementation of the full money-transfer Workflow.
- Every concept from Exercises 1–5 appears here working together.
- Use the Worker + Starter plus the Temporal Web UI to explore how the pieces interact.

## Questions to ponder

Take a moment to consolidate what you learned:

1. Trace one transfer end-to-end: which concept from Exercises 1–5 handles each step (start, withdraw, wait for approval, query status, deposit/refund, visibility)?
2. Send `approveSignal` as `false`. How does the compensation path differ, and what does the final state look like in the Temporal Web UI?
3. If `deposit` kept failing, where would you look first, and which Temporal features help you diagnose it?
4. Which single piece, if removed, would most reduce this Workflow's reliability or operability — and why?

Stuck? Compare with the completed code in the `solution6/` directory.
