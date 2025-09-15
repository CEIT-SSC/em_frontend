// /home/duckwichtrust/Desktop/Projects/event-manager/em_frontend/packages/core/src/types/api/Order/Order.ts

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "failed"
  | "cancelled"
  | string;

export type Order = {
  order_id: string; // uuid
  user: number;
  user_email: string;
  event: number;
  presentations: string;
  solo_competitions: string;
  competition_teams: string;
  products: string;
  subtotal_amount: string; // monetary values kept as strings (e.g. "-.")
  discount_code_applied: number; // backend provided 0/1
  discount_code_str: string;
  discount_amount: string;
  total_amount: string;
  status: OrderStatus;
  payment_gateway_authority: string | null;
  payment_gateway_txn_id: string | null;
  created_at: string; // ISO timestamp
  paid_at: string | null; // ISO timestamp or null if not paid
};
