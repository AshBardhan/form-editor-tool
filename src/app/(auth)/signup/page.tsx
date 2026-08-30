/**
 * Sign Up Page
 * Form card in the auth split layout.
 */

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthFormCard
      title="Create account"
      description="Start building forms today"
    >
      <SignUpForm />
    </AuthFormCard>
  );
}
