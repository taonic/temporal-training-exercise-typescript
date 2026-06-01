# Exercise 4: Visibility & Monitoring with Custom Search Attributes

## What you'll build
You'll make the transfer Workflow discoverable in the Temporal UI by tagging it
with **Custom Search Attributes** — `AccountId` set when the Workflow starts, and
`TransferStatus` updated from inside the Workflow as it progresses.

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

Edit the files under `exercise4/src/`, then run the Worker and Starter as shown in the final step. Each step below tells you which file to edit, what code to add, and why.

## Step 1 — Set AccountId when starting the Workflow

**File:** open `exercise4/src/starter/index.ts`.

Add a `searchAttributes` option to `client.workflow.start()`:

```typescript
searchAttributes: {
  AccountId: [request.fromAccount],
},
```

**Why:** search attributes set at start time let you find this execution later by
account — e.g. "show all transfers for account-123" — directly from the Temporal
UI or `temporal workflow list`.

## Step 2 — Upsert TransferStatus from inside the Workflow

**File:** open `exercise4/src/workflow.ts`.

`upsertSearchAttributes` is already imported. Update `TransferStatus` at every
state transition so the live status is searchable. The completed `transfer`
function:

```typescript
export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

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
    upsertSearchAttributes({ TransferStatus: ['FAILED'] });
    throw e;
  }

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    upsertSearchAttributes({ TransferStatus: ['APPROVED'] });
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      upsertSearchAttributes({ TransferStatus: ['FAILED'] });
      throw e;
    }
    status = 'COMPLETED';
    upsertSearchAttributes({ TransferStatus: ['COMPLETED'] });
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  upsertSearchAttributes({ TransferStatus: ['CANCELLED'] });
  return 'Transfer rejected and refunded';
}
```

**Why:** `upsertSearchAttributes` writes the attribute into Temporal's visibility
store as the Workflow runs, so you can filter on the *current* status
(`TransferStatus = "COMPLETED"`) — not just data known at start time. Note this
mirrors the in-memory `status` used by the Query from Exercise 3; search
attributes power cross-Workflow search, while the Query reads a single Workflow.

## Step 3 — Run it

In one terminal, start the Worker:
```bash
npx ts-node exercise4/src/worker/index.ts
```
In a second terminal, run the Starter:
```bash
npx ts-node exercise4/src/starter/index.ts
```

The Starter's terminal output shows:

```
Transfer completed successfully
```

Open the Temporal Web UI at http://localhost:8233 and try filtering the workflow list with a query
such as `TransferStatus = "COMPLETED"` or `AccountId = "account-123"`.

## Recap
- **Search attributes** make Workflows discoverable by business data.
- Set immutable-at-start data (`AccountId`) in `client.workflow.start()`.
- Update changing data (`TransferStatus`) with `upsertSearchAttributes()` inside the Workflow.

## Questions to ponder

Take a moment to consolidate what you learned:

1. Why is `AccountId` set once at start time while `TransferStatus` is updated with `upsertSearchAttributes()` during execution? What makes one immutable and the other not?
2. Both search attributes and Queries expose Workflow state. When would you reach for each?
3. How do search attributes change the way an operator finds one specific transfer among thousands of running Workflows?
4. What are the trade-offs of indexing business data as search attributes (think cost, cardinality, and which fields are worth indexing)?

Stuck? Compare with the completed code in the `solution4/` directory.
