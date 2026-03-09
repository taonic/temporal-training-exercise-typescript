# Exercise 7 Solution: Manual Activity Retry

## Key Implementation Points

### 1. Disable Automatic Retries
```typescript
const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: { maximumAttempts: 1 },
});
```

### 2. Retry Signal Handler
```typescript
setHandler(retrySignal, (update: RetryUpdate) => {
  if (update.key === 'fromAccount') updatedRequest.fromAccount = update.value;
  else if (update.key === 'toAccount') updatedRequest.toAccount = update.value;
  else if (update.key === 'amount') updatedRequest.amount = parseFloat(update.value);
  retryRequested = true;
});
```

### 3. Manual Retry Loop
```typescript
while (true) {
  try {
    await withdraw(updatedRequest.fromAccount, updatedRequest.amount);
    break;
  } catch (e) {
    status = 'RETRYING';
    retryRequested = false;
    await condition(() => retryRequested);
  }
}
```

## Key Concepts
- Manual retry loops for handling correctable errors
- Signal-based data correction
- Dynamic request updates during execution
- Status tracking for retry states
