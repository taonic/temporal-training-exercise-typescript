# Exercise 3: Flow Control with Query Handlers

## What you'll build
You'll extend the money-transfer Workflow with a **Query** so external clients
can read the Workflow's current status at any time, and you'll track that status
as the Workflow moves through its states.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**. Pressing Run starts a Temporal dev
server, starts your **Worker**, and runs the **Starter**, which begins the
Workflow, queries its status, sends the approval signal, and prints the result.

Work through the steps in order. Each step tells you *which file* to edit, *what
code* to add, and *why* it's needed.

## Step 1 — Register the Query handler

**File:** open the `workflow.ts` tab.

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

**File:** still in `workflow.ts`.

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

**File:** open the `starter/index.ts` tab.

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

Press the **Run** button. The **Output** tab shows the queried status followed by
the final result, for example:

```
Status: PENDING
Transfer completed successfully
```

Open the **Temporal UI** button and use the **Queries** tab to call `getStatus`
yourself while exploring the execution.

## Recap
- A **Query** (`getStatus`) reads Workflow state without mutating it.
- The Workflow keeps `status` accurate at every transition, including `FAILED`.
- **Signals change state; Queries read it** — that's the key distinction.

Stuck? Use **Switch to solution** above the editor to view the completed code.
