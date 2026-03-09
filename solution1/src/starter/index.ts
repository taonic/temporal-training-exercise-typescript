import { Client } from '@temporalio/client';
import { greet } from '../workflow';

async function main() {
  const client = new Client();

  const handle = await client.workflow.start(greet, {
    taskQueue: 'hello-task-queue',
    workflowId: 'greeting-workflow',
    args: ['Temporal'],
  });

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
