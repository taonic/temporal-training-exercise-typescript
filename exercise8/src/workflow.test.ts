import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { transfer, approveSignal } from './workflow';
import type { TransferRequest } from './models';
import { defineSearchAttributeKey, SearchAttributeType } from '@temporalio/common';
import assert from 'assert';

// TODO: Task 3 - Implement replay test
// This test should:
// 1. Create a workflow history without the notification (old version)
// 2. Replay that history with the new workflow code (with patched)
// 3. Verify the replay succeeds without errors

describe('Exercise 8: Workflow Versioning', () => {
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
        // TODO: Task 1 - Add sendNotification mock
        // sendNotification: async () => {},
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

  // TODO: Task 3 - Add replay test here
  // it('should replay old workflow history without notification', async () => {
  //   // Load pre-generated workflow history from v1 (without notification)
  //   const historyPath = path.join(__dirname, 'workflow-history-v1.json');
  //   const historyJson = fs.readFileSync(historyPath, 'utf8');
  //   const { history: historyBase64 } = JSON.parse(historyJson);
  //   
  //   // Decode from base64 and deserialize protobuf
  //   const historyBytes = Buffer.from(historyBase64, 'base64');
  //   const { temporal } = await import('@temporalio/proto');
  //   const history = temporal.api.history.v1.History.decode(historyBytes);
  //
  //   // Replay with new workflow code (with patched)
  //   await Worker.runReplayHistory(
  //     {
  //       workflowsPath: require.resolve('./workflow'),
  //     },
  //     history
  //   );
  //   // If replay succeeds without throwing, test passes
  // });
});
