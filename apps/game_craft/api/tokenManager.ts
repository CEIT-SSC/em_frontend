import { API_CONFIG } from './config';

/**
 * Token management utilities
 */
export class TokenManager {
  /**
   * Check if we're in browser environment
   */
  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /**
   * Get access token from localStorage
   */
  static getAccessToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(API_CONFIG.storage.accessToken);
  }

  /**
   * Get refresh token from localStorage
   */
  static getRefreshToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(API_CONFIG.storage.refreshToken);
  }

  /**
   * Get token type from localStorage
   */
  static getTokenType(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(API_CONFIG.storage.tokenType) || 'Bearer';
  }

  /**
   * Get token expiration timestamp
   */
  static getTokenExpiration(): number | null {
    if (!this.isBrowser()) return null;
    const expiresIn = localStorage.getItem(API_CONFIG.storage.expiresIn);
    return expiresIn ? parseInt(expiresIn, 10) : null;
  }

  /**
   * Store tokens in localStorage
   */
  static setTokens(tokens: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }): void {
    if (!this.isBrowser()) return;

    localStorage.setItem(API_CONFIG.storage.accessToken, tokens.access_token);
    localStorage.setItem(API_CONFIG.storage.refreshToken, tokens.refresh_token);
    localStorage.setItem(API_CONFIG.storage.tokenType, tokens.token_type);
    
    // Calculate expiration timestamp
    const expirationTime = Date.now() + (tokens.expires_in * 1000);
    localStorage.setItem(API_CONFIG.storage.expiresIn, expirationTime.toString());
  }

  /**
   * Clear all tokens from localStorage
   */
  static clearTokens(): void {
    if (!this.isBrowser()) return;

    localStorage.removeItem(API_CONFIG.storage.accessToken);
    localStorage.removeItem(API_CONFIG.storage.refreshToken);
    localStorage.removeItem(API_CONFIG.storage.tokenType);
    localStorage.removeItem(API_CONFIG.storage.expiresIn);
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
    if (!expiration) return true;
    
    // Add 5 minute buffer before expiration
    const buffer = 5 * 60 * 1000; // 5 minutes in milliseconds
    return Date.now() >= (expiration - buffer);
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired();
  }

  /**
   * Get authorization header value
   */
  static getAuthorizationHeader(): string | null {
    const token = this.getAccessToken();
    const tokenType = this.getTokenType();
    
    if (!token) return null;
    return `${tokenType} ${token}`;
  }
}
