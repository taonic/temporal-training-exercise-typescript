# Exercise 7: Manual Activity Retry

## What you'll build
Some failures can't be fixed by retrying — like a transfer to an *invalid
account*. You'll mark those as **non-retryable**, then build a **manual retry**
pattern: the Workflow catches the failure, sets status to `PENDING_FIX`, and
waits for a human to send corrected data via a **retry signal** before continuing.

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

Edit the files under `exercise7/src/`, then run the Worker and Starter as shown in the final step. Each step below tells you which file to edit, what code to add, and why.

## Step 1 — Make invalid-account failures non-retryable

**File:** open `exercise7/src/activities.ts`.

`ApplicationFailure` is already imported. Replace the plain `throw new Error(...)`
for the invalid account in both `withdraw` and `deposit`.

In `withdraw`:

```typescript
if (account === 'invalid-account') {
  throw ApplicationFailure.nonRetryable('withdrawal failed - invalid account');
}
```

In `deposit`:

```typescript
if (account === 'invalid-account') {
  throw ApplicationFailure.nonRetryable('deposit failed - invalid account');
}
```

**Why:** by default Temporal retries failed Activities forever. Retrying a bad
account number will never succeed, so we throw `ApplicationFailure.nonRetryable`
to stop the automatic retries and hand control back to the Workflow to decide
what to do.

## Step 2 — Add the manual-retry logic to the Workflow

**File:** open `exercise7/src/workflow.ts`.

The `retrySignal` is already declared at the top. Complete the `transfer`
function so it: handles the retry signal (updating the request), wraps Activities
in a helper that pauses on failure, and resumes when a correction arrives:

```typescript
export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;
  let retryRequested = false;
  const updatedRequest = { ...request };

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  setHandler(retrySignal, (update: RetryUpdate) => {
    if (update.key === 'fromAccount') updatedRequest.fromAccount = update.value;
    else if (update.key === 'toAccount') updatedRequest.toAccount = update.value;
    else if (update.key === 'amount') updatedRequest.amount = parseFloat(update.value);
    retryRequested = true;
  });

  // Helper function to update status and search attributes
  const updateStatus = (newStatus: TransferStatus) => {
    status = newStatus;
    upsertSearchAttributes({ TransferStatus: [newStatus] });
  };

  // Helper function to retry activities on failure, waiting for manual correction via signal
  const retryActivity = async <T>(fn: () => Promise<T>): Promise<T> => {
    while (true) {
      try {
        return await fn();
      } catch (e) {
        updateStatus('PENDING_FIX');
        retryRequested = false;
        await condition(() => retryRequested);
      }
    }
  };

  await retryActivity(() => withdraw(updatedRequest.fromAccount, updatedRequest.amount));
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    updateStatus('APPROVED');
    await retryActivity(() => deposit(updatedRequest.toAccount, updatedRequest.amount));
    updateStatus('COMPLETED');
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  updateStatus('CANCELLED');
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
```

**Why:** `retryActivity` runs an Activity, and on a non-retryable failure it
parks the Workflow at `PENDING_FIX` and `await`s `condition(() =>
retryRequested)`. The `retrySignal` handler patches `updatedRequest` and flips
`retryRequested`, which wakes the loop so it retries with the corrected data.

## Step 3 — Review the Starter (no changes needed)

**File:** open `exercise7/src/starter/index.ts`.

The Starter is already complete. It starts with an invalid account, then sends
the correction and the approval:

```typescript
await handle.signal(retrySignal, { key: 'fromAccount', value: 'account-123' });
// ...
await handle.signal(approveSignal, true);
```

**Why it matters:** this simulates an operator fixing bad input on a live
Workflow — exactly what the manual-retry pattern is for.

## Step 4 — Run it

In one terminal, start the Worker:
```bash
npx ts-node exercise7/src/worker/index.ts
```
In a second terminal, run the Starter:
```bash
npx ts-node exercise7/src/starter/index.ts
```

In the Starter's terminal output you'll see the withdrawal fail, the
status move to `PENDING_FIX`, the retry signal correct the account, and the
transfer recover. The Starter's terminal output shows:

```
Transfer completed successfully
```

Open the Temporal Web UI at http://localhost:8233 to watch `TransferStatus` pass through
`PENDING_FIX` before reaching `COMPLETED`.

## Recap
- `ApplicationFailure.nonRetryable` stops pointless automatic retries for bad data.
- The Workflow catches the failure, marks `PENDING_FIX`, and waits for a fix.
- A **retry signal** delivers corrected data and resumes execution.

## Questions to ponder

Take a moment to consolidate what you learned:

1. When should a failure be `nonRetryable` versus left to Temporal's automatic retries? What's the cost of getting it wrong in each direction?
2. The Workflow marks `PENDING_FIX` and waits for a human. How is that different from just letting the Activity retry forever?
3. Why deliver the correction via a Signal rather than failing the Workflow and starting a brand-new one?
4. How long could a Workflow safely sit in `PENDING_FIX`, and what about Temporal makes that possible?

Stuck? Compare with the completed code in the `solution7/` directory.
