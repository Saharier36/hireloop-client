import CtaSection from "@/components/Home/CtaSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import Hero from "@/components/Home/Hero";
import PricingSection from "@/components/Home/PricingSection";

import Stats from "@/components/Home/Stats";

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
