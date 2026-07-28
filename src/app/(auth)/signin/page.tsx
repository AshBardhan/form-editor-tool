/**
 * Sign In Page
 * User authentication page
 */

import { Suspense } from "react";
import { SignInForm } from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>
          <Suspense
            fallback={<div className="text-center py-4">Loading...</div>}
          >
            <SignInForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
