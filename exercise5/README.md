# Exercise 5: User Metadata & Activity Summaries

## Learning Objectives
- Add descriptive summaries to activities for better observability
- Understand how metadata enhances workflow visibility in Temporal Web UI

## Background
Temporal provides metadata capabilities to make workflows and activities more observable:
- **Activity Summary**: Descriptive text that appears in the Temporal Web UI for each activity execution

## Your Task

### Add Activity Summaries
In `workflow.ts`, add a `summary` field to `proxyActivities` options for each activity:

- Withdraw: `"Withdrawing funds from account {fromAccount}"`
- Deposit: `"Depositing funds to account {toAccount}"`
- Refund: `"Refunding funds to account {fromAccount}"`

Use separate `proxyActivities` calls per activity to set different summaries.

## Expected Behavior
After implementing the summaries:
1. Activities will show descriptive text in the Temporal Web UI
2. Monitoring and debugging become easier with meaningful metadata

## Testing Your Implementation

1. Start the Temporal server:
```bash
temporal server start-dev --search-attribute AccountId=Keyword
```

2. Run the worker:
```bash
npx ts-node exercise5/src/worker/index.ts
```

3. Execute the workflow:
```bash
npx ts-node exercise5/src/starter/index.ts
```

4. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows
5. Check the activity summaries in the workflow execution details

## Key Concepts
- **Activity Summary**: Runtime metadata that describes what an activity is doing
- **Observability**: Making workflows easier to monitor and debug through descriptive metadata
