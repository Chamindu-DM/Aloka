import { CampaignCard } from './CampaignCard'
import type { Campaign } from '../../../types/campaign'

interface CampaignGridProps {
  campaigns: Campaign[]
  isLoading?: boolean
}

export function CampaignGrid({ campaigns, isLoading }: CampaignGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded mb-4" />
            <div className="h-2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No campaigns found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  )
}
