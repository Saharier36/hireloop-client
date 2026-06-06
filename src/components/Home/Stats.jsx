"use client";

import {
  Briefcase,
  ChartLineArrowUp,
  Star,
  MagnifierPlus,
} from "@gravity-ui/icons";
import { motion } from "motion/react";

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
        {stats.map(({ icon: Icon, value, label, accent }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131319]/80 p-4 backdrop-blur-md transition-colors duration-300 hover:border-white/15 hover:bg-[#161620]/90"
          >
            <div
              className={`absolute -top-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br ${accent} blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative mb-2 flex h-10 w-10 items-center justify-center">
              <Icon className="size-5 text-[#5b42f3]" />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              {value}
            </motion.p>
            <p className="relative mt-1 text-xs text-white/40 sm:text-sm">
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
