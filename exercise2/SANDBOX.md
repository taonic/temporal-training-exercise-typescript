# Exercise 2: Money Transfer Basics

## What you'll build
A money-transfer **Workflow** that withdraws from one account, waits for a human
**approval signal**, then either deposits to the target account or refunds the
source. This introduces multiple Activities, signals, `condition()`, and the
compensation (refund) pattern.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**. Pressing Run starts a Temporal dev
server, starts your **Worker**, and runs the **Starter**, which begins the
Workflow and sends the approval signal automatically.

Work through the steps in order. Each step tells you *which file* to edit, *what
code* to add, and *why* it's needed.

## Step 1 — Add failure simulation to the Activities

**File:** open the `activities.ts` tab.

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

**File:** open the `workflow.ts` tab.

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

**File:** open the `worker/index.ts` tab.

Uncomment the Workflow registration:

```typescript
workflowsPath: require.resolve('../workflow'),
```

**Why:** without `workflowsPath`, the Worker can't run `transfer`, so the Starter
would hang waiting for a result.

## Step 4 — Send the approval signal from the Starter

**File:** open the `starter/index.ts` tab.

The Starter begins the Workflow, but the approval is commented out — so the
Workflow would wait forever. Uncomment it:

```typescript
await new Promise((resolve) => setTimeout(resolve, 2000));
await handle.signal(approveSignal, true);
```

**Why:** the Workflow blocks on `condition(() => approvalReceived)`. This sends
the `approve` signal (after a short delay) so the transfer is approved and
completes. The Starter and Worker share the `money-transfer-task-queue`.

## Step 5 — Run it

Press the **Run** button. In the **Console** you'll see the withdrawal, the
"Waiting for approval..." pause, and the approval arriving (you may also see a
retry if the random failure fires). The **Output** tab shows:

```
Transfer completed successfully
```

Open the **Temporal UI** button to watch the signal land and the Activities run.

## Recap
- **Activities** (`withdraw`, `deposit`, `refund`) do the work and may fail; Temporal retries them.
- **Signal** (`approveSignal`) delivers the human approval into the running Workflow.
- **`condition()`** durably waits until approval is received.
- **Compensation**: if not approved, the Workflow refunds the withdrawal.

Stuck? Use **Switch to solution** above the editor to view the completed code.
