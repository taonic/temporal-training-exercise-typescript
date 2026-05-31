import { Client } from '@temporalio/client';
import { transfer, approveSignal } from '../workflow';
import type { TransferRequest } from '../models';

const randomSuffix = () =>
  Array.from({ length: 6 }, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('');

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: `money-transfer-workflow-${randomSuffix()}`,
    args: [request],
  });

  // TODO: Send approval signal after delay
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
