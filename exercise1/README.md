# Exercise 1: Hello Temporal (30 min)

## Learning Objectives
- Understand Temporal Workflow and Activity concepts
- Learn how to register workflows and activities with a Worker
- Execute your first Temporal workflow

## Key Concepts

### Workflow
- Workflows orchestrate activities and contain business logic
- Must be deterministic and use Temporal SDK APIs
- Defined as exported async functions

### Activity
- Activities handle external interactions (API calls, database operations, etc.)
- Can fail and be retried automatically
- Defined as regular async functions

### Worker
- Polls task queues for work
- Executes workflow and activity code
- Must register workflow and activity implementations

## Tasks
1. Complete the workflow implementation in `src/workflow.ts`
2. Complete the activity implementation in `src/activities.ts`
3. Complete the worker setup in `src/worker/index.ts`
4. Run the workflow

## Running the Exercise
1. Start worker: `npx ts-node exercise1/src/worker/index.ts`
2. Execute workflow: `npx ts-node exercise1/src/starter/index.ts`
3. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows

## Expected Output
"Hello, Temporal!"
