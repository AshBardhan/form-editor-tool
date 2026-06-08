"use client";

import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export default function FieldsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6 space-y-4">
      <Text variant="h3" className="text-error">
        Error Loading Analysis
      </Text>
      <Text className="text-muted-foreground">
        {error.message || "Unable to load field analysis"}
      </Text>
      <Button variant="secondary" size="sm" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
