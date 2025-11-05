import { apiClient } from '../../../lib/api'

export interface DashboardData {
  totalAmount: number
  count: number
  campaigns?: any[]
  donations?: any[]
}

export const dashboardApi = {
  getDashboardData: async (type: 'donor' | 'creator'): Promise<DashboardData> => {
    const response = await apiClient.get(`/dashboard/${type}`)
    return response.data
  },

  getDonorStats: async (): Promise<DashboardData> => {
    const response = await apiClient.get('/dashboard/donor/stats')
    return response.data
  },

  getCreatorStats: async (): Promise<DashboardData> => {
    const response = await apiClient.get('/dashboard/creator/stats')
    return response.data
  },
}
