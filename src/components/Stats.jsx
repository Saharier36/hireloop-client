"use client";

import { Briefcase, ChartLineArrowUp, Star, MagnifierPlus } from "@gravity-ui/icons";

const stats = [
  {
    icon: Briefcase,
    value: "50K",
    label: "Active Jobs",
    accent: "from-[#5b42f3]/20 to-transparent",
  },
  {
    icon: ChartLineArrowUp,
    value: "12K",
    label: "Companies",
    accent: "from-[#5b42f3]/20 to-transparent",
  },
  {
    icon: MagnifierPlus,
    value: "2M",
    label: "Job Seekers",
    accent: "from-[#5b42f3]/20 to-transparent",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
    accent: "from-[#f97316]/20 to-transparent",
  },
];

export default function Stats() {
  return (
    <section className="relative z-10 w-full pb-16 sm:pb-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-4 sm:gap-4 md:grid-cols-4 md:px-6">
        {stats.map(({ icon: Icon, value, label, accent }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131319]/80 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-[#161620]/90"
          >
            {/* Subtle gradient accent top-left */}
            <div
              className={`absolute -top-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br ${accent} blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60`}
            />

            {/* Icon */}
            <div className="relative mb-2 flex h-10 w-10 items-center justify-center ">
              <Icon className="size-5 text-[#5b42f3]" />
            </div>

            {/* Value */}
            <p className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {value}
            </p>

            {/* Label */}
            <p className="relative mt-1 text-xs text-white/40 sm:text-sm">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
