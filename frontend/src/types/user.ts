export interface User {
  id: string
  email: string
  name: string
  role: 'donor' | 'creator' | 'admin'
  avatar?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  totalDonated?: number
  totalRaised?: number
  campaignsCreated?: number
  campaignsSupported?: number
}

export interface UpdateProfileData {
  name?: string
  bio?: string
  avatar?: string
}
