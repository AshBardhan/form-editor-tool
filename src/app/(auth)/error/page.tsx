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
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification:
      "The verification token has expired or has already been used.",
    Default: "An error occurred during authentication.",
  };

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <AuthFormCard title="Authentication error" description={errorMessage}>
      <Link href="/signin">
        <AppButton variant="outline" color="secondary" className="w-full">
          Try again
        </AppButton>
      </Link>
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
