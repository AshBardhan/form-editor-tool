/**
 * Forbidden (403) Page
 * Shown when user tries to access a resource they don't have permission for
 */

import Link from "next/link";
import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-app-surface-muted">
      <div className="text-center px-4">
        <AppText variant="h1" className="text-9xl">
          403
        </AppText>
        <AppText variant="h2" className="mt-4">
          Access denied
        </AppText>
        <AppText
          variant="p"
          className="mt-4 max-w-md mx-auto text-app-fg-muted"
        >
          You do not have permission to view this page. If you believe this is a
          mistake, please contact your administrator.
        </AppText>
        <div className="mt-8 flex gap-4 justify-center">
          <AppButton
            render={<Link href="/forms" />}
            variant="solid"
            color="primary"
          >
            Go to dashboard
          </AppButton>
          <AppButton
            render={<Link href="/" />}
            variant="outline"
            color="secondary"
          >
            Go to home page
          </AppButton>
        </div>
      </div>
    </div>
  );
}
