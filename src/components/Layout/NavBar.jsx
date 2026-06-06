"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Link,
  Button,
  Dropdown,
  Separator,
  Header,
  Spinner,
} from "@heroui/react";
import {
  Bars,
  Briefcase,
  Suitcase,
  Tag,
  Person,
  ArrowRightFromSquare,
  CircleQuestion,
} from "@gravity-ui/icons";
import { useSession, signOut } from "../../lib/auth-client";
import { toast } from "sonner";

export default function NavBar({ logoSrc = "/images/logo.png" }) {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/dashboard")) return null;
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
          toast.success("Signed out successfully.");
        },
      },
    });
  };

  return (
    <div className="sticky top-0 z-40 w-full px-4 sm:px-6 pt-4">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-[#111117]/90 px-4 sm:px-6 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.4)]">
        {/* Logo — বামে */}
        <Link href="/">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="logo"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-white font-bold text-xl">Logo</span>
          )}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/jobs"
            className="text-sm font-medium text-white/75 hover:text-white transition-colors"
          >
            Browse Jobs
          </Link>
          <Link
            href="/company"
            className="text-sm font-medium text-white/75 hover:text-white transition-colors"
          >
            Company
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-white/75 hover:text-white transition-colors"
          >
            Pricing
          </Link>

          <div className="h-5 w-px bg-white/20" />

          {isPending ? (
            <Spinner size="sm" color="secondary" />
          ) : user ? (
            <>
              Hi, {user.name.split(" ")[0]} 👋
              <Link
                onClick={handleSignOut}
                href="/signin"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              href="/signin"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link href="signup">
            <Button className="bg-[#5b42f3] hover:bg-[#6b52ff] text-white text-sm font-semibold rounded-lg px-5 h-9 min-w-0 shadow-[0_2px_16px_rgba(91,66,243,0.4)] transition-colors">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile — Hamburger Dropdown */}
        <div className="flex md:hidden items-center gap-2">
          {isPending && <Spinner size="sm" color="secondary" />}

          <Dropdown>
            <Button
              isIconOnly
              variant="light"
              aria-label="Menu"
              className="text-white/75 hover:text-white"
            >
              <Bars className="size-5" />
            </Button>

            <Dropdown.Popover className="min-w-[220px]">
              <Dropdown.Menu onAction={() => {}}>
                <Dropdown.Section>
                  <Header>Navigation</Header>

                  <Dropdown.Item id="jobs" textValue="Browse Jobs" href="/jobs">
                    <div className="flex h-8 items-start justify-center pt-px">
                      <Briefcase className="size-4 shrink-0 text-muted" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Browse Jobs</span>
                      <span className="text-xs text-muted">
                        Find your next role
                      </span>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="company"
                    textValue="Company"
                    href="/company"
                  >
                    <div className="flex h-8 items-start justify-center pt-px">
                      <Suitcase className="size-4 shrink-0 text-muted" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Company</span>
                      <span className="text-xs text-muted">
                        About, blog & press
                      </span>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="pricing"
                    textValue="Pricing"
                    href="#pricing"
                  >
                    <div className="flex h-8 items-start justify-center pt-px">
                      <Tag className="size-4 shrink-0 text-muted" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Pricing</span>
                      <span className="text-xs text-muted">
                        Plans & packages
                      </span>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="for-recruiters"
                    textValue="For Recruiters"
                    href="/for-recruiters"
                  >
                    <div className="flex h-8 items-start justify-center pt-px">
                      <CircleQuestion className="size-4 shrink-0 text-muted" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        For Recruiters
                      </span>
                      <span className="text-xs text-muted">
                        Post jobs & hire talent
                      </span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Section>

                <Separator />

                <Dropdown.Section>
                  <Header>Account</Header>

                  <Dropdown.Item
                    id="sign-in"
                    textValue="Sign In"
                    href="/signin"
                  >
                    <div className="flex h-8 items-start justify-center pt-px">
                      <ArrowRightFromSquare className="size-4 shrink-0 text-muted" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Sign In</span>
                      <span className="text-xs text-muted">
                        Access your account
                      </span>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="get-started"
                    textValue="Get Started"
                    href="/signup"
                  >
                    <div className="flex h-8 items-start justify-center pt-px">
                      <Person className="size-4 shrink-0 text-muted" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#a78bfa]">
                        Get Started
                      </span>
                      <span className="text-xs text-muted">
                        Create a free account
                      </span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
}
