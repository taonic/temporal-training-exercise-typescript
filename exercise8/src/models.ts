export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PENDING_FIX';

export interface RetryUpdate {
  key: string;
  value: string;
}
