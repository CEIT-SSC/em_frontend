import axios from 'axios'
import { message } from 'antd'

// Create axios instance with base configuration
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor to add JWT token conditionally
API.interceptors.request.use(
  (config) => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token && config.requiresAuth) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for global error handling
API.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response
  },
  (error) => {
    // Only show messages on client side
    if (typeof window !== 'undefined') {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        message.error(error.response.data.message || 'An error occurred. Please try again.')
      } else {
        message.error('An unexpected error occurred. Please try again later.')
      }
    }
    return Promise.reject(error)
  }
)

export default API
