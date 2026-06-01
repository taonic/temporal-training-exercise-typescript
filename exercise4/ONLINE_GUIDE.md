# Exercise 4: Visibility & Monitoring with Custom Search Attributes

## What you'll build
You'll make the transfer Workflow discoverable in the Temporal UI by tagging it
with **Custom Search Attributes** — `AccountId` set when the Workflow starts, and
`TransferStatus` updated from inside the Workflow as it progresses.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**. The sandbox's Temporal dev server is
already started with the `AccountId` and `TransferStatus` search attributes
registered, so you only need to set them.

Work through the steps in order. Each step tells you *which file* to edit, *what
code* to add, and *why* it's needed.

## Step 1 — Set AccountId when starting the Workflow

**File:** open the `starter/index.ts` tab.

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

**File:** open the `workflow.ts` tab.

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

Press the **Run** button. The **Output** tab shows:

```
Transfer completed successfully
```

Open the **Temporal UI** button and try filtering the workflow list with a query
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

Stuck? Use **Switch to solution** above the editor to view the completed code.
