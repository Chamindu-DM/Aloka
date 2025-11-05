import { CampaignCard } from '../../campaigns/components/CampaignCard'
import type { Campaign } from '../../../types/campaign'

interface FeaturedCampaignsProps {
  campaigns: Campaign[]
}

export function FeaturedCampaigns({ campaigns }: FeaturedCampaignsProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.slice(0, 6).map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  )
}
