"use client";

import Image from "next/image";
import { Magnifier, MapPin, StarFill } from "@gravity-ui/icons";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ── Background: globe image spanning hero + stats ── */}
      <div className="absolute inset-0 z-0 flex justify-center">
        <Image
          src="/images/globe.png"
          alt=""
          width={1200}
          height={1200}
          className="pointer-events-none select-none object-cover opacity-30"
          style={{
            position: "absolute",
            bottom: "-150px",
            width: "100%",
            maxWidth: "900px",
            height: "auto",
          }}
          priority
        />
      </div>

      {/* Dark overlay gradient for readability */}
     

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 pb-8 text-center sm:pt-20">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f97316]">
           <StarFill/>
          </span>
          <span className="text-xs font-semibold tracking-wide text-white/90 sm:text-sm">
            <span className="font-bold text-[#f97316]">50,000+</span>{" "}
            <span className="uppercase tracking-widest text-white/60">
              New Jobs This Month
            </span>
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-[3.25rem]">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <div className="mb-6 flex w-full max-w-xl items-center gap-2 rounded-xl border border-white/10 bg-[#16161d]/80 p-1.5 backdrop-blur-md sm:gap-3 sm:p-2">
          {/* Job title input */}
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-[#1c1c27] px-3 py-2.5 sm:px-4">
            <Magnifier className="size-4 shrink-0 text-white/40" />
            <span className="text-sm text-white/35">
              Job title, skill or company
            </span>
          </div>

          {/* Location input */}
          <div className="hidden flex-1 items-center gap-2 rounded-lg bg-[#1c1c27] px-3 py-2.5 sm:flex sm:px-4">
            <MapPin className="size-4 shrink-0 text-white/40" />
            <span className="text-sm text-white/35">Location or Remote</span>
          </div>

          {/* Search button */}
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#5b42f3] text-white shadow-[0_2px_16px_rgba(91,66,243,0.45)] transition-all hover:bg-[#6b52ff] hover:shadow-[0_4px_24px_rgba(91,66,243,0.55)]">
            <Magnifier className="size-4" />
          </button>
        </div>

        {/* Trending tags */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/40">Trending Positions</span>
          {["Product Designer", "AI Engineering", "DevOps Engineer"].map(
            (tag) => (
              <span
                key={tag}
                className="cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white/80"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Globe overlay text */}
        <div className="mt-8 mb-4 flex flex-col items-center gap-1 sm:mt-10">
          <p className="text-base font-light text-white/50 sm:text-2xl">
            Assisting over{" "}
            <span className="font-semibold tracking-wider text-white">15,000</span> job seekers
          </p>
          <p className="text-base font-light tracking-wider text-white/50 sm:text-2xl">
            find their dream positions.
          </p>
        </div>
      </div>
    </section>
  );
}
