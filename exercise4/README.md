# Exercise 4: Visibility & Monitoring with Custom Search Attributes (30 min)

## Learning Objectives
- Create and use Custom Search Attributes for workflow filtering
- Upsert Search Attributes from within workflows
- Understand how Search Attributes enable workflow discovery

## Tasks

### 1. Implement Search Attribute Upsert (15 min)
- Add `upsertSearchAttributes({ AccountId: [request.fromAccount] })` in the transfer workflow
- Place the upsert call early in the workflow execution

## Key Concepts
- **Search Attributes**: Custom metadata for workflow filtering and discovery
- **upsertSearchAttributes()**: Method to set search attributes from workflows

## Prerequisites
Make sure Temporal server is started with the AccountId search attribute:
```bash
temporal server start-dev --search-attribute AccountId=Keyword
```

## Testing
1. Start the worker: `npx ts-node exercise4/src/worker/index.ts`
2. Run the workflow: `npx ts-node exercise4/src/starter/index.ts`
3. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows
4. Verify the AccountId search attribute in the UI
5. Filter workflows by AccountId using CLI:
```bash
temporal workflow list --query 'AccountId="account-123"'
```

## Expected Behavior
- Workflow executes normally with all previous functionality
- AccountId search attribute is visible in Temporal Web UI
- Can filter workflows by AccountId in the Web UI
