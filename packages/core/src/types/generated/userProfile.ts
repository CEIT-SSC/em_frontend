// Generated types for User Profile APIs based on swagger documentation

export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  profile_picture?: string;
  date_joined: string;
}

export interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  profile_picture?: string;
}

export interface ChangePassword {
  old_password: string;
  new_password: string;
}

export interface SimpleForgotPassword {
  email: string;
}

export interface EmailVerification {
  email: string;
  code: string; // 6 characters
}

export interface ResendVerificationEmail {
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
  access?: string; // readonly
  refresh?: string; // readonly
}

export interface TokenRefresh {
  refresh: string;
  access?: string; // readonly
}

export interface TokenBlacklist {
  refresh: string;
}

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

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}
