/**
 * Storage utility for handling localStorage operations with Next.js SSR compatibility
 */

export const storage = {
  set: <T>(key: string, value: T): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    }
  },

  get: <T>(key: string): T | null => {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error(`Error getting localStorage key "${key}":`, error)
        return null
      }
    }
    return null
  },

  remove: (key: string): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error)
      }
    }
  },

  clear: (): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear()
      } catch (error) {
        console.error('Error clearing localStorage:', error)
      }
    }
  },

  // Check if a key exists
  exists: (key: string): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) !== null
    }
    return false
  }
}

export default storage
