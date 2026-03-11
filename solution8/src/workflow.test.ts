import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { transfer, approveSignal } from './workflow';
import type { TransferRequest } from './models';
import { defineSearchAttributeKey, SearchAttributeType } from '@temporalio/common';
import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Solution 8: Workflow Versioning', () => {
  let testEnv: TestWorkflowEnvironment;
  let worker: Worker;
  let runPromise: Promise<void>;

  before(async function () {
    this.timeout(60000);
    testEnv = await TestWorkflowEnvironment.createLocal({
      server: {
        searchAttributes: [
          defineSearchAttributeKey('AccountId', SearchAttributeType.KEYWORD),
          defineSearchAttributeKey('TransferStatus', SearchAttributeType.KEYWORD),
        ],
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
        sendNotification: async () => {},
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

  it('should execute new workflow with notification', async () => {
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

  it('should replay old workflow history without notification', async () => {
    // Load pre-generated workflow history from v1 (without notification)
    const historyPath = path.join(__dirname, 'workflow-history-v1.json');
    const history = JSON.parse(await fs.promises.readFile(historyPath, 'utf8'));

    // Replay with new workflow code (with patched)
    await Worker.runReplayHistory(
      {
        workflowsPath: require.resolve('./workflow'),
      },
      history
    );
    // If replay succeeds without throwing, test passes
  });
});
