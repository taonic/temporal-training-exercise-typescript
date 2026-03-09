import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { createGreeting } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

export async function greet(name: string): Promise<string> {
  return await createGreeting(name);
}
