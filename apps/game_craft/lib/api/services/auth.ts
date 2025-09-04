import API from '../index'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  phoneNumber: string
  password: string
}

export interface AuthResponse {
  access?: string
  refresh?: string
  user?: {
    id: number
    username: string
    email: string
    phoneNumber: string
  }
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await API.post('/v2/token/', { email, password }, { requiresAuth: false })
  return response.data
}

export const register = async (
  username: string,
  email: string,
  phoneNumber: string,
  password: string
): Promise<AuthResponse> => {
  const response = await API.post('/v2/users/sign_up/', {
    username,
    email,
    phoneNumber,
    password
  }, { requiresAuth: false })
  return response.data
}

export const logout = async (): Promise<void> => {
  // Clear local storage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }
}

export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null

  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const response = await API.post('/v2/token/refresh/', {
    refresh: refreshToken
  }, { requiresAuth: false })
  return response.data
}
