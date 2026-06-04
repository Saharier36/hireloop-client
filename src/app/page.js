import Hero from "@/components/Hero";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a10]">
      <Hero />
      <Stats />
    </div>
  );
}
