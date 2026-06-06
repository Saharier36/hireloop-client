"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function CtaSection() {
  return (
    <section className="w-full py-24 relative overflow-hidden">
      {/* BG image */}
      <Image
        src="/images/cta-bg.png"
        alt="CTA background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a0a0f]/60" />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-[#5b42f3]/20 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Your next role is
          <br />
          already looking for you
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/50 leading-relaxed">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/signup">
            <Button className="h-11 rounded-xl bg-white text-[#0a0a0f] font-semibold text-sm px-6 hover:bg-white/90 transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
              Create a free account
            </Button>
          </Link>

          <Link href="#pricing">
            <Button
              variant="bordered"
              className="h-11 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-semibold text-sm px-6 transition-all duration-200"
            >
              View pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
