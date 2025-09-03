import { AxiosResponse } from "axios";
import { Api } from "../api";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import {
  UserProfile,
  UserProfileUpdate,
  ChangePassword,
  SimpleForgotPassword,
  EmailVerification,
  ResendVerificationEmail,
  SocialLogin,
  JWT,
  TokenObtainPair,
  TokenRefresh,
  TokenBlacklist,
  UserRegistration,
  UserRegistrationSuccess,
  MessageResponse,
  ErrorResponse,
} from "../../types/generated/userProfile";

type RequestResponse<T> = AxiosResponse<T | ErrorResponse>;

export class UserProfileApi {
  constructor() {}

  // ===== PROFILE MANAGEMENT =====

  /**
   * Get user profile information
   * GET /api/profile/
   */
  async getProfile(): Promise<RequestResponse<UserProfile>> {
    return await Api.get<UserProfile, RequestResponse<UserProfile>>(
      apiPath(ApiPath.USER_PROFILE)
    );
  }

  /**
   * Update user profile (full update)
   * PUT /api/profile/
   */
  async updateProfile(profileData: UserProfileUpdate): Promise<RequestResponse<UserProfile>> {
    return await Api.put<UserProfile, RequestResponse<UserProfile>, UserProfileUpdate>(
      apiPath(ApiPath.USER_PROFILE),
      profileData
    );
  }

  /**
   * Partially update user profile
   * PATCH /api/profile/
   */
  async patchProfile(profileData: Partial<UserProfileUpdate>): Promise<RequestResponse<UserProfile>> {
    return await Api.patch<UserProfile, RequestResponse<UserProfile>, Partial<UserProfileUpdate>>(
      apiPath(ApiPath.USER_PROFILE),
      profileData
    );
  }

  // ===== PASSWORD MANAGEMENT =====

  /**
   * Change user password
   * PUT /api/change-password/
   */
  async changePassword(passwordData: ChangePassword): Promise<RequestResponse<MessageResponse>> {
    return await Api.put<MessageResponse, RequestResponse<MessageResponse>, ChangePassword>(
      apiPath(ApiPath.USER_CHANGE_PASSWORD),
      passwordData
    );
  }

  /**
   * Partially change user password
   * PATCH /api/change-password/
   */
  async patchChangePassword(passwordData: Partial<ChangePassword>): Promise<RequestResponse<MessageResponse>> {
    return await Api.patch<MessageResponse, RequestResponse<MessageResponse>, Partial<ChangePassword>>(
      apiPath(ApiPath.USER_CHANGE_PASSWORD),
      passwordData
    );
  }

  /**
   * Request password reset
   * POST /api/forgot-password/
   */
  async forgotPassword(email: SimpleForgotPassword): Promise<RequestResponse<MessageResponse>> {
    return await Api.post<MessageResponse, RequestResponse<MessageResponse>, SimpleForgotPassword>(
      apiPath(ApiPath.USER_FORGOT_PASSWORD),
      email
    );
  }

  // ===== EMAIL VERIFICATION =====

  /**
   * Verify user email with code
   * POST /api/verify-email/
   */
  async verifyEmail(verificationData: EmailVerification): Promise<RequestResponse<MessageResponse>> {
    return await Api.post<MessageResponse, RequestResponse<MessageResponse>, EmailVerification>(
      apiPath(ApiPath.USER_VERIFY_EMAIL),
      verificationData
    );
  }

  /**
   * Resend email verification code
   * POST /api/resend-verify-email/
   */
  async resendVerificationEmail(emailData: ResendVerificationEmail): Promise<RequestResponse<MessageResponse>> {
    return await Api.post<MessageResponse, RequestResponse<MessageResponse>, ResendVerificationEmail>(
      apiPath(ApiPath.USER_RESEND_VERIFY_EMAIL),
      emailData
    );
  }

  // ===== AUTHENTICATION =====

  /**
   * Login with email and password
   * POST /api/token/
   */
  async login(credentials: Pick<TokenObtainPair, 'email' | 'password'>): Promise<RequestResponse<TokenObtainPair>> {
    return await Api.post<TokenObtainPair, RequestResponse<TokenObtainPair>, Pick<TokenObtainPair, 'email' | 'password'>>(
      apiPath(ApiPath.AUTH_LOGIN),
      credentials
    );
  }

  /**
   * Refresh JWT token
   * POST /api/token/refresh/
   */
  async refreshToken(refreshData: TokenRefresh): Promise<RequestResponse<TokenRefresh>> {
    return await Api.post<TokenRefresh, RequestResponse<TokenRefresh>, TokenRefresh>(
      apiPath(ApiPath.AUTH_REFRESH),
      refreshData
    );
  }

  /**
   * Logout (blacklist token)
   * POST /api/token/blacklist/
   */
  async logout(tokenData: TokenBlacklist): Promise<RequestResponse<TokenBlacklist>> {
    return await Api.post<TokenBlacklist, RequestResponse<TokenBlacklist>, TokenBlacklist>(
      apiPath(ApiPath.AUTH_LOGOUT),
      tokenData
    );
  }

  /**
   * Register new user
   * POST /api/register/
   */
  async register(userData: UserRegistration): Promise<RequestResponse<UserRegistrationSuccess | MessageResponse>> {
    return await Api.post<UserRegistrationSuccess | MessageResponse, RequestResponse<UserRegistrationSuccess | MessageResponse>, UserRegistration>(
      apiPath(ApiPath.AUTH_REGISTER),
      userData
    );
  }

  /**
   * Google authentication (PKCE or Implicit Flow)
   * POST /api/auth/google/
   */
  async googleAuth(authData: SocialLogin): Promise<RequestResponse<JWT>> {
    return await Api.post<JWT, RequestResponse<JWT>, SocialLogin>(
      apiPath(ApiPath.AUTH_GOOGLE),
      authData
    );
  }

  // ===== UTILITY METHODS =====

  /**
   * Check if user profile is complete
   */
  isProfileComplete(profile: UserProfile): boolean {
    return !!(
      profile.first_name &&
      profile.last_name &&
      profile.phone_number &&
      profile.email
    );
  }

  /**
   * Get user's full name
   */
  getFullName(profile: UserProfile): string {
    return `${profile.first_name} ${profile.last_name}`.trim();
  }

  /**
   * Get user's initials
   */
  getUserInitials(profile: UserProfile): string {
    const firstInitial = profile.first_name?.charAt(0)?.toUpperCase() || '';
    const lastInitial = profile.last_name?.charAt(0)?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }

  /**
   * Validate email format (client-side helper)
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format (basic validation)
   */
  isValidPhoneNumber(phone: string): boolean {
    // Basic phone validation - adjust regex based on your requirements
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Validate password strength (client-side helper)
   */
  validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Format profile data for display
   */
  formatProfileForDisplay(profile: UserProfile): {
    displayName: string;
    initials: string;
    memberSince: string;
    isComplete: boolean;
  } {
    return {
      displayName: this.getFullName(profile),
      initials: this.getUserInitials(profile),
      memberSince: new Date(profile.date_joined).toLocaleDateString(),
      isComplete: this.isProfileComplete(profile),
    };
  }
}
