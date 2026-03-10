import { log, ApplicationFailure } from '@temporalio/activity';

// TODO: Throw ApplicationFailure.nonRetryable() for invalid account errors
export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (account === 'invalid-account') throw new Error('withdrawal failed - invalid account');
}

// TODO: Throw ApplicationFailure.nonRetryable() for invalid account errors
export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (account === 'invalid-account') throw new Error('deposit failed - invalid account');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
