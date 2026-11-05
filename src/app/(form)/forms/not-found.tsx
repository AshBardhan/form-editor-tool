import Link from "next/link";
import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";
import { AppCard } from "@/design-system/app/AppCard";

export default function NotFound() {
  return (
    <div className="empty-content">
      <AppCard className="text-center space-y-4 max-w-md">
        <AppText variant="h4">Form not found</AppText>
        <AppText className="text-app-fg-muted">
          The form you are looking for does not exist or has been deleted.
        </AppText>
        <AppButton
          render={<Link href="/forms" />}
          variant="outline"
          color="secondary"
        >
          Back to dashboard
        </AppButton>
      </AppCard>
    </div>
  );
}
