// Export all API services and utilities
export { default as API } from './index'
export * from './config'

// Auth services
export * from './services/auth'
export * from './services/user'
export * from './services/workshops'

// Re-export for convenience
export { login, register, logout, refreshToken } from './services/auth'
export { getCurrentUser, updateProfile, getUserTeam, createTeam, joinTeam, leaveTeam } from './services/user'
export { getWorkshops, getWorkshopById, enrollInWorkshop, unenrollFromWorkshop, getUserWorkshops } from './services/workshops'
