/**
 * Sign Up Page
 * Form card in the auth split layout.
 */

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthFormCard
      title="Create an account"
      description="Start building and publishing forms today"
    >
      <SignUpForm />
    </AuthFormCard>
  );
}
