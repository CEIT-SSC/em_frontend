import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosProgressEvent } from 'axios';
import { API_CONFIG } from './config';
import { TokenManager } from './tokenManager';
import type { ApiResponse, AuthTokens } from './types';

/**
 * HTTP Client with automatic token management and request/response interceptors
 */
export class HttpClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
  }> = [];

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - Add authorization header
    this.instance.interceptors.request.use(
      (config) => {
        const authHeader = TokenManager.getAuthorizationHeader();
        if (authHeader) {
          config.headers.Authorization = authHeader;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle token refresh
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // If error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If we're already refreshing, queue this request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              return this.instance(originalRequest);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = TokenManager.getRefreshToken();
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            // Attempt to refresh token
            const response = await this.refreshToken(refreshToken);
            const tokens = response.data;

            // Store new tokens
            TokenManager.setTokens(tokens);

            // Retry all queued requests
            this.processQueue(null);

            // Retry original request
            return this.instance(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            this.processQueue(refreshError);
            TokenManager.clearTokens();
            
            // You might want to emit an event or call a callback here
            // to handle logout at the application level
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
            
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Process queued requests after token refresh
   */
  private processQueue(error: any): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(null);
      }
    });

    this.failedQueue = [];
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshToken(refreshToken: string): Promise<AxiosResponse<AuthTokens>> {
    const formData = new FormData();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refreshToken);
    formData.append('client_id', API_CONFIG.oauth.clientId);
    formData.append('client_secret', API_CONFIG.oauth.clientSecret);

    return axios.post(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.token}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  /**
   * Handle and transform axios errors
   */
  private handleError(error: AxiosError): Error {
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data as { message?: string };
      const message = errorData?.message || error.response.statusText || 'Server Error';
      return new Error(`HTTP ${error.response.status}: ${message}`);
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Network Error: No response received');
    } else {
      // Something else happened
      return new Error(`Request Error: ${error.message}`);
    }
  }

  /**
   * Generic GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generic POST request
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generic PUT request
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generic PATCH request
   */
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload file with progress tracking
   */
  async upload<T>(
    url: string,
    file: File,
    onProgress?: (progressEvent: AxiosProgressEvent) => void,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await this.instance.post<ApiResponse<T>>(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...config?.headers,
        },
        onUploadProgress: onProgress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get the raw axios instance for advanced usage
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const httpClient = new HttpClient();
