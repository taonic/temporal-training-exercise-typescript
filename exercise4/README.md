# Exercise 4: Visibility & Monitoring with Custom Search Attributes (30 min)

## Learning Objectives
- Create and use Custom Search Attributes for workflow filtering
- Upsert Search Attributes from within workflows
- Understand how Search Attributes enable workflow discovery

## Tasks

### 1. Implement Search Attribute Upsert (15 min)
- Set `AccountId` in `client.workflow.start()` searchAttributes in the starter
- Add `upsertSearchAttributes()` in the transfer workflow to update:
  - `TransferStatus`: Set to current status and update as workflow progresses
- Update `TransferStatus` as the workflow transitions through states (PENDING, APPROVED, COMPLETED, CANCELLED, FAILED)

## Key Concepts
- **Search Attributes**: Custom metadata for workflow filtering and discovery
- **upsertSearchAttributes()**: Method to set search attributes from workflows

## Prerequisites
Make sure Temporal server is started with the AccountId and TransferStatus search attributes:
```bash
temporal server start-dev --search-attribute AccountId=Keyword --search-attribute TransferStatus=Keyword
```

## Testing
1. Start the worker: `npx ts-node exercise4/src/worker/index.ts`
2. Run the workflow: `npx ts-node exercise4/src/starter/index.ts`
3. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows
4. Verify the AccountId and TransferStatus search attributes in the UI
5. Filter workflows by search attributes using CLI:
```bash
temporal workflow list --query 'AccountId="account-123"'
temporal workflow list --query 'TransferStatus="COMPLETED"'
```

### Explore Search Attributes in Temporal UI
- Customize the workflow list view by clicking the cog icon and adding AccountId and TransferStatus columns
- Use the search bar to filter workflows: `AccountId="account-123"` or `TransferStatus="COMPLETED"`

## Expected Behavior
- Workflow executes normally with all previous functionality
- AccountId and TransferStatus search attributes are visible in Temporal Web UI
- TransferStatus updates as workflow progresses through different states
- Can filter workflows by AccountId or TransferStatus in the Web UI
