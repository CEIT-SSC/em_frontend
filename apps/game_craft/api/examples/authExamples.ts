/**
 * Authentication API Integration Examples
 * This file demonstrates how to use the new authentication API
 */

import { AuthService } from '../index';
import type { 
  LoginRequest, 
  RegisterRequest, 
  VerifyEmailRequest,
  ForgotPasswordRequest,
  ChangePasswordRequest 
} from '../types';

// Example usage of AuthService
class AuthExample {
  /**
   * Example: User Registration Flow
   */
  static async registerUser() {
    try {
      const registerData: RegisterRequest = {
        email: 'user@example.com',
        password: 'securePassword123',
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '+989123456789'
      };

      const response = await AuthService.register(registerData);
      console.log('Registration successful:', response.data);

      // After registration, user needs to verify email
      const verifyData: VerifyEmailRequest = {
        email: 'user@example.com',
        code: '123456' // Code received via email
      };

      const verifyResponse = await AuthService.verifyEmail(verifyData);
      console.log('Email verified:', verifyResponse.data);

      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  /**
   * Example: User Login Flow
   */
  static async loginUser() {
    try {
      const loginData: LoginRequest = {
        username: 'user@example.com', // Email
        password: 'securePassword123'
      };

      const tokens = await AuthService.login(loginData);
      console.log('Login successful:', tokens);

      // Get user profile after login
      const userProfile = await AuthService.getCurrentUser();
      console.log('User profile:', userProfile.data);

      return tokens;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * Example: Forgot Password Flow
   */
  static async forgotPassword() {
    try {
      const forgotData: ForgotPasswordRequest = {
        email: 'user@example.com'
      };

      const response = await AuthService.forgotPassword(forgotData);
      console.log('Password reset email sent:', response.data);

      return response.data;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  }

  /**
   * Example: Change Password Flow
   */
  static async changePassword() {
    try {
      const changeData: ChangePasswordRequest = {
        old_password: 'oldPassword123',
        new_password: 'newSecurePassword123'
      };

      const response = await AuthService.changePassword(changeData);
      console.log('Password changed:', response.data);

      return response.data;
    } catch (error) {
      console.error('Change password failed:', error);
      throw error;
    }
  }

  /**
   * Example: Google Social Login Flow
   */
  static async googleLogin(authCode: string) {
    try {
      // Step 1: Get handshake token from Google auth code
      const handshakeResponse = await AuthService.socialGoogleLogin({
        code: authCode
      });

      console.log('Handshake token received:', handshakeResponse.data);

      // Step 2: Complete authorization (this will redirect)
      await AuthService.authorize({
        client_id: 'your-client-id',
        redirect_uri: 'https://yourapp.com/auth/callback',
        response_type: 'code',
        handshake_token: handshakeResponse.data.handshake_token
      });

      // Note: After redirect, you'll need to handle the authorization code
      // and exchange it for tokens using the /o/token/ endpoint

    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  }

  /**
   * Example: Logout Flow
   */
  static async logoutUser() {
    try {
      await AuthService.logout();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  /**
   * Example: Token Management
   */
  static async handleTokenRefresh() {
    try {
      // Check if user is authenticated
      if (!AuthService.isAuthenticated()) {
        console.log('User not authenticated');
        return;
      }

      // Get current tokens
      const accessToken = AuthService.getAccessToken();
      const refreshToken = AuthService.getRefreshToken();
      console.log('Current tokens:', { accessToken, refreshToken });

      // Refresh tokens if needed
      const newTokens = await AuthService.refreshToken();
      console.log('Tokens refreshed:', newTokens);

      return newTokens;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  /**
   * Example: Complete Authentication Flow
   */
  static async completeAuthFlow() {
    try {
      // 1. Register user
      console.log('Step 1: Registering user...');
      await this.registerUser();

      // 2. Login user
      console.log('Step 2: Logging in user...');
      const tokens = await this.loginUser();

      // 3. Get user profile
      console.log('Step 3: Getting user profile...');
      const userProfile = await AuthService.getCurrentUser();
      console.log('User profile:', userProfile.data);

      // 4. Update user profile
      console.log('Step 4: Updating user profile...');
      const updatedProfile = await AuthService.updateProfile({
        first_name: 'Updated John',
        phone_number: '+989123456780'
      });
      console.log('Updated profile:', updatedProfile.data);

      // 5. Change password
      console.log('Step 5: Changing password...');
      await this.changePassword();

      // 6. Refresh tokens
      console.log('Step 6: Refreshing tokens...');
      await this.handleTokenRefresh();

      // 7. Logout
      console.log('Step 7: Logging out...');
      await this.logoutUser();

      console.log('Complete authentication flow finished successfully');
    } catch (error) {
      console.error('Authentication flow failed:', error);
      throw error;
    }
  }
}

/**
 * Usage instructions and examples
 */
export const AuthAPIUsageGuide = {
  /**
   * Basic usage examples
   */
  basicUsage: {
    // Login
    login: `
      import { AuthService } from './api';
      
      const tokens = await AuthService.login({
        username: 'user@example.com',
        password: 'password123'
      });
      console.log('Access token:', tokens.access_token);
    `,

    // Register
    register: `
      import { AuthService } from './api';
      
      const result = await AuthService.register({
        email: 'user@example.com',
        password: 'password123',
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '+989123456789'
      });
      console.log('Registration:', result.data);
    `,

    // Get current user
    getCurrentUser: `
      import { AuthService } from './api';
      
      const userProfile = await AuthService.getCurrentUser();
      console.log('User:', userProfile.data);
    `,
  },

  /**
   * React hook usage examples
   */
  reactHookUsage: {
    useAuth: `
      import { useAuth } from './api';
      
      const { login, logout, loading, error, isAuthenticated } = useAuth();
      
      const handleLogin = async () => {
        try {
          await login({ username: 'user@example.com', password: 'password123' });
        } catch (err) {
          console.error('Login failed:', err);
        }
      };
    `,

    useCurrentUser: `
      import { useCurrentUser } from './api';
      
      const { user, loading, error, fetchUser } = useCurrentUser();
      
      useEffect(() => {
        fetchUser();
      }, []);
    `,
  },

  /**
   * Error handling examples
   */
  errorHandling: {
    withTryCatch: `
      try {
        const tokens = await AuthService.login(credentials);
        // Handle success
      } catch (error) {
        if (error.message.includes('401')) {
          // Invalid credentials
        } else if (error.message.includes('422')) {
          // Validation error
        } else {
          // Other error
        }
      }
    `,

    withHooks: `
      const { login, error } = useAuth();
      
      const handleLogin = async () => {
        await login(credentials);
        // Error is automatically handled by the hook
      };
      
      // Display error in UI
      {error && <div>{error}</div>}
    `,
  },
};

// Export the main example class
export { AuthExample };
