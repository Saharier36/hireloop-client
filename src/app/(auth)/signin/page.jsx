"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, InputGroup } from "@heroui/react";
import {
  Fieldset,
  FieldGroup,
  TextField,
  Label,
  Input,
  FieldError,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const signInData = Object.fromEntries(formData.entries());

    const { data, error } = await signIn.email({
      ...signInData,
    });

    if (error) {
      toast.error(error.message || "Sign in failed.");
      setLoading(false);
      return;
    }

    toast.success("Welcome back! 👋");
    router.push("/");
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center px-4">
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#5b42f3]/10 blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-[#f97316]/8 blur-[130px]" />
      </div>

      <div className="w-full max-w-[380px]">
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-[#5b42f3]/50 to-transparent" />

        <div className="rounded-2xl border border-white/[0.08] bg-[#13131a] shadow-[0_20px_60px_rgba(0,0,0,0.6)] px-6 py-7">
          {/* Logo */}
          <div className="flex justify-center mb-4">
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

          {/* Heading */}
          <div className="text-center mb-5">
            <h1 className="text-base font-semibold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="mt-0.5 text-xs text-white/35">
              Sign in to your HireLoop account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Fieldset>
              <FieldGroup className="flex flex-col gap-3">
                {/* Email */}
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  className="flex flex-col gap-1"
                >
                  <Label className="text-xs font-medium text-white/50">
                    Email
                  </Label>
                  <Input
                    placeholder="john@example.com"
                    className="h-9 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/20 focus:border-[#5b42f3]/50 focus:outline-none transition-all duration-200"
                  />
                  <FieldError className="text-[11px] text-red-400" />
                </TextField>

                {/* Password */}
                <TextField
                  isRequired
                  name="password"
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-white/50">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] text-[#a78bfa] hover:text-white transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <InputGroup>
                    <InputGroup.Input
                      type={isVisible ? "text" : "password"}
                      placeholder="Your password"
                      className="h-9 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/20 focus:border-[#5b42f3]/50 focus:outline-none transition-all duration-200"
                    />
                    <InputGroup.Suffix className="pr-0">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        onPress={() => setIsVisible(!isVisible)}
                        aria-label={isVisible ? "Hide" : "Show"}
                        className="text-white/40 hover:text-white/80 transition-colors"
                      >
                        {isVisible ? (
                          <Eye className="size-4" />
                        ) : (
                          <EyeSlash className="size-4" />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <FieldError className="text-[11px] text-red-400" />
                </TextField>
              </FieldGroup>
            </Fieldset>

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              className="mt-5 h-10 rounded-xl bg-[#5b42f3] hover:bg-[#6b52ff] text-white font-semibold text-sm shadow-[0_2px_20px_rgba(91,66,243,0.4)] transition-all duration-200"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-4 text-center text-[11px] text-white/25">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#a78bfa] hover:text-white font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-3 text-center text-[10px] text-white/15">
          Secured by HireLoop · Your data is safe
        </p>
      </div>
    </div>
  );
}
