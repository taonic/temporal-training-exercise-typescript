# Exercise 8: Workflow Versioning with Patched API

## Goal
Learn how to safely evolve workflows using Temporal's `patched()` API for versioning, ensuring backward compatibility with running workflows.

## Scenario
We'll evolve the money transfer workflow by adding a new notification step after deposit. Using versioning ensures existing workflows continue running correctly while new workflows use the updated logic.

## Learning Objectives
- Understand workflow versioning and why it's needed
- Use `patched()` to introduce non-deterministic changes
- Write replay tests to verify version compatibility
- Handle multiple workflow versions in production

## Background: Why Versioning?

Temporal workflows are deterministic - replaying history must produce the same result. Adding new activities or changing execution order breaks this. The `patched()` API allows safe evolution:

```typescript
import { patched } from '@temporalio/workflow';

// Version 1: Original workflow (no patched call)
await withdraw(from, amount);
await deposit(to, amount);

// Version 2: Add notification (with patched)
await withdraw(from, amount);
await deposit(to, amount);
if (patched('add-notification')) {
  await sendNotification(to, amount);  // New activity
}
```

**How it works:**
- Old workflows: `patched()` returns `false` (skip new code)
- New workflows: `patched()` returns `true` (run new code)
- Change IDs must be unique and permanent

## Tasks

### Task 1: Add Notification Activity
Create a `sendNotification` activity in `activities.ts`:
```typescript
export async function sendNotification(account: string, amount: number): Promise<void>
```

### Task 2: Version the Workflow
In `workflow.ts`, after the deposit activity:
1. Import `patched` from `@temporalio/workflow`
2. Use `patched('add-notification')` to conditionally call `sendNotification`
3. Only send notification when transfer is approved and completed

### Task 3: Write Replay Test
Create `workflow.test.ts` to verify:
1. Old workflow history replays correctly (without notification)
2. New workflow executes with notification
3. Use `@temporalio/testing` for replay testing

### Task 4: Generate History File

1. Start Temporal dev server:
```bash
temporal server start-dev --search-attribute AccountId=Keyword --search-attribute TransferStatus=Keyword
```

2. In another terminal, start the worker:
```bash
npx ts-node exercise7/src/worker/index.ts
```

3. In another terminal, run a workflow with the old code (workflow-v1.ts):
```bash
npx ts-node exercise7/src/starter/index.ts
```

4. Download history from Temporal Web UI:
   - Open http://localhost:8233
   - Find your workflow execution
   - Click "Download" → "Download Event History JSON" → Select "encoded"
   - Save as `exercise8/src/workflow-history-v1.json`

Alternatively, use the CLI:
```bash
temporal workflow show --workflow-id <your-workflow-id> --output json > exercise8/src/workflow-history-v1.json
```

## Testing Your Solution

### Run the workflow:
```bash
# Terminal 1: Start worker
npx ts-node exercise8/src/worker/index.ts

# Terminal 2: Start workflow
npx ts-node exercise8/src/starter/index.ts
```

### Run replay tests:
```bash
npm test -- exercise8
```

## Expected Behavior

**New workflow execution:**
1. Withdraw from account
2. Wait for approval signal
3. If approved: deposit + send notification
4. If rejected: refund (no notification)

**Replay of old workflow:**
- Skips notification step
- Completes successfully without errors

## Key Concepts

- **patched(changeId)**: Returns `true` for new executions, `false` when replaying old history
- **Change ID**: Unique string identifier (e.g., 'add-notification')
- **Replay test**: Validates workflow can replay old history with new code
- **Determinism**: Workflows must produce same result when replayed

## Tips

- Change IDs are permanent - never reuse or remove them
- Test replay before deploying versioned workflows
- Use descriptive change IDs (e.g., 'add-notification-v1')
- Multiple `patched()` calls can coexist in one workflow

## Next Steps

After completing this exercise, you'll understand how to:
- Safely evolve production workflows
- Maintain backward compatibility
- Test version changes with replay
- Handle multiple workflow versions simultaneously
