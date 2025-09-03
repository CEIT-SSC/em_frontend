// Generated types for Presentations API based on swagger documentation

import type { ErrorResponse, MessageResponse, PaginatedResponse } from './common';

export interface Presenter {
  id: number;
  name: string;
  email?: string;
  bio?: string;
  presenter_picture?: string;
  created_at: string;
}

export enum PresentationType {
  COURSE = "course",
  TALK = "talk",
  WORKSHOP = "workshop"
}

export interface Presentation {
  id: number;
  event?: number;
  event_title?: string;
  title: string;
  description: string;
  presenters_details: Presenter[];
  type: PresentationType;
  is_online: boolean;
  location?: string;
  online_link?: string;
  start_time: string;
  end_time: string;
  is_paid: boolean;
  price?: string;
  capacity?: number;
  created_at: string;
  is_active: boolean;
}

export interface PaginatedPresentationList extends PaginatedResponse<Presentation> {}

// Presentation enrollment related types
export interface PresentationEnrollment {
  id: number;
  user_email: string;
  presentation_title: string;
  status: EnrollmentStatus;
  enrolled_at: string;
  order_item?: number;
}

export enum EnrollmentStatus {
  PENDING_PAYMENT = "pending_payment",
  COMPLETED_OR_FREE = "completed_or_free",
  PAYMENT_FAILED = "payment_failed",
  CANCELLED = "cancelled"
}

// Query parameters for presentations endpoint
export interface PresentationQueryParams {
  event?: number;
  is_online?: boolean;
  is_paid?: boolean;
  page?: number;
  type?: PresentationType;
}

// Re-export common types for convenience
export type { ErrorResponse, MessageResponse };
