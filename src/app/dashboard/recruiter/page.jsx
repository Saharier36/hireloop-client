"use client";
import { useSession } from "@/lib/auth-client";
import { FiFileText, FiUsers, FiZap, FiCheckCircle } from "react-icons/fi";
import React from "react";
import StatsGrid from "@/components/Dashboard/StatsGrid";
import RecentApplications from "@/components/Dashboard/RecentApplications";
import TopCompanies from "@/components/Dashboard/TopCompanies";
import { Magnifier } from "@gravity-ui/icons";
import { TextField, InputGroup } from "@heroui/react";

const RecruiterDashboardPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const recruiterStats = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: FiFileText,
      iconColor: "text-zinc-400",
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: FiUsers,
      iconColor: "text-zinc-400",
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: FiZap,
      iconColor: "text-zinc-400",
    },
    {
      title: "Jobs Closed",
      value: "32",
      icon: FiCheckCircle,
      iconColor: "text-zinc-400",
    },
  ];

  return (
    <div className="p-10 min-h-screen">
      <div className="w-full mb-8">
        <TextField fullWidth name="search">
          <InputGroup
            fullWidth
            className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-xl hover:border-zinc-700 focus-within:!border-zinc-600 transition-all h-12 flex items-center px-3"
          >
            {/* Left Search Icon using Gravity UI */}
            <InputGroup.Prefix className="flex items-center justify-center pr-2">
              <Magnifier className="size-5 text-zinc-500" />
            </InputGroup.Prefix>

            {/* Input field styled for dark theme */}
            <InputGroup.Input
              placeholder="Search for jobs, applicants, companies or keywords..."
              type="text"
              className="text-sm text-zinc-200 placeholder:text-zinc-500 bg-transparent outline-none border-none focus:ring-0 w-full h-full"
            />
          </InputGroup>
        </TextField>
      </div>
      <h2 className="font-bold text-2xl mb-8">Welcome back, {user?.name}</h2>
      <StatsGrid statsData={recruiterStats} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 min-h-screen">
        {/* Table spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <RecentApplications />
        </div>

        {/* Top Companies spans 1 column */}
        <div className="lg:col-span-1">
          <TopCompanies />
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;
