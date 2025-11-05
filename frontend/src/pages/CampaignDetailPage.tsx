import { useParams } from 'react-router-dom'
import { CampaignDetail } from '../features/campaigns/components/CampaignDetail'
import { CampaignUpdates } from '../features/campaigns/components/CampaignUpdates'
import { DonationForm } from '../features/donations/components/DonationForm'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>()
  // TODO: Use useCampaignDetail hook
  const campaign: any = null
  const updates: any[] = []

  if (!campaign) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CampaignDetail campaign={campaign} />
            <div className="mt-12">
              <CampaignUpdates updates={updates} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Support this campaign</h3>
                <DonationForm campaignId={id!} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
