# GameCraft API Service

A robust, type-safe API service for the GameCraft application with automatic token management, request/response interceptors, and error handling.

## Structure

```
api/
├── index.ts              # Main exports
├── config.ts             # API configuration and endpoints
├── types.ts              # TypeScript interfaces and types
├── tokenManager.ts       # Token storage and management
├── httpClient.ts         # HTTP client with interceptors
└── services/             # API service modules
    └── authService.ts    # Authentication service
```

## Features

- **Type Safety**: Full TypeScript support with comprehensive interfaces
- **Token Management**: Automatic token storage, refresh, and validation
- **Request Interceptors**: Automatic authorization header injection
- **Response Interceptors**: Automatic token refresh on 401 errors
- **Error Handling**: Standardized error handling and transformation
- **File Upload**: Built-in file upload with progress tracking
- **OAuth2 Support**: Full OAuth2 flow implementation

## Quick Start

```typescript
import { AuthService, httpClient } from './api';

// Login user
const tokens = await AuthService.login({
  username: 'user@example.com',
  password: 'password',
  grant_type: 'password',
  client_id: 'your-client-id',
  client_secret: 'your-client-secret'
});

// Make authenticated requests
const userData = await httpClient.get('/api/user/profile');

// Check authentication status
if (AuthService.isAuthenticated()) {
  // User is logged in
}
```

## Configuration

Update `config.ts` with your API settings:

```typescript
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  timeout: 30000,
  oauth: {
    clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || '',
    clientSecret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET || '',
  },
  // ... more config
};
```

## Services

### AuthService

```typescript
// Login
await AuthService.login({ username, password, grant_type, client_id, client_secret });

// Register
await AuthService.register({ email, password, first_name, last_name, phone_number });

// Get current user
const user = await AuthService.getCurrentUser();

// Logout
await AuthService.logout();

// Check auth status
AuthService.isAuthenticated();
```

### HttpClient

```typescript
// GET request
const response = await httpClient.get<UserData>('/api/users');

// POST request
const result = await httpClient.post('/api/users', userData);

// File upload with progress
await httpClient.upload('/api/upload', file, (progress) => {
  console.log(`Upload progress: ${progress.loaded}/${progress.total}`);
});
```

## Token Management

The `TokenManager` handles all token operations:

- Automatic token storage in localStorage
- Token expiration checking
- Authorization header generation
- Token cleanup on logout

## Error Handling

All API calls return standardized error messages:

- Network errors: "Network Error: No response received"
- HTTP errors: "HTTP 404: Not Found"
- Server errors: Parsed from response or generic message

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_OAUTH_CLIENT_ID=your-oauth-client-id
NEXT_PUBLIC_OAUTH_CLIENT_SECRET=your-oauth-client-secret
```

## Next Steps

1. Add more service modules in `services/` directory
2. Implement specific API endpoints based on your needs
3. Add custom error handling for specific use cases
4. Extend types for additional API responses
