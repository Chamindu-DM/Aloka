import { apiClient } from '../../../lib/api'
import type { Donation } from '../../../types/donation'

export interface CreateDonationRequest {
  campaignId: string
  amount: number
  message?: string
  anonymous?: boolean
  paymentMethod: string
}

export const donationsApi = {
  getDonations: async (): Promise<Donation[]> => {
    const response = await apiClient.get('/donations')
    return response.data
  },

  getDonationById: async (id: string): Promise<Donation> => {
    const response = await apiClient.get(`/donations/${id}`)
    return response.data
  },

  createDonation: async (data: CreateDonationRequest): Promise<Donation> => {
    const response = await apiClient.post('/donations', data)
    return response.data
  },

  getCampaignDonations: async (campaignId: string): Promise<Donation[]> => {
    const response = await apiClient.get(`/campaigns/${campaignId}/donations`)
    return response.data
  },
}
