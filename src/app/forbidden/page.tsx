/**
 * Forbidden (403) Page
 * Shown when user tries to access a resource they don't have permission for
 */

import Link from "next/link";
import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <AppText variant="h1" className="text-9xl">
          403
        </AppText>
        <AppText variant="h2" className="mt-4">
          Access Denied
        </AppText>
        <AppText
          variant="p"
          className="mt-4 max-w-md mx-auto text-app-fg-muted"
        >
          You don't have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </AppText>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/forms">
            <AppButton variant="solid" color="primary">
              Go to Dashboard
            </AppButton>
          </Link>
          <Link href="/">
            <AppButton variant="outline" color="secondary">
              Go Home
            </AppButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
