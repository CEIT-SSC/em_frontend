import { httpClient } from '../httpClient';
import { API_CONFIG } from '../config';
import { TokenManager } from '../tokenManager';
import type { 
  ApiResponse, 
  User, 
  AuthTokens, 
  LoginRequest, 
  RegisterRequest,
  ForgotPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  UserProfileUpdateRequest,
  UserRegistrationSuccess,
  ResendVerifyEmailRequest,
  SocialLoginRequest,
  HandshakeToken
} from '../types';

/**
 * Authentication API service
 * Implements all auth-related endpoints from the API documentation
 */
export class AuthService {
  /**
   * Login user with email and password (OAuth2 password grant)
   */
  static async login(credentials: LoginRequest): Promise<AuthTokens> {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    formData.append('client_id', API_CONFIG.oauth.clientId);

    try {
      const response = await httpClient.post<AuthTokens>(
        API_CONFIG.endpoints.token,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // Store tokens automatically
      if (response.success && response.data) {
        TokenManager.setTokens(response.data);
      }

      return response.data!;
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Register new user
   */
  static async register(userData: RegisterRequest): Promise<ApiResponse<UserRegistrationSuccess>> {
    try {
      const response = await httpClient.post<UserRegistrationSuccess>(
        API_CONFIG.endpoints.register,
        userData
      );
      return response;
    } catch (error) {
      throw new Error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Verify email with verification code
   */
  static async verifyEmail(data: VerifyEmailRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(
        API_CONFIG.endpoints.verifyEmail,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Email verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Resend email verification code
   */
  static async resendVerifyEmail(data: ResendVerifyEmailRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(
        API_CONFIG.endpoints.resendVerifyEmail,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Resend verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send forgot password email (generates new 8-digit password)
   */
  static async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(
        API_CONFIG.endpoints.forgotPassword,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Forgot password failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Change password for authenticated user
   */
  static async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.put<{ message: string }>(
        API_CONFIG.endpoints.changePassword,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Change password failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Start Google SSO flow
   */
  static async socialGoogleLogin(data: SocialLoginRequest): Promise<ApiResponse<HandshakeToken>> {
    try {
      const response = await httpClient.post<HandshakeToken>(
        API_CONFIG.endpoints.socialGoogle,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Google login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Complete OAuth2 authorization (used after social login)
   */
  static async authorize(params: {
    client_id: string;
    redirect_uri: string;
    response_type: string;
    handshake_token?: string;
    code_challenge?: string;
    code_challenge_method?: string;
    scope?: string;
  }): Promise<void> {
    try {
      const url = new URL(API_CONFIG.baseURL + API_CONFIG.endpoints.authorize);
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });

      // This endpoint redirects, so we need to handle it differently
      if (typeof window !== 'undefined') {
        window.location.href = url.toString();
      }
    } catch (error) {
      throw new Error(`Authorization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(): Promise<AuthTokens> {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const formData = new FormData();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refreshToken);
    formData.append('client_id', API_CONFIG.oauth.clientId);

    try {
      const response = await httpClient.post<AuthTokens>(
        API_CONFIG.endpoints.token,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // Store new tokens
      if (response.success && response.data) {
        TokenManager.setTokens(response.data);
      }

      return response.data!;
    } catch (error) {
      // If refresh fails, clear tokens and redirect to login
      TokenManager.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
      throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Revoke OAuth2 tokens (logout)
   */
  static async revokeToken(): Promise<ApiResponse<{ message: string }>> {
    const accessToken = TokenManager.getAccessToken();
    if (!accessToken) {
      // If no token, just clear local storage
      TokenManager.clearTokens();
      return {
        success: true,
        data: { message: 'Logged out successfully' },
        message: 'Logged out successfully',
        statusCode: 200
      };
    }

    const formData = new FormData();
    formData.append('token', accessToken);
    formData.append('client_id', API_CONFIG.oauth.clientId);

    try {
      const response = await httpClient.post<{ message: string }>(
        API_CONFIG.endpoints.revokeToken,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // Clear tokens regardless of response
      TokenManager.clearTokens();
      
      return response;
    } catch (error) {
      // Even if revoke fails, clear local tokens
      TokenManager.clearTokens();
      throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Logout user (revoke tokens and redirect)
   */
  static async logout(): Promise<void> {
    try {
      await this.revokeToken();
    } catch (error) {
      // Continue with logout even if revoke fails
      console.warn('Token revocation failed, but continuing with logout:', error);
    }
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await httpClient.get<User>(API_CONFIG.endpoints.profile);
      return response;
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(data: UserProfileUpdateRequest): Promise<ApiResponse<User>> {
    try {
      const response = await httpClient.put<User>(API_CONFIG.endpoints.profile, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to update profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return TokenManager.isAuthenticated();
  }

  /**
   * Get current access token
   */
  static getAccessToken(): string | null {
    return TokenManager.getAccessToken();
  }

  /**
   * Get current refresh token
   */
  static getRefreshToken(): string | null {
    return TokenManager.getRefreshToken();
  }

  /**
   * Clear all tokens
   */
  static clearTokens(): void {
    TokenManager.clearTokens();
  }
}
