import React from "react";
import { Button, Link } from "@heroui/react";
// আপনার পছন্দমতো আইকন সেট ব্যবহার করতে পারেন (যেমন gravity-ui বা react-icons)
import { FiGlobe, FiLayers, FiCpu, FiZap } from "react-icons/fi";

export default function TopCompanies() {
  return (
    <div className="">
      <div>
        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white tracking-tight">
            My Top Companies
          </h2>
          <Link
            href="#"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            View all
          </Link>
        </div>

        {/* Company List */}
        <div className="flex flex-col gap-5 w-full bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between h-full">
          {/* Company 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700/30">
                <FiGlobe className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Google Inc.
                </h4>
                <p className="text-xs text-zinc-500">
                  Technology • Mountain View
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-white">24</span>
              <span className="text-[10px] uppercase font-medium tracking-wider text-zinc-500">
                Active Jobs
              </span>
            </div>
          </div>

          {/* Company 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700/30">
                <FiLayers className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Meta Platforms
                </h4>
                <p className="text-xs text-zinc-500">
                  Social Media • Menlo Park
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-white">18</span>
              <span className="text-[10px] uppercase font-medium tracking-wider text-zinc-500">
                Active Jobs
              </span>
            </div>
          </div>

          {/* Company 3 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700/30">
                <FiCpu className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Stripe</h4>
                <p className="text-xs text-zinc-500">Fintech • San Francisco</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-white">12</span>
              <span className="text-[10px] uppercase font-medium tracking-wider text-zinc-500">
                Active Jobs
              </span>
            </div>
          </div>

          {/* Company 4 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700/30">
                <FiZap className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Tesla</h4>
                <p className="text-xs text-zinc-500">Automotive • Austin</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-white">31</span>
              <span className="text-[10px] uppercase font-medium tracking-wider text-zinc-500">
                Active Jobs
              </span>
            </div>
          </div>
      {/* View All Button at bottom */}
      <Button
        variant="bordered"
        className="w-full border-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium rounded-xl text-xs py-5"
      >
        View All Companies
      </Button>
        </div>
      </div>

    </div>
  );
}
