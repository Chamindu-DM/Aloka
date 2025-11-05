import type { Campaign } from '../../../types/campaign'

interface CampaignDetailProps {
  campaign: Campaign
}

export function CampaignDetail({ campaign }: CampaignDetailProps) {
  const progress = (campaign.raised / campaign.goal) * 100

  return (
    <div className="max-w-4xl mx-auto">
      <img
        src={campaign.imageUrl}
        alt={campaign.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      
      <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-3xl font-bold text-blue-600">
            ${campaign.raised.toLocaleString()}
          </p>
          <p className="text-gray-600">raised of ${campaign.goal.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{campaign.donors}</p>
          <p className="text-gray-600">donors</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{campaign.daysLeft}</p>
          <p className="text-gray-600">days left</p>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-2xl font-semibold mb-4">About this campaign</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{campaign.description}</p>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Campaign organizer</h3>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
          <div>
            <p className="font-medium">{campaign.organizer}</p>
            <p className="text-sm text-gray-500">Organizer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
