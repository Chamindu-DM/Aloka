import { apiClient } from '../../../lib/api'
import type { Campaign } from '../../../types/campaign'

export const campaignsApi = {
  getCampaigns: async (filters?: { category?: string; search?: string }): Promise<Campaign[]> => {
    const response = await apiClient.get('/campaigns', { params: filters })
    return response.data
  },

  getCampaignById: async (id: string): Promise<Campaign> => {
    const response = await apiClient.get(`/campaigns/${id}`)
    return response.data
  },

  createCampaign: async (data: Partial<Campaign>): Promise<Campaign> => {
    const response = await apiClient.post('/campaigns', data)
    return response.data
  },

  updateCampaign: async (id: string, data: Partial<Campaign>): Promise<Campaign> => {
    const response = await apiClient.put(`/campaigns/${id}`, data)
    return response.data
  },

  deleteCampaign: async (id: string): Promise<void> => {
    await apiClient.delete(`/campaigns/${id}`)
  },
}
