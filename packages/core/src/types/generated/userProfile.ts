// Generated types for User Profile API based on swagger documentation

import type { ErrorResponse, MessageResponse } from './common';

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

// Re-export common types for convenience
export type { ErrorResponse, MessageResponse };
