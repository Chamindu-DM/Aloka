import { useQuery } from '@tanstack/react-query'
import { campaignsApi } from '../api/campaignsApi'

export function useCampaignDetail(id: string) {
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: () => campaignsApi.getCampaignById(id),
    enabled: !!id,
  })
}
