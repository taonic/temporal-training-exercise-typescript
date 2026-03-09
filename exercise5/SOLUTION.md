# Exercise 5 Solution: User Metadata & Activity Summaries

## Solution Implementation

### Activity Summaries in workflow.ts
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

Note: `proxyActivities` must be called at the top level of the workflow function (not inside conditionals) to remain deterministic. Use separate calls per activity to set different summaries.

## Key Points
- **Activity Summary**: Provides runtime context for each activity execution
- **Observability**: Summaries appear in Temporal Web UI for better monitoring
- **Best Practice**: Use descriptive, contextual summaries that help with debugging
