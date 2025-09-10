/**
 * Google OAuth Utility Functions
 * Helper functions for Google OAuth integration
 */

export const GoogleOAuth = {
  /**
   * Build Google OAuth URL for authentication
   */
  buildAuthURL: (redirectUri: string = '/auth/google/callback') => {
    const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      redirect_uri: `${baseURL}${redirectUri}`,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent'
    });
    
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  },

  /**
   * Validate Google OAuth configuration
   */
  validateConfig: () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId || clientId === 'your-google-client-id.apps.googleusercontent.com') {
      console.warn('Google OAuth Client ID not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.');
      return false;
    }
    return true;
  },

  /**
   * Store OAuth redirect information
   */
  storeRedirectInfo: (type: 'login' | 'signup') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('oauth_redirect_type', type);
    }
  },

  /**
   * Get OAuth redirect information
   */
  getRedirectInfo: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('oauth_redirect_type') as 'login' | 'signup' | null;
    }
    return null;
  },

  /**
   * Clear OAuth redirect information
   */
  clearRedirectInfo: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oauth_redirect_type');
      localStorage.removeItem('google_auth_in_progress');
    }
  }
};

export default GoogleOAuth;
