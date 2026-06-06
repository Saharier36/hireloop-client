import CtaSection from "@/components/CtaSection";
import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";

import Stats from "@/components/Stats";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a10]">
      <Hero />
      <Stats />
      <FeaturesSection/>
      <PricingSection/>
      <CtaSection/>
    </div>
  );
}
