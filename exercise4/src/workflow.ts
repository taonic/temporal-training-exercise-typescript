import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

// TODO: Use upsertSearchAttributes to set 'AccountId' to request.fromAccount
export async function transfer(request: TransferRequest): Promise<string> {
  // TODO: Set search attributes using upsertSearchAttributes()
  // upsertSearchAttributes({ AccountId: [request.fromAccount] });

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
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  return 'Transfer rejected and refunded';
}
