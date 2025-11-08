import { useState } from "react";
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

type Page = "home" | "signin" | "signup";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  if (currentPage === "signin") {
    return (
      <SignIn
        onSignUpClick={() => setCurrentPage("signup")}
        onBackToHome={() => setCurrentPage("home")}
      />
    );
  }

  if (currentPage === "signup") {
    return (
      <SignUp
        onSignInClick={() => setCurrentPage("signin")}
        onBackToHome={() => setCurrentPage("home")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSignInClick={() => setCurrentPage("signin")} />
      <main>
        <Hero onStartCampaignClick={() => setCurrentPage("signup")} />
        <HowItWorks />
        <FeaturedCauses />
        <TransparencyDashboard />
        <Testimonials />
        <CTASection onGetStartedClick={() => setCurrentPage("signup")} />
      </main>
      <Footer />
    </div>
  );
}
