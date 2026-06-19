"use client";

import Text from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SubmissionsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Card className="text-center px-6 space-y-4">
      <Text variant="h5" className="text-error">
        Error Loading Submissions
      </Text>
      <Text className="text-muted-foreground">
        {error.message || "Unable to load form submissions. Please try again."}
      </Text>
      <Button variant="secondary" size="sm" onClick={reset}>
        Try Again
      </Button>
    </Card>
  );
}
