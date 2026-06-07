"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import { LayoutSideContentRight } from "@gravity-ui/icons";
import {
  MdDashboard,
  MdBusiness,
  MdWork,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import { useSession } from "@/lib/auth-client";

const navItems = [
  { icon: MdDashboard, label: "Dashboard", href: "/dashboard/recruiter" },
  { icon: MdBusiness, label: "Jobs", href: "/dashboard/recruiter/jobs" },
  { icon: MdWork, label: "Creat a Job", href: "/dashboard/recruiter/jobs/new" },
  { icon: MdPeople, label: "Company Profile", href: "/dashboard/recruiter/company" },
  { icon: MdSettings, label: "Settings", href: "/dashboard/settings" },
];

function SidebarContent({ pathname, user }) {
  return (
    <div className="flex h-full flex-col bg-[#111117] w-56">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={110}
            height={28}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5b42f3] to-[#f97316] text-white text-xs font-bold">
            {user?.name
              ? user.name.split(" ")[0].slice(0, 2).toUpperCase()
              : "AS"}
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.name || "Anonymous"}
            </p>
            <p className="text-xs text-white/40 truncate">{user?.role}</p>
          </div>
        </div>

        {/* Premium badge */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 rounded-md bg-[#5b42f3]/15 border border-[#5b42f3]/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#a78bfa]">
            ✦ Premium Account ✦
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150
                ${
                  isActive
                    ? "bg-[#5b42f3]/12 text-white"
                    : "text-white/50 hover:bg-white/[0.05] hover:text-white/85"
                }`}
            >
              {/* Active left border */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[#5b42f3]" />
              )}
              <Icon
                className={`text-lg shrink-0 ${isActive ? "text-[#5b42f3]" : "text-white/30 group-hover:text-white/60"}`}
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      {/* ── Desktop sidebar — always visible md+ ── */}
      <aside className="hidden md:flex h-screen sticky top-0 shrink-0 border-r border-white/[0.06]">
        <SidebarContent pathname={pathname} user={user} />
      </aside>

      {/* ── Mobile — Drawer ── */}
      <div className="flex md:hidden">
        <Drawer>
          <Button
            isIconOnly
            variant="light"
            aria-label="Open menu"
            className="fixed top-4 left-4 z-50 text-white/70 hover:text-white bg-[#111117]/80 backdrop-blur border border-white/10 rounded-xl"
          >
            <LayoutSideContentRight className="size-5" />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog className="p-0 bg-[#111117] border-r border-white/[0.06] max-w-[224px]">
                <Drawer.CloseTrigger className="absolute top-3 right-3 text-white/40 hover:text-white z-10" />
                <Drawer.Body className="p-0">
                  <SidebarContent pathname={pathname} user={user} />
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
