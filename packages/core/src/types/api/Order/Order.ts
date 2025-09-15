export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "cancelled"
  | "refunded"
  | (string & {});

export interface OrderItem {
  id: number;
  description: string;
  price: string; // monetary value as string (e.g. "-43638.3")
  content_type: number;
  object_id: number;
  event_id: number;
  item_type: string;
  item_title: string;
}

export interface Order {
  id: number;
  order_id: string;
  total_amount: string; // monetary value as string (e.g. "50657208.0")
  status: OrderStatus;
  created_at: string; // ISO 8601 timestamp
  paid_at: string | null; // ISO 8601 timestamp or null
  items: OrderItem[];
}

export type Orders = Order[];
