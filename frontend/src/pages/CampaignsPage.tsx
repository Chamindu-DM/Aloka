import { useState } from 'react'
import { CampaignGrid } from '../features/campaigns/components/CampaignGrid'
import { CampaignFilters, FilterState } from '../features/campaigns/components/CampaignFilters'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export function CampaignsPage() {
  const [filters, setFilters] = useState<FilterState>({})
  // TODO: Use useCampaigns hook with filters
  const campaigns: any[] = []
  const isLoading = false

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Browse Campaigns</h1>
        <CampaignFilters onFilterChange={setFilters} />
        <CampaignGrid campaigns={campaigns} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  )
}
