import { proxyActivities, setHandler, condition, defineSignal, defineQuery, upsertSearchAttributes } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

// TODO: Use upsertSearchAttributes to update 'TransferStatus' throughout workflow
export async function transfer(request: TransferRequest): Promise<string> {
  // TODO: Update TransferStatus search attribute as workflow progresses
  // upsertSearchAttributes({ TransferStatus: ['PENDING'] });

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
    // TODO: Update TransferStatus search attribute
    // upsertSearchAttributes({ TransferStatus: ['FAILED'] });
    throw e;
  }

  await condition(() => approvalReceived);

  if (approved) {
    status = 'APPROVED';
    // TODO: Update TransferStatus search attribute
    // upsertSearchAttributes({ TransferStatus: ['APPROVED'] });
    try {
      await deposit(request.toAccount, request.amount);
    } catch (e) {
      status = 'FAILED';
      // TODO: Update TransferStatus search attribute
      // upsertSearchAttributes({ TransferStatus: ['FAILED'] });
      throw e;
    }
    status = 'COMPLETED';
    // TODO: Update TransferStatus search attribute
    // upsertSearchAttributes({ TransferStatus: ['COMPLETED'] });
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  status = 'CANCELLED';
  // TODO: Update TransferStatus search attribute
  // upsertSearchAttributes({ TransferStatus: ['CANCELLED'] });
  return 'Transfer rejected and refunded';
}
