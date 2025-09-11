// Export all API services and utilities
export { default as API } from '../index'
export * from '../config'

// Auth services
export * from './auth'
export * from './user'
export * from './workshops'

// Re-export for convenience
export { login, register, logout, refreshToken } from './auth'
export { getCurrentUser, updateProfile, getUserTeam, createTeam, joinTeam, leaveTeam } from './user'
export { getWorkshops, getWorkshopById, enrollInWorkshop, unenrollFromWorkshop, getUserWorkshops } from './workshops'
