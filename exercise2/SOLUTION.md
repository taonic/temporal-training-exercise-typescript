# Exercise 2 Solution: Money Transfer Basics

## Key Implementation Points

### 1. activities.ts
```typescript
export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}
```

### 2. workflow.ts
```typescript
export async function transfer(request: TransferRequest): Promise<string> {
  let approved = false;
  let approvalReceived = false;

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  await withdraw(request.fromAccount, request.amount);
  await condition(() => approvalReceived);

  if (approved) {
    await deposit(request.toAccount, request.amount);
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  return 'Transfer rejected and refunded';
}
```

### 3. worker/index.ts
```typescript
workflowsPath: require.resolve('../src/workflow'),
```

### 4. starter/index.ts
```typescript
await new Promise((resolve) => setTimeout(resolve, 2000));
await handle.signal(approveSignal, true);
```

## Key Concepts Demonstrated
1. **Multiple Activities**: withdraw, deposit, refund operations
2. **Signal Handling**: External approval mechanism via `setHandler()`
3. **condition()**: Blocking until condition is met
4. **Compensation Pattern**: Refund when transfer is rejected
