import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

const TASK_QUEUE = 'hello-task-queue';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: TASK_QUEUE,
  });
  await worker.run();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
