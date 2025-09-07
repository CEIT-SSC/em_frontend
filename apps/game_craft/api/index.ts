// Re-export all API modules for easy consumption
export { TokenManager } from './tokenManager';
export { HttpClient, httpClient } from './httpClient';
export { API_CONFIG } from './config';

// Services
export { AuthService } from './services/authService';
export { PresentationService } from './services/presentationService';

// Hooks
export { 
  usePresentations, 
  usePresentation, 
  usePresentationRegistrations,
  useFeaturedPresentations,
  useUpcomingPresentations 
} from './hooks/usePresentations';

// Utils
export { PresentationUtils } from './utils/presentationUtils';

// Types
export type * from './types';
