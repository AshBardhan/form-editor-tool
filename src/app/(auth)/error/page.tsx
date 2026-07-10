/**
 * Authentication Error Page
 * Shown when authentication fails
 */

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-8">{errorMessage}</p>
        <Link
          href="/auth/signin"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
