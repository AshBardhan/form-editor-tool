"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

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
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <FormField
        type="text"
        label="Full Name"
        placeholder="John Doe"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        autoComplete="name"
      />

      <FormField
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        autoComplete="email"
      />

      <FormField
        type="password"
        label="Password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        autoComplete="new-password"
      />

      <FormField
        type="password"
        label="Confirm Password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        required
        autoComplete="new-password"
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="text-blue-600 hover:underline font-medium"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
