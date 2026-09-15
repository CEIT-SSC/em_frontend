export type OrderStatus =
  | "pending_payment"
  | "processing_enrollment"
  | "completed"
  | "cancelled"
  | "payment_failed"
  | "refunded";

export interface CheckoutOrderSummary {
  order_id: string;
  status: OrderStatus;
  total_amount: string;
}

export interface OrderCheckoutResult {
  order: CheckoutOrderSummary | null;
  payment_required: boolean;
  payment_url: string | null;
  topup_id: string | null;
  wallet_balance: string;
}
