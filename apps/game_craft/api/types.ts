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
