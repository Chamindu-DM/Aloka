import { useQuery } from '@tanstack/react-query'
import { campaignsApi } from '../../campaigns/api/campaignsApi'

export function useHomePage() {
  const featuredCampaigns = useQuery({
    queryKey: ['campaigns', 'featured'],
    queryFn: () => campaignsApi.getCampaigns({ featured: true }),
  })

  return {
    featuredCampaigns,
  }
}
