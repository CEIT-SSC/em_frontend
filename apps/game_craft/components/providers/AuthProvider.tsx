'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/lib/api/services/user'
import { login as apiLogin, logout as apiLogout, AuthResponse } from '@/lib/api/services/auth'
import { getCurrentUser } from '@/lib/api/services/user'
import storage from '@/lib/utils/storage'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthResponse>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = storage.get<string>('token')

      if (token) {
        try {
          const userData = await getCurrentUser()
          setUser(userData)
        } catch (error) {
          // Token is invalid, clear storage
          storage.remove('token')
          storage.remove('refreshToken')
          storage.remove('user')
        }
      }

      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiLogin(email, password)

      if (response.access) {
        storage.set('token', response.access)
        if (response.refresh) {
          storage.set('refreshToken', response.refresh)
        }
        if (response.user) {
          setUser(response.user as User)
          storage.set('user', response.user)
        }
      }

      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await apiLogout()
      setUser(null)
      storage.remove('token')
      storage.remove('refreshToken')
      storage.remove('user')
    } catch (error) {
      // Even if API call fails, clear local state
      setUser(null)
      storage.remove('token')
      storage.remove('refreshToken')
      storage.remove('user')
    }
  }

  const refreshUser = async (): Promise<void> => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
      storage.set('user', userData)
    } catch (error) {
      console.error('Failed to refresh user data:', error)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
