"use client";

import Image from "next/image";
import { Link } from "@heroui/react";
import { LogoFacebook, LogoGithub, LogoLinkedin } from "@gravity-ui/icons";

const footerLinks = [
  {
    heading: "Product",
    color: "text-[#f97316]",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary" },
    ],
  },
  {
    heading: "Navigations",
    color: "text-[#5b42f3]",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    color: "text-[#f97316]",
    links: [
      { label: "Brand Guideline", href: "/brand" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
];

const socialLinks = [
  {
    icon: LogoFacebook,
    href: "https://facebook.com",
    label: "Facebook",
    bg: "bg-white/5",
    border: "border-white/10",
  },
  {
    icon: LogoGithub,
    href: "https://github.com",
    label: "GitHub",
    bg: "bg-[#5b42f3]",
    border: "border-[#5b42f3]",
  },
  {
    icon: LogoLinkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    bg: "bg-white/5",
    border: "border-white/10",
  },
];

export default function Footer({ logoSrc = "/images/logo.png" }) {
  return (
    <footer className="w-full bg-[#0e0e13] border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl px-6 pt-10 pb-6">
        {/* ── Top: Logo LEFT, Columns RIGHT ── */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Left — Logo + tagline */}
          <div className="flex flex-col gap-4 max-w-[220px]">
            <Link href="/">
              <Image
                src={logoSrc}
                alt="HireLoop"
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            <p className="text-sm text-white/45 leading-relaxed">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Right — Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerLinks.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <p className={`text-sm font-semibold ${col.color}`}>
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white/90 transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="my-6 h-px bg-white/[0.06]" />

        {/* ── Bottom: Social LEFT, Copyright RIGHT ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label, bg, border }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                isExternal
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${border} ${bg} text-white hover:opacity-80 transition-opacity duration-150`}
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/35">
            <span>Copyright 2024 – HireLoop</span>
            <span className="text-white/20">·</span>
            <Link
              href="/terms"
              className="text-xs text-white/35 hover:text-white/70 transition-colors"
            >
              Terms & Policy
            </Link>
            <span className="text-white/20">–</span>
            <Link
              href="/privacy"
              className="text-xs text-white/35 hover:text-white/70 transition-colors"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
