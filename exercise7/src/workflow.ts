import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus, RetryUpdate } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const retrySignal = defineSignal<[RetryUpdate]>('retry');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

// TODO: Implement manual retry pattern:
//   1. Create updateStatus helper to update status and search attributes
//   2. Create retryActivity helper that wraps activities in while(true) loop
//   3. On error, call updateStatus('PENDING_FIX') and wait for retrySignal
//   4. Set up retrySignal handler to update request fields
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

  // TODO: Set up retrySignal handler

  // TODO: Create updateStatus helper function

  // TODO: Create retryActivity helper function

  // TODO: Use retryActivity for withdraw
  await withdraw(updatedRequest.fromAccount, updatedRequest.amount);

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    // TODO: Use retryActivity for deposit
    await deposit(updatedRequest.toAccount, updatedRequest.amount);
    status = 'COMPLETED';
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  status = 'CANCELLED';
  return 'Transfer rejected and refunded';
}
