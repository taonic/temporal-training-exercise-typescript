import { log } from '@temporalio/activity';

// TODO: Implement withdraw logic with logging and simulate occasional failures
// Use Math.random() < 0.1 to simulate network failures and return an error
export async function withdraw(account: string, amount: number): Promise<void> {
  log.info('Withdrawing', { amount, account });
  // TODO: Add failure simulation
}

// TODO: Implement deposit logic with logging and simulate occasional failures
// Use Math.random() < 0.05 to simulate network failures and return an error
export async function deposit(account: string, amount: number): Promise<void> {
  log.info('Depositing', { amount, account });
  // TODO: Add failure simulation
}

export async function refund(account: string, amount: number): Promise<void> {
  log.info('Refunding', { amount, account });
}
