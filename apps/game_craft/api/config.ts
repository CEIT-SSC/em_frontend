// API configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 30000,
  
  // OAuth2 credentials
  oauth: {
    clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || 'your-client-id',
    clientSecret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET || 'your-client-secret',
  },
  
  // Token storage keys
  storage: {
    accessToken: 'gamecraft_access_token',
    refreshToken: 'gamecraft_refresh_token',
    tokenType: 'gamecraft_token_type',
    expiresIn: 'gamecraft_expires_in',
  },
  
  // API endpoints
  endpoints: {
    // Auth
    token: '/o/token/',
    register: '/register/',
    forgotPassword: '/forgot-password/',
    changePassword: '/change-password/',
    verifyEmail: '/verify-email/',
    resendVerifyEmail: '/resend-verify-email/',
    revokeToken: '/o/revoke-token/',
    currentUser: '/me/',
    
    // Profile
    profile: '/profile/',
    
    // Events
    events: '/events/',
    
    // Presentations
    presentations: '/presentations/',
    
    // Competitions
    soloCompetitions: '/solo-competitions/',
    groupCompetitions: '/group-competitions/',
    
    // Teams
    myTeams: '/my-teams/',
    
    // Content
    teamContent: '/team-content/',
    
    // Shopping
    cart: '/cart/',
    orders: '/orders/',
    
    // Staff
    staff: '/staff/',
    
    // Posts/News
    posts: '/posts/',
    
    // Jobs
    jobs: '/jobs/',
  }
} as const;
