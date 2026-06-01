# Exercise 8: Workflow Versioning with Patched API

## What you'll build
You'll evolve the transfer Workflow by adding a **notification** step after the
deposit — without breaking Workflows that are already running. Temporal's
`patched()` API lets new executions run the new code while old histories still
replay correctly.

In this sandbox you don't run any terminal commands. You edit the files in the
tabs above the editor, then press **Run**, which starts a Temporal dev server,
your **Worker**, and the **Starter**.

Work through the steps in order. Each step tells you *which file* to edit, *what
code* to add, and *why* it's needed.

## Step 1 — Add the notification Activity

**File:** open the `activities.ts` tab.

Add a new Activity that represents the notification (here it just logs):

```typescript
export async function sendNotification(account: string, amount: number): Promise<void> {
  log.info('Sending notification', { amount, account });
}
```

**Why:** the new behavior is "send a notification after a successful deposit."
Like all side effects, it belongs in an Activity, not in the Workflow.

## Step 2 — Version the Workflow with `patched()`

**File:** open the `workflow.ts` tab.

First, add `patched` to the import from `@temporalio/workflow`:

```typescript
import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes, patched } from '@temporalio/workflow';
```

Add `sendNotification` to the Activities you proxy:

```typescript
const { withdraw, deposit, refund, sendNotification } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});
```

Then, in the approved branch, right after the `deposit` call, guard the new step
with `patched()`:

```typescript
if (patched('add-notification')) {
  await sendNotification(updatedRequest.toAccount, updatedRequest.amount);
  console.log('Notification sent');
}
```

**Why:** `patched('add-notification')` returns `true` for new executions (so they
run the notification) and `false` when replaying history recorded *before* the
change existed (so old Workflows skip it and stay deterministic). The change ID
is permanent — it's how Temporal tells the two versions apart.

## Step 3 — About the replay test

**File:** open the `workflow.test.ts` tab.

Task 3 of this exercise writes a **replay test** that loads a pre-recorded v1
history and replays it against your new code to prove backward compatibility.
Replay tests run through the test suite (`npm test`), which is outside this
sandbox's click-to-run flow — pressing **Run** here exercises the *new* Workflow
path instead. Use **Switch to solution** to read the completed `workflow.test.ts`
and the replay assertion.

## Step 4 — Run it

Press the **Run** button. Because this is a brand-new execution, `patched()`
returns `true`, so you'll see the notification fire. The **Console** shows
`Notification sent`, and the **Output** tab shows:

```
Transfer completed successfully
```

Open the **Temporal UI** button to see the `sendNotification` Activity in the
event history after the deposit.

## Recap
- `patched(changeId)` returns `true` for new runs and `false` when replaying pre-change history.
- New side effects (the notification) go in an Activity, gated by the patch.
- Replay tests verify old histories still work — validated via the test suite, not the Run button.

## Questions to ponder

Take a moment to consolidate what you learned:

1. Why can't you simply edit the Workflow code and redeploy while Workflows are mid-flight? What exactly does `patched()` protect against?
2. `patched(changeId)` returns `true` for new runs and `false` when replaying old history. Why is that asymmetry precisely what's needed?
3. Why does the new side effect (the notification) live in an Activity gated by the patch, rather than inline in the Workflow body?
4. Why are replay tests — not the Run button — the right way to validate a versioning change? Once every pre-change Workflow has finished, what can you safely remove?

Stuck? Use **Switch to solution** above the editor to view the completed code.
