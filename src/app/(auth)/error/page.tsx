/**
 * Authentication Error Page
 * Shown when authentication fails
 */

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: "Sign-in is temporarily unavailable due to a server configuration issue. Please try again later.",
    AccessDenied: "Your account does not have permission to sign in.",
    Verification:
      "This verification link has expired or has already been used.",
    Default: "We were unable to sign you in. Please try again.",
  };

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <AuthFormCard title="Authentication error" description={errorMessage}>
      <AppButton
        render={<Link href="/signin" />}
        variant="outline"
        color="secondary"
        className="w-full"
      >
        Back to sign in
      </AppButton>
    </AuthFormCard>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={<AppText className="py-4 text-center">Loading...</AppText>}
    >
      <AuthErrorContent />
    </Suspense>
  );
}
