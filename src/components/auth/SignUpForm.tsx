"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppText } from "@/design-system/app/AppText";
import { AppButton } from "@/design-system/app/AppButton";
import { AppInput } from "@/design-system/app/AppInput";
import { AppLabel } from "@/design-system/app/AppLabel";

export function SignUpForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Signup failed");
      }

      // Redirect to signin with success message
      router.push("/signin?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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

      <div className="flex flex-col gap-2">
        <AppLabel htmlFor="name" required>
          Full Name
        </AppLabel>
        <AppInput
          id="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <AppLabel htmlFor="email" required>
          Email
        </AppLabel>
        <AppInput
          id="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          autoComplete="new-password"
        />
      </div>

      <div className="flex flex-col gap-2">
        <AppLabel htmlFor="confirm-password" required>
          Confirm Password
        </AppLabel>
        <AppInput
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
          autoComplete="new-password"
        />
      </div>

      <AppButton
        variant="solid"
        color="primary"
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </AppButton>

      <div className="text-center text-sm text-app-fg-muted">
        Already have an account?{" "}
        <Link href="/signin">
          <AppButton variant="link" color="secondary">
            Sign in
          </AppButton>
        </Link>
      </div>
    </form>
  );
}
