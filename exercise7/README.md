# Exercise 7: Manual Activity Retry

## Objective
Learn how to implement manual retry patterns using signals when automatic retries are insufficient for handling invalid data scenarios.

## Key Concepts
- Preventing automatic retries for invalid data
- Manual retry pattern using signals
- Interactive error correction
- Dynamic request updates during workflow execution

## What You'll Implement

### 1. Activity Configuration
Throw `ApplicationFailure.nonRetryable()` errors in activities for invalid data scenarios to prevent automatic retries.

### 2. Manual Retry Logic
Wrap activity calls in a `while(true)` loop that:
- Executes operations
- Catches errors and sets status to `'PENDING_FIX'`
- Waits for retry signal before continuing

### 3. Signal Handlers
- `approveSignal`: Handle approval/rejection signals
- `retrySignal`: Handle retry signals with updated data (key/value pairs)

## Testing the Exercise

1. Start the worker:
```bash
npx ts-node exercise7/src/worker/index.ts
```

2. Run the workflow:
```bash
npx ts-node exercise7/src/starter/index.ts
```

3. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows

4. Use Temporal CLI to interact with the workflow:

Send approval:
```bash
temporal workflow signal \
  --workflow-id money-transfer-workflow \
  --name approve \
  --input true
```

Retry with corrected data:
```bash
temporal workflow signal \
  --workflow-id money-transfer-workflow \
  --name retry \
  --input '{"key":"toAccount","value":"account-456"}'
```

## Expected Behavior
1. Workflow starts and attempts withdrawal (fails with invalid-account)
2. Workflow enters PENDING_FIX status
3. Send retry signal with corrected account data
4. Withdrawal succeeds, workflow waits for approval
5. After approval, deposit completes
6. Workflow completes successfully

## Key Learning Points
- When to use manual vs automatic retries
- Signal-based error correction patterns
- Interactive workflow debugging
- Handling invalid data scenarios gracefully
