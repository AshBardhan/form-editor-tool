/**
 * Sign In Page
 * Form card in the auth split layout.
 */

import { Suspense } from "react";
import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { SignInForm } from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <AuthFormCard title="Welcome back" description="Sign in to your account">
      <Suspense fallback={<div className="py-4 text-center">Loading...</div>}>
        <SignInForm />
      </Suspense>
    </AuthFormCard>
  );
}
