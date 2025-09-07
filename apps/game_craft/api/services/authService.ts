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
  ChangePasswordRequest 
} from '../types';

/**
 * Authentication API service
 */
export class AuthService {
  /**
   * Login user with email and password
   */
  static async login(credentials: LoginRequest): Promise<AuthTokens> {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    formData.append('client_id', API_CONFIG.oauth.clientId);
    formData.append('client_secret', API_CONFIG.oauth.clientSecret);

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
  static async register(userData: RegisterRequest): Promise<ApiResponse<User>> {
    try {
      const response = await httpClient.post<User>(
        API_CONFIG.endpoints.register,
        userData
      );
      return response;
    } catch (error) {
      throw new Error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Logout user (clear tokens)
   */
  static async logout(): Promise<void> {
    try {
      // If we have a logout endpoint, call it
      // await httpClient.post(API_CONFIG.endpoints.logout);
      
      // Clear tokens from local storage
      TokenManager.clearTokens();
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    } catch (error) {
      // Even if logout request fails, clear local tokens
      TokenManager.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await httpClient.get<User>(API_CONFIG.endpoints.currentUser);
      return response;
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Refresh access token
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
    formData.append('client_secret', API_CONFIG.oauth.clientSecret);

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
   * Send forgot password email
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
   * Change password
   */
  static async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(
        API_CONFIG.endpoints.changePassword,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Change password failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(
        API_CONFIG.endpoints.verifyEmail,
        { token }
      );
      return response;
    } catch (error) {
      throw new Error(`Email verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
}
