import API from '../index'

export interface Workshop {
  id: number
  title: string
  description: string
  instructor: string
  date: string
  duration: number
  capacity: number
  enrolled: number
  isOnline: boolean
  meetingLink?: string
  location?: string
  prerequisites?: string[]
  tags?: string[]
}

export interface WorkshopResponse {
  results: Workshop[]
  count: number
  next?: string
  previous?: string
}

export const getWorkshops = async (): Promise<WorkshopResponse> => {
  const response = await API.get('/v2/workshop/', { requiresAuth: false })
  return response.data
}

export const getWorkshopById = async (id: number): Promise<Workshop> => {
  const response = await API.get(`/v2/workshop/${id}/`, { requiresAuth: false })
  return response.data
}

export const enrollInWorkshop = async (workshopId: number): Promise<{ success: boolean; message: string }> => {
  const response = await API.post(`/v2/workshop/${workshopId}/enroll/`, {}, { requiresAuth: true })
  return response.data
}

export const unenrollFromWorkshop = async (workshopId: number): Promise<{ success: boolean; message: string }> => {
  const response = await API.delete(`/v2/workshop/${workshopId}/enroll/`, { requiresAuth: true })
  return response.data
}

export const getUserWorkshops = async (): Promise<Workshop[]> => {
  const response = await API.get('/v2/workshop/enrolled/', { requiresAuth: true })
  return response.data
}
