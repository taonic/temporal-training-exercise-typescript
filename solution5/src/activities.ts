import { log } from '@temporalio/activity';

export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  if (Math.random() < 0.1) throw new Error('withdrawal failed - insufficient funds');
}

export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  if (Math.random() < 0.05) throw new Error('deposit failed - account not found');
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
