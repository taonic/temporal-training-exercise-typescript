import { Client } from '@temporalio/client';
import { transfer, approveSignal, retrySignal } from '../workflow';
import type { TransferRequest } from '../models';

const randomSuffix = () =>
  Array.from({ length: 6 }, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('');

async function main() {
  const client = new Client();

  const request: TransferRequest = {
    fromAccount: 'invalid-account',
    toAccount: 'account-456',
    amount: 100.0,
    transferId: 'transfer-1',
  };

  const handle = await client.workflow.start(transfer, {
    taskQueue: 'money-transfer-task-queue',
    workflowId: `money-transfer-workflow-${randomSuffix()}`,
    args: [request],
    searchAttributes: {
      AccountId: [request.fromAccount],
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Sending retry signal with corrected account...');
  await handle.signal(retrySignal, { key: 'fromAccount', value: 'account-123' });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await handle.signal(approveSignal, true);

  const result = await handle.result();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
