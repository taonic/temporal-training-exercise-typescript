# Exercise 4 Solution: Visibility & Monitoring with Custom Search Attributes

## Key Implementation

### Upsert Search Attributes
```typescript
upsertSearchAttributes({ AccountId: [request.fromAccount] });
```

## Key Points
- Place early in workflow execution
- Enables filtering workflows by account
- Immediately visible in Temporal Web UI
- Can be updated multiple times during workflow execution

## Testing
1. Start worker: `npx ts-node exercise4/src/worker/index.ts`
2. Run workflow: `npx ts-node exercise4/src/starter/index.ts`
3. Verify in Web UI: Open http://localhost:8233 and check workflow details
4. Filter workflows by AccountId using CLI:
```bash
temporal workflow list --query 'AccountId="account-123"'
```
