import Link from "next/link";
import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";
import { Card, CardContent } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <div className="empty-content">
      <Card>
        <CardContent className="text-center space-y-4 max-w-md">
          <AppText variant="h4">Form Not Found</AppText>
          <AppText className="text-app-fg-muted">
            The form you're looking for is no longer available.
          </AppText>
          <Link href="/forms">
            <AppButton variant="outline" color="secondary">
              Back to Dashboard
            </AppButton>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
