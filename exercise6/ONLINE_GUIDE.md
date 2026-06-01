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
in. In this sandbox you don't run terminal commands — just press **Run**, which
starts a Temporal dev server, your **Worker**, and the **Starter**.

## Step 1 — Read through the files

Open each tab and connect it back to the earlier exercises:

- **`activities.ts`** — `withdraw`/`deposit` randomly fail; Temporal retries them automatically.
- **`workflow.ts`** — registers the Query and approval Signal, upserts `TransferStatus` at each transition, and gives each Activity a descriptive summary.
- **`worker/index.ts`** — registers the Workflow (`workflowsPath`) and Activities on the shared task queue.
- **`starter/index.ts`** — starts the Workflow, queries status, and sends the approval signal.

## Step 2 — Run it

Press the **Run** button. The **Output** tab shows:

```
Transfer completed successfully
```

Open the **Temporal UI** button to see it all together: the Activity summaries,
the `getStatus` query, the approval signal, and the `TransferStatus` search
attribute moving from `PENDING` to `COMPLETED`.

## Step 3 — Experiment

Because this version is complete, it's a good place to try things and press
**Run** again:

- change the `amount` or account names in `starter/index.ts`,
- send `approveSignal` as `false` to watch the refund (compensation) path,
- filter the workflow list in the Temporal UI by `TransferStatus` or `AccountId`.

## Recap
- Exercise 6 is the reference implementation of the full money-transfer Workflow.
- Every concept from Exercises 1–5 appears here working together.
- Use **Run** plus the **Temporal UI** to explore how the pieces interact.

## Questions to ponder

Take a moment to consolidate what you learned:

1. Trace one transfer end-to-end: which concept from Exercises 1–5 handles each step (start, withdraw, wait for approval, query status, deposit/refund, visibility)?
2. Send `approveSignal` as `false`. How does the compensation path differ, and what does the final state look like in the Temporal UI?
3. If `deposit` kept failing, where would you look first, and which Temporal features help you diagnose it?
4. Which single piece, if removed, would most reduce this Workflow's reliability or operability — and why?

Tip: Use **Switch to solution** above the editor to compare against the canonical source.
