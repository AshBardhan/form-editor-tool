"use client";

import { FormEvent, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AppText } from "@/design-system/app/AppText";
import { AppButton } from "@/design-system/app/AppButton";
import { FormField } from "@/components/ui/FormField";

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
        <div className="bg-app-surface-negative border border-app-border-negative px-4 py-3 rounded-lg">
          <AppText variant="p" className="text-sm text-app-fg-negative">
            {error}
          </AppText>
        </div>
      )}

      <FormField
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <FormField
        type="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />

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
        <Link href="/signup">
          <AppButton variant="link" color="secondary">
            Sign up
          </AppButton>
        </Link>
      </div>
    </form>
  );
}
