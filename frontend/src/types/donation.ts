export interface Donation {
  id: string
  campaignId: string
  campaignTitle: string
  userId: string
  amount: number
  message?: string
  anonymous: boolean
  status: 'pending' | 'completed' | 'failed'
  paymentMethod: string
  transactionId?: string
  date: string
  createdAt: string
}

export interface DonationFormData {
  campaignId: string
  amount: number
  message?: string
  anonymous: boolean
}
