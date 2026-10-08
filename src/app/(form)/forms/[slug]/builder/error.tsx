"use client";

import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="empty-content flex-col gap-3">
      <AppText variant="h2">Unable to load form</AppText>
      <AppText variant="p">{error.message}</AppText>
      <AppButton variant="solid" color="primary" onClick={reset}>
        Try Again
      </AppButton>
    </div>
  );
}
