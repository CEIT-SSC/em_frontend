// API configuration and constants
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  TIMEOUT: 10000,
  VERSION: 'v2',
} as const

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/v2/token/',
    REGISTER: '/v2/users/sign_up/',
    REFRESH: '/v2/token/refresh/',
    LOGOUT: '/v2/logout/',
  },
  // User endpoints
  USER: {
    PROFILE: '/v2/users/me/',
    UPDATE_PROFILE: '/v2/users/me/',
  },
  // Workshop endpoints
  WORKSHOP: {
    LIST: '/v2/workshop/',
    DETAIL: (id: number) => `/v2/workshop/${id}/`,
    ENROLL: (id: number) => `/v2/workshop/${id}/enroll/`,
    USER_WORKSHOPS: '/v2/workshop/enrolled/',
  },
  // Team endpoints
  TEAM: {
    MY_TEAM: '/v2/teams/my-team/',
    CREATE: '/v2/teams/',
    JOIN: '/v2/teams/join/',
    LEAVE: '/v2/teams/leave/',
  },
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const
