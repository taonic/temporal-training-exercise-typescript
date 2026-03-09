# Exercise 1 Solution: Hello Temporal

## workflow.ts
```typescript
export async function greet(name: string): Promise<string> {
  return await createGreeting(name);
}
```

## activities.ts
```typescript
export async function createGreeting(name: string): Promise<string> {
  return `Hello, ${name}!`;
}
```

## worker/index.ts
```typescript
const worker = await Worker.create({
  workflowsPath: require.resolve('../src/workflow'),
  activities,
  taskQueue: TASK_QUEUE,
});
```

## Running the Exercise
1. Start worker: `npx ts-node exercise1/src/worker/index.ts`
2. Execute workflow: `npx ts-node exercise1/src/starter/index.ts`
