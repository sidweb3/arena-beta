import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WhyUsSection />
      <CTASection />
      <Footer />
    </div>
  );
}