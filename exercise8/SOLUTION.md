# Exercise 8 Solution: Workflow Versioning

## Key Implementation Points

### 1. Add Notification Activity
```typescript
export async function sendNotification(account: string, amount: number): Promise<void> {
  log.info('Sending notification', { amount, account });
}
```

### 2. Import patched API
```typescript
import { patched } from '@temporalio/workflow';
```

### 3. Proxy the New Activity
```typescript
const { withdraw, deposit, refund, sendNotification } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});
```

### 4. Use patched() for Versioning
```typescript
if (approved) {
  updateStatus('APPROVED');
  await retryActivity(() => deposit(updatedRequest.toAccount, updatedRequest.amount));
  
  // Version 2: Add notification with patched API
  if (patched('add-notification')) {
    await sendNotification(updatedRequest.toAccount, updatedRequest.amount);
    console.log('Notification sent');
  }
  
  updateStatus('COMPLETED');
  console.log('Transfer approved and completed');
  return 'Transfer completed successfully';
}
```

### 5. Replay Test Implementation
```typescript
import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { transfer, approveSignal } from './workflow';
import { defineSearchAttributeKey, SearchAttributeType } from '@temporalio/common';
import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Solution 8: Workflow Versioning', () => {
  let testEnv: TestWorkflowEnvironment;
  let worker: Worker;
  let runPromise: Promise<void>;

  before(async function () {
    this.timeout(60000);
    testEnv = await TestWorkflowEnvironment.createLocal({
      server: {
        searchAttributes: [
          defineSearchAttributeKey('TransferStatus', SearchAttributeType.KEYWORD),
        ],
      },
    });
    worker = await Worker.create({
      connection: testEnv.nativeConnection,
      taskQueue: 'test-queue',
      workflowsPath: require.resolve('./workflow'),
      activities: {
        withdraw: async () => {},
        deposit: async () => {},
        refund: async () => {},
        sendNotification: async () => {},
      },
    });
    runPromise = worker.run();
  });

  after(async () => {
    worker.shutdown();
    await runPromise;
    await testEnv.teardown();
  });

  it('should replay old workflow history without notification', async () => {
    // Load pre-generated workflow history from v1 (without notification)
    const historyPath = path.join(__dirname, 'workflow-history-v1.json');
    const history = JSON.parse(await fs.promises.readFile(historyPath, 'utf8'));

    // Replay with new workflow code (with patched)
    await Worker.runReplayHistory(
      {
        workflowsPath: require.resolve('./workflow'),
      },
      history
    );
    // If replay succeeds without throwing, test passes
  });
});
```

### 6. Generating History File
The `workflow-history-v1.json` file is pre-generated. To regenerate:

**Option 1: Using Temporal Web UI**
1. Start Temporal dev server and run workflow-v1
2. Open http://localhost:8233
3. Find workflow ID: `workflow-v1-history`
4. Click "Download" → "Download Event History JSON" → Select "encoded"
5. Save as `workflow-history-v1.json`

**Option 2: Using Temporal CLI**
```bash
temporal workflow show --workflow-id workflow-v1-history --output json > workflow-history-v1.json
```

Note: The history file must be in the format exported by Temporal CLI or Web UI (encoded format) to work with `Worker.runReplayHistory()`.

## Key Concepts

### patched() Behavior
- **New workflows**: `patched('add-notification')` returns `true` → executes notification
- **Replaying old workflows**: `patched('add-notification')` returns `false` → skips notification
- **Change ID**: Must be unique and permanent (never reuse or remove)

### Why Versioning Matters
- Workflows can run for days, weeks, or months
- Code must evolve without breaking running workflows
- Temporal replays workflow history to recover state
- Non-deterministic changes break replay → workflow fails

### Safe Evolution Pattern
1. Add new code inside `if (patched('change-id'))` block
2. Test replay with old workflow histories
3. Deploy new code - old workflows continue, new workflows use new logic
4. Never remove `patched()` calls (keep forever)

### Replay Testing
- Validates backward compatibility
- Catches determinism errors before production
- Uses real workflow history from old version
- Replays with new workflow code

## Best Practices
- Use descriptive change IDs: `'add-notification'`, `'fix-refund-logic'`
- Test replay before deploying versioned workflows
- Keep `patched()` calls permanently in code
- Document what each version change does
- Never reuse change IDs for different changes
