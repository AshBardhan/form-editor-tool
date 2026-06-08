"use client";

import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export default function ResponsesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6 space-y-4">
      <Text variant="h3" className="text-error">
        Error Loading Responses
      </Text>
      <Text className="text-muted-foreground">
        {error.message || "Unable to load form responses"}
      </Text>
      <Button variant="secondary" size="sm" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
