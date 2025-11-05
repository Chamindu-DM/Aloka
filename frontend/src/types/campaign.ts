export interface Campaign {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  category: string
  imageUrl: string
  organizer: string
  organizerId: string
  donors: number
  daysLeft: number
  status: 'active' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface CampaignFormData {
  title: string
  description: string
  goal: number
  category: string
  imageUrl?: string
}

export interface CampaignUpdate {
  id: string
  campaignId: string
  title: string
  content: string
  createdAt: string
}
