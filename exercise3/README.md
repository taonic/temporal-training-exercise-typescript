# Exercise 3: Flow Control with Query Handlers (30 min)

## Learning Objectives
- Implement Query handlers for workflow state inspection
- Track workflow status throughout execution
- Query workflow state from external clients
- Understand the difference between Signals and Queries

## Tasks

### 1. Implement Query Handler (10 min)
- Define a query using `defineQuery<TransferStatus>('getStatus')`
- Add `setHandler(getStatusQuery, () => status)` in the workflow
- Return current status from the handler

### 2. Add Status Tracking (10 min)
- Update status to `'APPROVED'` when approval received
- Update status to `'COMPLETED'` when transfer succeeds
- Update status to `'CANCELLED'` when rejected
- Update status to `'FAILED'` on errors (use try/catch)

## Key Concepts
- **Query Handlers**: Read-only operations to inspect workflow state via `setHandler()`
- **Status Tracking**: Maintaining workflow state for external visibility
- **Signal vs Query**: Signals modify state, Queries only read state

## Testing
1. Start the worker: `npx ts-node exercise3/src/worker/index.ts`
2. Run the workflow: `npx ts-node exercise3/src/starter/index.ts`
3. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows
4. Observe status changes through query outputs

## Expected Output
- Initial status: PENDING
- Status after approval: APPROVED → COMPLETED
- Final status confirmation

### Query Using CLI
You can also query the workflow status using the Temporal CLI:
```bash
temporal workflow query \
  --workflow-id money-transfer-workflow \
  --type getStatus
```

### Try Interactive Signaling
Comment out `await handle.signal(approveSignal, true);` in `starter/index.ts`, then:
1. Run the workflow - it will wait for approval
2. Query the status using CLI (should show PENDING)
3. Send approval signal via Temporal UI: **More Actions → Send a Signal**
4. Query again to see status change to APPROVED → COMPLETED

### Worker Dependency Experiment
To understand that queries require an running worker:
1. Stop the worker before sending approval signal
2. Try querying the workflow - it will fail (no worker to handle query)
3. Restart the worker
4. Query again - it works, showing workflow state persisted across worker restarts
