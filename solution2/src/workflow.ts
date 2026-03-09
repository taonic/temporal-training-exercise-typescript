import { proxyActivities, setHandler, condition, defineSignal } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');

export async function transfer(request: TransferRequest): Promise<string> {
  let approved = false;
  let approvalReceived = false;

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  await withdraw(request.fromAccount, request.amount);
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    await deposit(request.toAccount, request.amount);
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
