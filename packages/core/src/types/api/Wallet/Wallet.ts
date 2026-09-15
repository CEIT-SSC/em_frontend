export type WalletCurrency = "IRT";

export interface WalletBalance {
  balance: string;
  currency: WalletCurrency;
}

export type WalletTopUpStatus =
  | "pending"
  | "awaiting_gateway"
  | "credited"
  | "failed"
  | "cancelled";

export interface WalletTopUpStartResult {
  payment_url: string | null;
}

export interface WalletTopUpResult {
  amount: string;
  status: WalletTopUpStatus;
  credited_at: string | null;
}

export type WalletTransactionType =
  | "topup"
  | "purchase"
  | "refund"
  | "adjustment";

export type WalletTransactionDirection = "credit" | "debit";

export interface WalletTransaction {
  id: number;
  entry_type: WalletTransactionType;
  direction: WalletTransactionDirection;
  amount: string;
  created_at: string;
}

export interface WalletTransactionPage {
  count: number;
  results: WalletTransaction[];
}
