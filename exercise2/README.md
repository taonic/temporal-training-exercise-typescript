# Exercise 2: Money Transfer Basics (45 min)

## Learning Objectives
- Implement multiple activities (withdraw, deposit, refund)
- Use signals for workflow interaction
- Implement condition() for approval waiting
- Handle basic error scenarios with compensation

## Tasks

### 1. Implement Activities (10 min)
- Implement `withdraw()`: Add logging and error simulation
- Implement `deposit()`: Add logging and error simulation
- Implement `refund()`: Add logging for compensation
- Use `Math.random()` to simulate network failures

### 2. Implement transfer Workflow (15 min)
- Set up signal handler for `approveSignal` using `setHandler()`
- Call withdraw activity
- Wait for approval signal using `condition()`
- If approved: call deposit activity
- If not approved: call refund activity
- Return appropriate status message

### 3. Complete Worker (5 min)
- Register the workflow by uncommenting `workflowsPath`

### 4. Complete Starter (5 min)
- Send approval signal after a short delay

## Key Concepts
- **Activities**: External operations that can fail and be retried
- **Signals**: Asynchronous messages sent to running workflows via `setHandler()`
- **condition()**: Wait for conditions to be met (equivalent to Go's `workflow.Await()`)
- **Compensation**: Undoing operations when things go wrong

## Testing
1. Start the worker: `npx ts-node exercise2/src/worker/index.ts`
2. Run the workflow: `npx ts-node exercise2/src/starter/index.ts`
3. Observe the workflow waiting for approval, then completing the transfer

## Next Steps
Exercise 3 will add query handlers for better observability.
