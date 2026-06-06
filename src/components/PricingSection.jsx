"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    badge: null,
    desc: "Start building your insights base",
    features: [
      "Up to 5 job applications",
      "Basic salary insights",
      "Company insights (limited)",
      "Profile apply: unlimited",
    ],
    cta: "Create Free Plan",
    ctaHref: "/signup",
    popular: false,
  },
  {
    name: "Growth",
    monthlyPrice: 17,
    yearlyPrice: 12,
    badge: "POPULAR",
    desc: "Start building your insights hub",
    features: [
      "Unlimited job applications",
      "Full salary forms (2)",
      "Verified salary forms",
      "Profile apply: unlimited",
    ],
    cta: "Choose This Plan",
    ctaHref: "/signup",
    popular: true,
  },
  {
    name: "Premium",
    monthlyPrice: 99,
    yearlyPrice: 79,
    badge: null,
    desc: "Start building your insights empire",
    features: [
      "Everything in Growth",
      "Priority job placements",
      "Advanced team scores",
      "Recruiter: team match score",
    ],
    cta: "Choose This Plan",
    ctaHref: "/signup",
    popular: false,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="w-full py-20 bg-[#0a0a0f]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5b42f3]/30 bg-[#5b42f3]/10 px-3 py-1 text-xs font-medium text-[#a78bfa]">
            ✦ PRICING ✦
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Pay for the leverage,
          <br className="hidden sm:block" /> not the listings
        </h2>

        {/* Monthly / Yearly toggle */}
        <div className="flex justify-center mt-6 mb-12">
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                !isYearly
                  ? "bg-[#5b42f3] text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                isYearly
                  ? "bg-[#5b42f3] text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Yearly
              <span className="rounded-full bg-[#f97316]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#f97316]">
                -30%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <Card
                key={plan.name}
                className={`relative flex flex-col bg-[#0e0e15] border rounded-2xl p-6 ${
                  plan.popular
                    ? "border-[#5b42f3]/50 shadow-[0_0_32px_rgba(91,66,243,0.2)]"
                    : "border-white/[0.08]"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#5b42f3] px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                      Popular
                    </span>
                  </div>
                )}

                <Card.Content className="flex flex-col gap-4 p-0">
                  {/* Plan + price */}
                  <div>
                    <p className="text-sm font-semibold text-white/60 mb-1">
                      {plan.name}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-white">
                        ${price}
                      </span>
                      <span className="text-sm text-white/40 mb-1">/mo</span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">{plan.desc}</p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <FaCheckCircle className="text-[#5b42f3] shrink-0 mt-0.5 text-sm" />
                        <span className="text-xs text-white/60">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    as={Link}
                    href={plan.ctaHref}
                    fullWidth
                    className={`mt-2 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      plan.popular
                        ? "bg-[#5b42f3] hover:bg-[#6b52ff] text-white shadow-[0_2px_16px_rgba(91,66,243,0.4)]"
                        : "border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white/80"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
