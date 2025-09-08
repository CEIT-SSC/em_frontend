import { useState, useCallback } from 'react';
import { AuthService } from '../services/authService';
import type { 
  LoginRequest, 
  RegisterRequest, 
  ForgotPasswordRequest, 
  ChangePasswordRequest,
  VerifyEmailRequest,
  ResendVerifyEmailRequest,
  SocialLoginRequest,
  UserProfileUpdateRequest,
  User,
  AuthTokens,
  UserRegistrationSuccess,
  HandshakeToken
} from '../types';

interface UseAuthReturn {
  // State
  loading: boolean;
  error: string | null;
  
  // Auth methods
  login: (credentials: LoginRequest) => Promise<AuthTokens>;
  register: (userData: RegisterRequest) => Promise<UserRegistrationSuccess>;
  logout: () => Promise<void>;
  verifyEmail: (data: VerifyEmailRequest) => Promise<{ message: string }>;
  resendVerifyEmail: (data: ResendVerifyEmailRequest) => Promise<{ message: string }>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<{ message: string }>;
  changePassword: (data: ChangePasswordRequest) => Promise<{ message: string }>;
  socialGoogleLogin: (data: SocialLoginRequest) => Promise<HandshakeToken>;
  refreshToken: () => Promise<AuthTokens>;
  revokeToken: () => Promise<{ message: string }>;
  
  // Profile methods
  getCurrentUser: () => Promise<User>;
  updateProfile: (data: UserProfileUpdateRequest) => Promise<User>;
  
  // Utility methods
  isAuthenticated: () => boolean;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  clearTokens: () => void;
}

/**
 * React hook for authentication operations
 */
export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsyncOperation = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await operation();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginRequest): Promise<AuthTokens> => {
    return handleAsyncOperation(async () => {
      const tokens = await AuthService.login(credentials);
      return tokens;
    });
  }, [handleAsyncOperation]);

  const register = useCallback(async (userData: RegisterRequest): Promise<UserRegistrationSuccess> => {
    return handleAsyncOperation(async () => {
      const response = await AuthService.register(userData);
      return response.data;
    });
  }, [handleAsyncOperation]);

  const logout = useCallback(async (): Promise<void> => {
    return handleAsyncOperation(async () => {
      await AuthService.logout();
    });
  }, [handleAsyncOperation]);

  const verifyEmail = useCallback(async (data: VerifyEmailRequest): Promise<{ message: string }> => {
    return handleAsyncOperation(async () => {
      const response = await AuthService.verifyEmail(data);
      return response.data;
    });
  }, [handleAsyncOperation]);

  const resendVerifyEmail = useCallback(async (data: ResendVerifyEmailRequest): Promise<{ message: string }> => {
    return handleAsyncOperation(async () => {
      const response = await AuthService.resendVerifyEmail(data);
      return response.data;
    });
  }, [handleAsyncOperation]);

  const forgotPassword = useCallback(async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    return handleAsyncOperation(async () => {
      const response = await AuthService.forgotPassword(data);
      return response.data;
    });
  }, [handleAsyncOperation]);

  const changePassword = useCallback(async (data: ChangePasswordRequest): Promise<{ message: string }> => {
    return handleAsyncOperation(async () => {
      const response = await AuthService.changePassword(data);
      return response.data;
    });
  }, [handleAsyncOperation]);

  const socialGoogleLogin = useCallback(async (data: SocialLoginRequest): Promise<HandshakeToken> => {
    return handleAsyncOperation(async () => {
      const response = await AuthService.socialGoogleLogin(data);
      return response.data;
    });
  }, [handleAsyncOperation]);

  const refreshToken = useCallback(async (): Promise<AuthTokens> => {
    return handleAsyncOperation(async () => {
      const tokens = await AuthService.refreshToken();
      return tokens;
    });
  }, [handleAsyncOperation]);

  const revokeToken = useCallback(async (): Promise<{ message: string }> => {
    return handleAsyncOperation(async () => {
      const response = await AuthService.revokeToken();
      return response.data;
    });
  }, [handleAsyncOperation]);

  const getCurrentUser = useCallback(async (): Promise<User> => {
    return handleAsyncOperation(async () => {
      const response = await AuthService.getCurrentUser();
      return response.data;
    });
  }, [handleAsyncOperation]);

  const updateProfile = useCallback(async (data: UserProfileUpdateRequest): Promise<User> => {
    return handleAsyncOperation(async () => {
      const response = await AuthService.updateProfile(data);
      return response.data;
    });
  }, [handleAsyncOperation]);

  // Utility methods that don't need async handling
  const isAuthenticated = useCallback((): boolean => {
    return AuthService.isAuthenticated();
  }, []);

  const getAccessToken = useCallback((): string | null => {
    return AuthService.getAccessToken();
  }, []);

  const getRefreshToken = useCallback((): string | null => {
    return AuthService.getRefreshToken();
  }, []);

  const clearTokens = useCallback((): void => {
    AuthService.clearTokens();
  }, []);

  return {
    // State
    loading,
    error,
    
    // Auth methods
    login,
    register,
    logout,
    verifyEmail,
    resendVerifyEmail,
    forgotPassword,
    changePassword,
    socialGoogleLogin,
    refreshToken,
    revokeToken,
    
    // Profile methods
    getCurrentUser,
    updateProfile,
    
    // Utility methods
    isAuthenticated,
    getAccessToken,
    getRefreshToken,
    clearTokens,
  };
};

/**
 * Hook for getting current user information
 */
export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!AuthService.isAuthenticated()) {
      setUser(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.getCurrentUser();
      setUser(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user';
      setError(errorMessage);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (data: UserProfileUpdateRequest): Promise<User> => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.updateProfile(data);
      setUser(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    fetchUser,
    updateUser,
    isAuthenticated: AuthService.isAuthenticated(),
  };
};
