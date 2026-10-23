"use client";

import { FormEvent, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AppText } from "@/design-system/app/AppText";
import { AppButton } from "@/design-system/app/AppButton";
import { AppInput } from "@/design-system/app/AppInput";
import { AppLabel } from "@/design-system/app/AppLabel";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = useMemo(() => {
    const url = searchParams.get("callbackUrl");

    // Prevent open redirects
    return url?.startsWith("/") ? url : "/forms";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      if (result?.ok && result.url) {
        router.replace(result.url);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-app-error-subtle border border-app-error px-4 py-3 rounded-lg">
          <AppText variant="p" className="text-sm text-app-error">
            {error}
          </AppText>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <AppLabel htmlFor="email" required>
          Email
        </AppLabel>
        <AppInput
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <AppLabel htmlFor="password" required>
          Password
        </AppLabel>
        <AppInput
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      <AppButton
        variant="solid"
        color="primary"
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </AppButton>

      <div className="text-center text-sm text-app-fg-muted">
        Don't have an account?{" "}
        <AppButton
          render={<Link href="/signup" />}
          variant="link"
          color="secondary"
        >
          Sign up
        </AppButton>
      </div>
    </form>
  );
}
