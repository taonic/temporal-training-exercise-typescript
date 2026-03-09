export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transferId: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
