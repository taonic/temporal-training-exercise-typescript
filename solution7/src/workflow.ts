import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus, RetryUpdate } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: { maximumAttempts: 1 },
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const retrySignal = defineSignal<[RetryUpdate]>('retry');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ AccountId: [request.fromAccount] });

  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;
  let retryRequested = false;
  const updatedRequest = { ...request };

  setHandler(getStatusQuery, () => status);

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  setHandler(retrySignal, (update: RetryUpdate) => {
    if (update.key === 'fromAccount') updatedRequest.fromAccount = update.value;
    else if (update.key === 'toAccount') updatedRequest.toAccount = update.value;
    else if (update.key === 'amount') updatedRequest.amount = parseFloat(update.value);
    retryRequested = true;
  });

  while (true) {
    try {
      await withdraw(updatedRequest.fromAccount, updatedRequest.amount);
      break;
    } catch (e) {
      status = 'RETRYING';
      retryRequested = false;
      await condition(() => retryRequested);
    }
  }
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    while (true) {
      try {
        await deposit(updatedRequest.toAccount, updatedRequest.amount);
        break;
      } catch (e) {
        status = 'RETRYING';
        retryRequested = false;
        await condition(() => retryRequested);
      }
    }
    status = 'COMPLETED';
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  status = 'CANCELLED';
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
