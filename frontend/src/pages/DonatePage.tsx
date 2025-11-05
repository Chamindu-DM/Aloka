import { useParams } from 'react-router-dom'
import { DonationForm } from '../features/donations/components/DonationForm'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export function DonatePage() {
  const { campaignId } = useParams<{ campaignId: string }>()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Make a Donation</h1>
          <div className="border rounded-lg p-8">
            <DonationForm campaignId={campaignId!} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
