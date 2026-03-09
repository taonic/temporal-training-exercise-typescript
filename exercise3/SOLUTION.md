# Exercise 3 Solution: Flow Control with Query Handlers

## Key Implementation Points

### Query Handler
```typescript
setHandler(getStatusQuery, () => status);
```

### Signal Handler
```typescript
setHandler(approveSignal, (value: boolean) => {
  approved = value;
  approvalReceived = true;
});
```

### Status Tracking
```typescript
let status: TransferStatus = 'PENDING';

try {
  await withdraw(request.fromAccount, request.amount);
} catch (e) {
  status = 'FAILED';
  throw e;
}

if (approved) {
  status = 'APPROVED';
  await deposit(request.toAccount, request.amount);
  status = 'COMPLETED';
  return 'Transfer completed successfully';
}

await refund(request.fromAccount, request.amount);
status = 'CANCELLED';
return 'Transfer rejected and refunded';
```

## Key Concepts
1. **Query Handlers**: Read-only workflow state inspection using `defineQuery()` + `setHandler()`
2. **Status Tracking**: Maintaining workflow state throughout execution
3. **External Visibility**: Clients can monitor workflow progress
4. **Signal vs Query**: Signals use `defineSignal()` to modify state, Queries use `defineQuery()` to read state
