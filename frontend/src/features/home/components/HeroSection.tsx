import { Button } from '../../../components/ui/button'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Make a Difference Today
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Support meaningful causes and help create positive change in communities around the world.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="default" className="bg-white text-blue-600 hover:bg-gray-100">
            Start a Campaign
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Browse Campaigns
          </Button>
        </div>
      </div>
    </section>
  )
}
