# Exercise 5: User Metadata & Activity Summaries

## What you'll build
You'll attach a human-readable **summary** to each Activity call so the Temporal
UI shows *what* each step is doing (e.g. "Withdrawing funds from account
account-123") instead of just the Activity name.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**, which starts a Temporal dev server,
your **Worker**, and the **Starter**.

## Step 1 — Give each Activity its own proxy with a summary

**File:** open the `workflow.ts` tab.

Today all three Activities share one `proxyActivities` call at the top of the
file. A `summary` is per-call metadata, and we want it to include the account
numbers from the request — so each Activity needs its own proxy created *inside*
the Workflow function where `request` is available.

First, delete the shared module-level block near the top of the file (the one
marked with the TODO):

```typescript
const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});
```

Then, as the first statements inside the `transfer` function, create one proxy
per Activity with a descriptive `summary`:

```typescript
const { withdraw } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  summary: `Withdrawing funds from account ${request.fromAccount}`,
});
const { deposit } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  summary: `Depositing funds to account ${request.toAccount}`,
});
const { refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  summary: `Refunding funds to account ${request.fromAccount}`,
});
```

**Why:** the `summary` field is observability metadata that Temporal surfaces in
the Web UI for each Activity execution. Creating the proxies inside the function
lets each summary embed live request data, making the event history far easier to
read at a glance.

## Step 2 — Run it

Press the **Run** button. The **Output** tab shows:

```
Transfer completed successfully
```

Open the **Temporal UI** button and look at the Activity events — each now
carries its summary text describing the account it acted on.

## Recap
- **Activity summaries** are metadata that improves observability in the Web UI.
- Defining a proxy per Activity inside the Workflow lets the summary include request data.
- The Workflow's behavior is unchanged — this is purely about visibility.

## Questions to ponder

Take a moment to consolidate what you learned:

1. Activity summaries change observability but not behavior. When is investing extra code in observability worth it?
2. Why does defining a proxy *per Activity* (so the summary can include request data) help someone reading the Web UI during an incident?
3. What other metadata would you want surfaced for a money transfer, and what would you deliberately leave out?
4. If summaries don't affect the result, how would you justify this change to a teammate focused only on features?

Stuck? Use **Switch to solution** above the editor to view the completed code.
