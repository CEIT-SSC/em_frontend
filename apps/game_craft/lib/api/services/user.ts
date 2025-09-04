import API from '../index'

export interface User {
  id: number
  username: string
  email: string
  phoneNumber: string
  firstName?: string
  lastName?: string
  avatar?: string
  isActive: boolean
  dateJoined: string
}

export interface Team {
  id: number
  name: string
  members: User[]
  captain: User
  isComplete: boolean
  createdAt: string
}

export interface UserProfile extends User {
  team?: Team
  enrolledWorkshops: number[]
  achievements: string[]
}

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await API.get('/v2/users/me/', { requiresAuth: true })
  return response.data
}

export const updateProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await API.patch('/v2/users/me/', profileData, { requiresAuth: true })
  return response.data
}

export const getUserTeam = async (): Promise<Team | null> => {
  try {
    const response = await API.get('/v2/teams/my-team/', { requiresAuth: true })
    return response.data
  } catch {
    // Return null if user has no team
    return null
  }
}

export const createTeam = async (teamName: string): Promise<Team> => {
  const response = await API.post('/v2/teams/', { name: teamName }, { requiresAuth: true })
  return response.data
}

export const joinTeam = async (teamCode: string): Promise<Team> => {
  const response = await API.post('/v2/teams/join/', { code: teamCode }, { requiresAuth: true })
  return response.data
}

export const leaveTeam = async (): Promise<{ success: boolean; message: string }> => {
  const response = await API.delete('/v2/teams/leave/', { requiresAuth: true })
  return response.data
}
