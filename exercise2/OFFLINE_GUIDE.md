# Exercise 2: Money Transfer Basics

## What you'll build
A money-transfer **Workflow** that withdraws from one account, waits for a human
**approval signal**, then either deposits to the target account or refunds the
source. This introduces multiple Activities, signals, `condition()`, and the
compensation (refund) pattern.

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

Edit the files under `exercise2/src/`, then run the Worker and Starter as shown in the final step. Each step below tells you which file to edit, what code to add, and why.

## Step 1 — Add failure simulation to the Activities

**File:** open `exercise2/src/activities.ts`.

Activities model real external calls (a bank API here), which can fail. Add a
random failure to `withdraw` and `deposit` so you can see Temporal's automatic
retries in action. `refund` is already implemented.

In `withdraw`, after the log line:

```typescript
if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
```

In `deposit`, after the log line:

```typescript
if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
```

**Why:** Activities are the only place failures should happen. When one throws,
Temporal retries it for you — the Workflow code doesn't need any retry logic.

## Step 2 — Implement the transfer Workflow

**File:** open `exercise2/src/workflow.ts`.

The Activities (`withdraw`, `deposit`, `refund`) and the `approveSignal` are
already declared at the top of the file. Replace the body of `transfer` so it
registers the signal, withdraws, waits for approval, and then deposits or
refunds:

```typescript
export async function transfer(request: TransferRequest): Promise<string> {
  let approved = false;
  let approvalReceived = false;

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  await withdraw(request.fromAccount, request.amount);
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    await deposit(request.toAccount, request.amount);
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
```

**Why:** `setHandler` registers the signal callback, and `condition(() =>
approvalReceived)` durably pauses the Workflow until that signal arrives — the
Workflow can wait minutes or months without consuming resources.

## Step 3 — Register the Workflow with the Worker

**File:** open `exercise2/src/worker/index.ts`.

Uncomment the Workflow registration:

```typescript
workflowsPath: require.resolve('../workflow'),
```

**Why:** without `workflowsPath`, the Worker can't run `transfer`, so the Starter
would hang waiting for a result.

## Step 4 — Send the approval signal from the Starter

**File:** open `exercise2/src/starter/index.ts`.

The Starter begins the Workflow, but the approval is commented out — so the
Workflow would wait forever. Uncomment it:

```typescript
await new Promise((resolve) => setTimeout(resolve, 2000));
await handle.signal(approveSignal, true);
```

**Why:** the Workflow blocks on `condition(() => approvalReceived)`. This sends
the `approve` signal (after a short delay) so the transfer is approved and
completes. The Starter and Worker share the `money-transfer-task-queue`.

**You can also send the signal by hand.** While the Workflow is paused waiting
for approval, open the Temporal Web UI at http://localhost:8233, find your running Workflow, and
use **More Actions → Send a Signal**. Enter the signal name `approve` with an
input of `true` to approve the transfer (or `false` to reject and trigger the
refund) — exactly what the line above does programmatically.

## Step 5 — Run it

In one terminal, start the Worker:
```bash
npx ts-node exercise2/src/worker/index.ts
```
In a second terminal, run the Starter:
```bash
npx ts-node exercise2/src/starter/index.ts
```

In the Starter's terminal output you'll see the withdrawal, the
"Waiting for approval..." pause, and the approval arriving (you may also see a
retry if the random failure fires). The Starter's terminal output shows:

```
Transfer completed successfully
```

Open the Temporal Web UI at http://localhost:8233 to watch the signal land and the Activities run.

## Recap
- **Activities** (`withdraw`, `deposit`, `refund`) do the work and may fail; Temporal retries them.
- **Signal** (`approveSignal`) delivers the human approval into the running Workflow.
- **`condition()`** durably waits until approval is received.
- **Compensation**: if not approved, the Workflow refunds the withdrawal.

## Questions to ponder

Take a moment to consolidate what you learned:

1. The Workflow pauses at `condition(() => approvalReceived)`, possibly for a long time. Where does that pending state live, and how does it survive a Worker restart?
2. `withdraw` and `deposit` can fail randomly, yet the Workflow has no retry logic. Who retries them, and why does that keep the Workflow code simpler?
3. Why model the refund as a *compensating* Activity instead of trying to "undo" the withdrawal directly? What does this pattern give you?
4. What's the difference between delivering the approval as a Signal versus passing it as a Workflow argument at start time?

Stuck? Compare with the completed code in the `solution2/` directory.
