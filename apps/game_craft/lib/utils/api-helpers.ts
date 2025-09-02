import { AxiosError } from 'axios'

export interface ApiError {
  message: string
  status?: number
  code?: string
  details?: Record<string, unknown>
}

/**
 * Handles API errors and converts them to a consistent format
 */
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message || 'An error occurred'
    const code = error.response?.data?.code || error.code
    const details = error.response?.data?.details

    return {
      message,
      status,
      code,
      details
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message
    }
  }

  return {
    message: 'An unknown error occurred'
  }
}

/**
 * Checks if the error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.code === 'NETWORK_ERROR' || !error.response
  }
  return false
}

/**
 * Checks if the error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.response?.status === 401 || error.response?.status === 403
  }
  return false
}

/**
 * Retry wrapper for API calls
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: unknown

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      if (i === maxRetries || isAuthError(error)) {
        throw error
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }

  throw lastError
}
