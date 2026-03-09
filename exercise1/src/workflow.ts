import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { createGreeting } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

// TODO: Implement the greet workflow function
// - Call the createGreeting activity with the name parameter
// - Return the result
export async function greet(name: string): Promise<string> {
  return ''; // Replace with activity call
}
