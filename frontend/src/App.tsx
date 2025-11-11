import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/landing-page/Header";
import { Hero } from "./components/landing-page/Hero";
import { HowItWorks } from "./components/landing-page/HowItWorks";
import { FeaturedCauses } from "./components/landing-page/FeaturedCauses";
import { TransparencyDashboard } from "./components/landing-page/TransparencyDashboard";
import { Testimonials } from "./components/landing-page/Testimonials";
import { CTASection } from "./components/landing-page/CTASection";
import { Footer } from "./components/landing-page/Footer";
import { SignIn } from "./components/pages/SignIn";
import { SignUp } from "./components/pages/SignUp";
import { Dashboard } from "./components/pages/Dashboard";

function HomePage() {
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
