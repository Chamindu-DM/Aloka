export const ROUTES = {
  HOME: '/',
  CAMPAIGNS: '/campaigns',
  CAMPAIGN_DETAIL: '/campaigns/:id',
  DONATE: '/donate/:campaignId',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  DONOR_DASHBOARD: '/dashboard/donor',
  CREATOR_DASHBOARD: '/dashboard/creator',
  CREATE_CAMPAIGN: '/dashboard/create-campaign',
  MY_CAMPAIGNS: '/dashboard/my-campaigns',
  MY_DONATIONS: '/dashboard/my-donations',
  SETTINGS: '/dashboard/settings',
  NOT_FOUND: '*',
} as const

export const getCampaignDetailPath = (id: string) => `/campaigns/${id}`
export const getDonatePath = (campaignId: string) => `/donate/${campaignId}`
