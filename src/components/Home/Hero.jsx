"use client";

import Image from "next/image";
import { Magnifier, MapPin, StarFill } from "@gravity-ui/icons";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Globe */}
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

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 pb-8 text-center sm:pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f97316]">
            <StarFill />
          </span>
          <span className="text-xs font-semibold tracking-wide text-white/90 sm:text-sm">
            <span className="font-bold text-[#f97316]">50,000+</span>{" "}
            <span className="uppercase tracking-widest text-white/60">
              New Jobs This Month
            </span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-[3.25rem]"
        >
          Find Your Dream Job Today
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-8 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base"
        >
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mb-6 flex w-full max-w-xl items-center gap-2 rounded-xl border border-white/10 bg-[#16161d]/80 p-1.5 backdrop-blur-md sm:gap-3 sm:p-2"
        >
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-[#1c1c27] px-3 py-2.5 sm:px-4">
            <Magnifier className="size-4 shrink-0 text-white/40" />
            <span className="text-sm text-white/35">
              Job title, skill or company
            </span>
          </div>
          <div className="hidden flex-1 items-center gap-2 rounded-lg bg-[#1c1c27] px-3 py-2.5 sm:flex sm:px-4">
            <MapPin className="size-4 shrink-0 text-white/40" />
            <span className="text-sm text-white/35">Location or Remote</span>
          </div>
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#5b42f3] text-white shadow-[0_2px_16px_rgba(91,66,243,0.45)] transition-all hover:bg-[#6b52ff] hover:shadow-[0_4px_24px_rgba(91,66,243,0.55)] hover:scale-105 active:scale-95">
            <Magnifier className="size-4" />
          </button>
        </motion.div>

        {/* Trending tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-16 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs text-white/40">Trending Positions</span>
          {["Product Designer", "AI Engineering", "DevOps Engineer"].map(
            (tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }}
                className="cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white/80"
              >
                {tag}
              </motion.span>
            ),
          )}
        </motion.div>

        {/* Globe text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 mb-4 flex flex-col items-center gap-1 sm:mt-10"
        >
          <p className="text-base font-light text-white/50 sm:text-2xl">
            Assisting over{" "}
            <span className="font-semibold tracking-wider text-white">
              15,000
            </span>{" "}
            job seekers
          </p>
          <p className="text-base font-light tracking-wider text-white/50 sm:text-2xl">
            find their dream positions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
