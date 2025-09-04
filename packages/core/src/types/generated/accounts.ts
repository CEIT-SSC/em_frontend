// Generated types for Authentication API based on swagger documentation

import type { ErrorResponse, MessageResponse } from './common';

export interface UserRegistration {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number: string;
}

export interface UserRegistrationSuccess {
  email: string;
  message: string;
}

export interface EmailVerification {
  email: string;
  code: string;
}

export interface ResendVerificationEmail {
  email: string;
}

export interface SimpleForgotPassword {
  email: string;
}

export interface SocialLogin {
  access_token?: string;
  code?: string;
  id_token?: string;
}

export interface JWT {
  access: string;
  refresh: string;
  user: UserDetails;
}

export interface UserDetails {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface TokenObtainPair {
  email: string;
  password: string;
  access: string;
  refresh: string;
}

export interface TokenRefresh {
  access: string;
  refresh: string;
}

export interface TokenBlacklist {
  refresh: string;
}

export interface ChangePassword {
  old_password: string;
  new_password: string;
}

// Re-export common types for convenience
export type { ErrorResponse, MessageResponse };
