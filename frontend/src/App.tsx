import { Header } from "./components/landing-page/Header";
import { Hero } from "./components/landing-page/Hero";
import { HowItWorks } from "./components/landing-page/HowItWorks";
import { FeaturedCauses } from "./components/landing-page/FeaturedCauses";
import { TransparencyDashboard } from "./components/landing-page/TransparencyDashboard";
import { Testimonials } from "./components/landing-page/Testimonials";
import { CTASection } from "./components/landing-page/CTASection";
import { Footer } from "./components/landing-page/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedCauses />
        <TransparencyDashboard />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
