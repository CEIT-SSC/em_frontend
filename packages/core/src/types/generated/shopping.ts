// Generated types for Cart and Shopping APIs based on swagger documentation

import type { ErrorResponse, MessageResponse, PaginatedResponse } from './common';
import type { Presentation } from './presentations';

export interface Cart {
  id: number;
  user: number;
  items: CartItem[];
  applied_discount_code?: number;
  applied_discount_code_details: string;
  subtotal: string;
  discount_applied: string;
  total: string;
  created_at: string;
}

export interface CartItem {
  id: number;
  content_type: number; // Item Type
  object_id: number; // Item ID
  item_details: ItemDetail;
  price: string;
  added_at: string;
}

export interface ItemDetail {
  presentation?: Presentation;
  solo_competition?: SoloCompetition;
  competition_team?: CompetitionTeamDetail;
  item_type: ItemTypeEnum;
}

export enum ItemTypeEnum {
  PRESENTATION = "presentation",
  SOLO_COMPETITION = "solo_competition",
  COMPETITION_TEAM = "competition_team"
}

// Add to cart request
export interface AddToCart {
  item_type: ItemTypeEnum;
  item_id: number;
}

// Apply/Remove discount
export interface ApplyDiscount {
  code: string;
}

// Order related types
export interface Order {
  order_id: string;
  user?: number;
  user_email?: string;
  items: OrderItem[];
  subtotal_amount: string;
  discount_code_applied?: number;
  discount_code_str?: string;
  discount_amount: string;
  total_amount: string;
  status: OrderStatusEnum;
  payment_gateway_authority?: string;
  payment_gateway_txn_id?: string;
  created_at: string;
  paid_at?: string;
}

export interface OrderItem {
  id: number;
  item_details: ItemDetail;
  description: string; // Item Description (at time of order)
  price: string; // Price (at time of order)
}

export interface OrderList {
  order_id: string;
  total_amount: string;
  status: OrderStatusEnum;
  created_at: string;
  paid_at?: string;
}

export enum OrderStatusEnum {
  PENDING_PAYMENT = "pending_payment",
  AWAITING_GATEWAY_REDIRECT = "awaiting_gateway_redirect",
  PAYMENT_FAILED = "payment_failed",
  PROCESSING_ENROLLMENT = "processing_enrollment",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REFUND_PENDING = "refund_pending",
  REFUNDED = "refunded"
}

export interface PaginatedOrderListList {
  count: number;
  next?: string;
  previous?: string;
  results: OrderList[];
}

// Payment related types
export interface PaymentInitiateResponse {
  payment_url: string;
  authority: string;
}

// Supporting types from other modules (simplified versions for cart context)
export interface SoloCompetition {
  id: number;
  title: string;
  description: string;
  price_per_participant?: string;
  is_paid: boolean;
  start_datetime: string;
  end_datetime: string;
}

export interface CompetitionTeamDetail {
  id: number;
  name: string;
  group_competition_title: string;
  status: string;
  created_at: string;
}

// Re-export common types for convenience
export type { ErrorResponse, MessageResponse };
