# Exercise 7 Solution: Manual Activity Retry

## Key Implementation Points

### 1. Use Non-Retryable Errors
```typescript
import { log, ApplicationFailure } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (account === 'invalid-account') {
    throw ApplicationFailure.nonRetryable('withdrawal failed - invalid account');
  }
}
```

### 2. Helper Functions
```typescript
// Update status and search attributes together
const updateStatus = (newStatus: TransferStatus) => {
  status = newStatus;
  upsertSearchAttributes({ TransferStatus: [newStatus] });
};

// Retry activities on failure, waiting for manual correction via signal
const retryActivity = async <T>(fn: () => Promise<T>): Promise<T> => {
  while (true) {
    try {
      return await fn();
    } catch (e) {
      updateStatus('PENDING_FIX');
      retryRequested = false;
      await condition(() => retryRequested);
    }
  }
};
```

### 3. Retry Signal Handler
```typescript
setHandler(retrySignal, (update: RetryUpdate) => {
  if (update.key === 'fromAccount') updatedRequest.fromAccount = update.value;
  else if (update.key === 'toAccount') updatedRequest.toAccount = update.value;
  else if (update.key === 'amount') updatedRequest.amount = parseFloat(update.value);
  retryRequested = true;
});
```

### 4. Use Retry Helper
```typescript
await retryActivity(() => withdraw(updatedRequest.fromAccount, updatedRequest.amount));
```

## Key Concepts
- Non-retryable errors for invalid data scenarios
- Manual retry loops for handling correctable errors
- Signal-based data correction
- Dynamic request updates during execution
- Helper functions to reduce code duplication
