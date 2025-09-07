// Base API types and interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
  page_size: number;
  current_page: number;
  total_pages: number;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_verified: boolean;
  date_joined: string;
}

// Common request/response types
export interface LoginRequest {
  username: string; // email
  password: string;
  grant_type: 'password';
  client_id: string;
  client_secret: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface VerifyEmailRequest {
  email: string;
  verification_code: string;
}

export interface UserProfileUpdateRequest {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

// Presentation types
export interface PresenterDetail {
  id: number;
  name: string;
  email: string;
  bio: string;
  presenter_picture: string | null;
  created_at: string;
}

export interface Presentation {
  id: number;
  event: number;
  event_title: string;
  title: string;
  description: string;
  presenters_details: PresenterDetail[];
  type: 'workshop' | 'talk' | 'panel' | 'demo';
  is_online: boolean;
  location: string | null;
  online_link: string | null;
  start_time: string; // ISO datetime
  end_time: string; // ISO datetime
  is_paid: boolean;
  price: string; // Decimal as string
  capacity: number;
  created_at: string;
  is_active: boolean;
  // Additional fields that might be available
  registered_count?: number;
  is_registered?: boolean; // If current user is registered
  tags?: string[];
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  language?: 'en' | 'fa';
  materials_link?: string;
  slides_link?: string;
  recording_link?: string;
  requirements?: string;
  updated_at?: string;
  is_featured?: boolean;
}

export interface PresentationCreateRequest {
  event: number;
  title: string;
  description: string;
  presenters_details: Array<{
    name: string;
    email: string;
    bio: string;
    presenter_picture?: File | string;
  }>;
  type: 'workshop' | 'talk' | 'panel' | 'demo';
  is_online: boolean;
  location?: string;
  online_link?: string;
  start_time: string;
  end_time: string;
  is_paid: boolean;
  price?: string; // Decimal as string
  capacity: number;
  is_active?: boolean;
  // Optional additional fields
  tags?: string[];
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  language?: 'en' | 'fa';
  materials_link?: string;
  slides_link?: string;
  requirements?: string;
  is_featured?: boolean;
}

export interface PresentationUpdateRequest extends Partial<PresentationCreateRequest> {
  is_featured?: boolean;
  is_active?: boolean;
}

export interface PresentationRegistration {
  id: number;
  user: User;
  presentation: Presentation;
  registered_at: string;
  attendance_status: 'pending' | 'attended' | 'absent';
  feedback_rating?: number;
  feedback_comment?: string;
}

export interface PresentationRegistrationRequest {
  presentation_id: number;
}

export interface PresentationFeedbackRequest {
  registration_id: number;
  rating: number; // 1-5
  comment?: string;
}

export interface PresentationFilterParams {
  event?: number; // Filter by event ID
  type?: 'workshop' | 'talk' | 'panel' | 'demo';
  is_online?: boolean;
  is_paid?: boolean;
  is_active?: boolean;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  language?: 'en' | 'fa';
  is_featured?: boolean;
  date_from?: string; // ISO date
  date_to?: string; // ISO date
  search?: string;
  tags?: string[];
  page?: number;
  page_size?: number;
  ordering?: 'start_time' | '-start_time' | 'title' | '-title' | 'created_at' | '-created_at' | 'price' | '-price';
}
