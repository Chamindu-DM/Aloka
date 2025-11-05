export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const APP_NAME = 'Aloka'
export const APP_DESCRIPTION = 'Making a difference, one campaign at a time'

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const

export const CAMPAIGN_CATEGORIES = [
  'medical',
  'education',
  'emergency',
  'community',
  'environment',
  'animals',
  'sports',
  'creative',
  'other',
] as const

export const DONATION_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000] as const

export const PLATFORM_FEE_PERCENTAGE = 5
export const PROCESSING_FEE_PERCENTAGE = 2.9
export const PROCESSING_FEE_FIXED = 0.3

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
