import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Text from "@/components/ui/Text";

export default function SubmissionsNotFound() {
  return (
    <div className="p-6 space-y-4">
      <Text variant="h3">Form Submissions Not Found</Text>
      <Text className="text-muted-foreground">
        This form does not exist or is no longer available to view submissions.
      </Text>
      <Link href="/forms">
        <Button variant="secondary" size="sm">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
