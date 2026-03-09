import { proxyActivities, setHandler, condition, defineSignal, defineQuery } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  try {
    await withdraw(request.fromAccount, request.amount);
  } catch (e) {
    status = 'FAILED';
    throw e;
  }
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      throw e;
    }
    status = 'COMPLETED';
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
