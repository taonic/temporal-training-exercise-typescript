import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
// TODO: Task 2 - Import patched from @temporalio/workflow
import type * as activities from './activities';
import type { TransferRequest, TransferStatus, RetryUpdate } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const retrySignal = defineSignal<[RetryUpdate]>('retry');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

export async function transfer(request: TransferRequest): Promise<string> {
  upsertSearchAttributes({ TransferStatus: ['PENDING'] });

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

  const updateStatus = (newStatus: TransferStatus) => {
    status = newStatus;
    upsertSearchAttributes({ TransferStatus: [newStatus] });
  };

  const retryActivity = async <T>(fn: () => Promise<T>): Promise<T> => {
    while (true) {
      try {
        return await fn();
      } catch (e) {
        updateStatus('PENDING_FIX');
        retryRequested = false;
        await condition(() => retryRequested);
      }
    }
  };

  await retryActivity(() => withdraw(updatedRequest.fromAccount, updatedRequest.amount));
  console.log('Withdrawal completed');

  console.log('Waiting for approval...');
  await condition(() => approvalReceived);

  if (approved) {
    updateStatus('APPROVED');
    await retryActivity(() => deposit(updatedRequest.toAccount, updatedRequest.amount));
    
    // TODO: Task 2 - Add versioning with patched('add-notification')
    // if (patched('add-notification')) {
    //   await sendNotification(updatedRequest.toAccount, updatedRequest.amount);
    // }
    
    updateStatus('COMPLETED');
    console.log('Transfer approved and completed');
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  updateStatus('CANCELLED');
  console.log('Transfer rejected and refunded');
  return 'Transfer rejected and refunded';
}
