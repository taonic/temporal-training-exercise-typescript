import { proxyActivities, setHandler, condition, defineSignal } from '@temporalio/workflow';
import type * as activities from './activities';
import type { TransferRequest } from './models';

const { withdraw, deposit, refund } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export const approveSignal = defineSignal<[boolean]>('approve');

// TODO: Implement the complete transfer workflow:
// 1. Set up signal handler for approveSignal
// 2. Withdraw from source account
// 3. Wait for approval signal using condition()
// 4. If approved: deposit to target account
// 5. If not approved: refund to source account
// 6. Return appropriate status message
export async function transfer(request: TransferRequest): Promise<string> {
  // TODO: Implement workflow logic
  return '';
}
