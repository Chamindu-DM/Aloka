import type { Campaign } from '../../../types/campaign'

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.raised / campaign.goal) * 100

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <img
        src={campaign.imageUrl}
        alt={campaign.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">${campaign.raised.toLocaleString()}</span>
          <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
      <div className="text-sm text-gray-500">
        {campaign.donors} donors
      </div>
    </div>
  )
}
