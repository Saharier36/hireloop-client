"use client";

import { motion } from "motion/react";
import {
  FaSearch,
  FaChartBar,
  FaBolt,
  FaFileAlt,
  FaBuilding,
  FaUsers,
  FaBookmark,
  FaGraduationCap,
} from "react-icons/fa";

const features = [
  {
    icon: FaSearch,
    title: "Smart Search",
    desc: "Find your ideal job with advanced filters.",
  },
  {
    icon: FaChartBar,
    title: "Salary Insights",
    desc: "Get real salary data to negotiate confidently.",
  },
  {
    icon: FaBuilding,
    title: "Top Companies",
    desc: "Apply to vetted companies that are hiring.",
  },
  {
    icon: FaBookmark,
    title: "Saved Jobs",
    desc: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: FaBolt,
    title: "One-Click Apply",
    desc: "Simplify your job applications for an easier process!",
  },
  {
    icon: FaFileAlt,
    title: "Resume Builder",
    desc: "Create professional resumes with modern templates.",
  },
  {
    icon: FaUsers,
    title: "Skill-Based Matching",
    desc: "Discover jobs that match your skills and experience.",
  },
  {
    icon: FaGraduationCap,
    title: "Career Growth Resources",
    desc: "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 bg-[#0a0a0f]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5b42f3]/30 bg-[#5b42f3]/10 px-3 py-1 text-xs font-medium text-[#a78bfa]">
            ✦ FEATURES ✦
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-center text-3xl sm:text-4xl font-bold text-white tracking-tight mb-12"
        >
          Everything you need
          <br className="hidden sm:block" /> to succeed
        </motion.h2>

        {/* Dashed border grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-dashed border-[#5b42f3]/40 p-1"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{
                  backgroundColor: "#13131e",
                  transition: { duration: 0.15 },
                }}
                className="flex flex-col gap-2 bg-[#0e0e15] p-5 transition-colors duration-200 group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5b42f3]/15 text-[#a78bfa] group-hover:bg-[#5b42f3]/25 transition-colors duration-200"
                >
                  <Icon className="text-base" />
                </motion.div>
                <p className="text-sm font-semibold text-white/90">{title}</p>
                <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
