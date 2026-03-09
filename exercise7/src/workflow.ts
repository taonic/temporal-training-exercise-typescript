import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes, ActivityFailure } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus, RetryUpdate } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: { maximumAttempts: 1 },
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const retrySignal = defineSignal<[RetryUpdate]>('retry');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

// TODO: Implement manual retry loops for withdraw and deposit activities:
//   1. Wrap activity calls in a while(true) loop
//   2. On error, set status to 'RETRYING' and wait for retrySignal
//   3. Handle retrySignal to update request fields based on key/value
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

  // TODO: Set up retrySignal handler that updates updatedRequest fields
  // and sets retryRequested = true

  // TODO: Wrap Withdraw in retry loop
  await withdraw(updatedRequest.fromAccount, updatedRequest.amount);

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    // TODO: Wrap Deposit in retry loop
    await deposit(updatedRequest.toAccount, updatedRequest.amount);
    status = 'COMPLETED';
    return 'Transfer completed successfully';
  }

  await refund(updatedRequest.fromAccount, updatedRequest.amount);
  status = 'CANCELLED';
  return 'Transfer rejected and refunded';
}
