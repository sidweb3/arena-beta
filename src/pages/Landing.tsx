import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <Navbar />
      <HeroSection />
      <div id="stats">
        <StatsSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <WhyUsSection />
      <CTASection />
      <Footer />
    </div>
  );
}