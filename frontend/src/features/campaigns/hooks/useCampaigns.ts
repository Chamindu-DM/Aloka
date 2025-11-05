import { useQuery } from '@tanstack/react-query'
import { campaignsApi } from '../api/campaignsApi'

export function useCampaigns(filters?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: ['campaigns', filters],
    queryFn: () => campaignsApi.getCampaigns(filters),
  })
}
