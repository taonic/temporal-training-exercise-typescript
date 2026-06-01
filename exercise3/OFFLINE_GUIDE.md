# Exercise 3: Flow Control with Query Handlers

## What you'll build
You'll extend the money-transfer Workflow with a **Query** so external clients
can read the Workflow's current status at any time, and you'll track that status
as the Workflow moves through its states.

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

Edit the files under `exercise3/src/`, then run the Worker and Starter as shown in the final step. Each step below tells you which file to edit, what code to add, and why.

## Step 1 — Register the Query handler

**File:** open `exercise3/src/workflow.ts`.

The `getStatusQuery` is already declared at the top of the file, and the
`transfer` function already has a `status` variable. Register a handler so the
query returns the current status. Add it next to the existing signal handler:

```typescript
setHandler(getStatusQuery, () => status);
```

**Why:** a **Query** is a read-only request that returns Workflow state without
changing it. Unlike a Signal, it must not mutate anything — it just reports the
current `status`.

## Step 2 — Track status through the Workflow

**File:** still in `exercise3/src/workflow.ts`.

Update `status` at each transition and mark it `FAILED` if an Activity throws.
The completed `transfer` function looks like this:

```typescript
export async function transfer(request: TransferRequest): Promise<string> {
  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    throw e;
  }
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      throw e;
    }
    status = 'COMPLETED';
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
```

**Why:** keeping `status` current means any client that queries `getStatus` sees
where the transfer is. The `try/catch` records `FAILED` before re-throwing, so a
permanently failing Activity still leaves an accurate status behind.

## Step 3 — Review the Starter (no changes needed)

**File:** open `exercise3/src/starter/index.ts`.

The Starter is already complete. Notice it queries the status before approving:

```typescript
const status = await handle.query(getStatusQuery);
console.log('Status:', status);

await handle.signal(approveSignal, true);
```

**Why it matters:** this shows a client reading live Workflow state (the Query)
and then driving it forward (the Signal) — the two halves of Workflow
interaction.

## Step 4 — Run it

In one terminal, start the Worker:
```bash
npx ts-node exercise3/src/worker/index.ts
```
In a second terminal, run the Starter:
```bash
npx ts-node exercise3/src/starter/index.ts
```

The Starter's terminal output shows the queried status followed by
the final result, for example:

```
Status: PENDING
Transfer completed successfully
```

Open the Temporal Web UI at http://localhost:8233 and use the **Queries** tab to call `getStatus`
yourself while exploring the execution.

## Recap
- A **Query** (`getStatus`) reads Workflow state without mutating it.
- The Workflow keeps `status` accurate at every transition, including `FAILED`.
- **Signals change state; Queries read it** — that's the key distinction.

## Questions to ponder

Take a moment to consolidate what you learned:

1. A Query handler must read state without mutating it. Why is that restriction essential for a durable, replayable Workflow?
2. Signals change state; Queries read it. Given a real task, how do you decide which one you need?
3. Why does answering a Query require a running Worker, even though the Workflow's event history is safely stored on the server?
4. How does keeping `status` accurate at every transition (including `FAILED`) help someone debugging this Workflow in production?

Stuck? Compare with the completed code in the `solution3/` directory.
