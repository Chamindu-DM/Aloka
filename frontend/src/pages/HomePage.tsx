import { HeroSection } from '../features/home/components/HeroSection'
import { FeaturedCampaigns } from '../features/home/components/FeaturedCampaigns'
import { CategoryShowcase } from '../features/home/components/CategoryShowcase'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export function HomePage() {
  // TODO: Fetch featured campaigns
  const campaigns: any[] = []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCampaigns campaigns={campaigns} />
        <CategoryShowcase />
      </main>
      <Footer />
    </div>
  )
}
