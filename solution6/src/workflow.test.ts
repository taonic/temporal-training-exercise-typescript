import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { transfer, approveSignal, getStatusQuery } from './workflow';
import type { TransferRequest } from './models';
import { defineSearchAttributeKey, SearchAttributeType } from '@temporalio/common';
import assert from 'assert';

describe('MoneyTransfer Workflow', () => {
  let testEnv: TestWorkflowEnvironment;
  let worker: Worker;
  let runPromise: Promise<void>;

  before(async function () {
    this.timeout(60000);
    testEnv = await TestWorkflowEnvironment.createLocal({
      server: {
        searchAttributes: [defineSearchAttributeKey('AccountId', SearchAttributeType.KEYWORD)],
      },
    });
    worker = await Worker.create({
      connection: testEnv.nativeConnection,
      taskQueue: 'test-queue',
      workflowsPath: require.resolve('./workflow'),
      activities: {
        withdraw: async () => {},
        deposit: async () => {},
        refund: async () => {},
      },
    });
    runPromise = worker.run();
  });

  after(async () => {
    worker.shutdown();
    await runPromise;
    await testEnv.teardown();
  });

  const makeRequest = (transferId: string): TransferRequest => ({
    fromAccount: 'account-123',
    toAccount: 'account-456',
    amount: 100.0,
    transferId,
  });

  it('completes successfully when approved', async () => {
    const { client } = testEnv;

    const handle = await client.workflow.start(transfer, {
      taskQueue: 'test-queue',
      workflowId: `test-transfer-${Date.now()}`,
      args: [makeRequest('transfer-1')],
    });

    await handle.signal(approveSignal, true);
    const result = await handle.result();
    assert.strictEqual(result, 'Transfer completed successfully');
  });

  it('refunds when rejected', async () => {
    const { client } = testEnv;

    const handle = await client.workflow.start(transfer, {
      taskQueue: 'test-queue',
      workflowId: `test-transfer-${Date.now()}`,
      args: [makeRequest('transfer-2')],
    });

    await handle.signal(approveSignal, false);
    const result = await handle.result();
    assert.strictEqual(result, 'Transfer rejected and refunded');
  });

  it('returns PENDING status before approval', async () => {
    const { client } = testEnv;

    const handle = await client.workflow.start(transfer, {
      taskQueue: 'test-queue',
      workflowId: `test-transfer-${Date.now()}`,
      args: [makeRequest('transfer-3')],
    });

    // Query status while waiting for approval (workflow is blocked on condition)
    const status = await handle.query(getStatusQuery);
    assert.strictEqual(status, 'PENDING');

    await handle.signal(approveSignal, true);
    await handle.result();
  });
});
