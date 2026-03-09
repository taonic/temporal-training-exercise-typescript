import { proxyActivities, setHandler, condition, defineSignal, defineQuery } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest, TransferStatus } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');
export const getStatusQuery = defineQuery<TransferStatus>('getStatus');

// TODO: Implement query handler for "getStatus" that returns current status
// TODO: Update status at each step:
//   - 'PENDING' at start
//   - 'APPROVED' when approved
//   - 'COMPLETED' when deposit succeeds
//   - 'CANCELLED' when refunded
//   - 'FAILED' on errors
export async function transfer(request: TransferRequest): Promise<string> {
  let status: TransferStatus = 'PENDING';
  let approved = false;
  let approvalReceived = false;

  // TODO: Set up query handler for getStatusQuery using setHandler()

  setHandler(approveSignal, (value: boolean) => {
    approved = value;
    approvalReceived = true;
  });

  await withdraw(request.fromAccount, request.amount);
  // TODO: Update status to 'FAILED' on error (use try/catch)

  await condition(() => approvalReceived);

  if (approved) {
    // TODO: Update status to 'APPROVED'
    await deposit(request.toAccount, request.amount);
    // TODO: Update status to 'COMPLETED'
    return 'Transfer completed successfully';
  }

  await refund(request.fromAccount, request.amount);
  // TODO: Update status to 'CANCELLED'
  return 'Transfer rejected and refunded';
}
