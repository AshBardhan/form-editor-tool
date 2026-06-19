import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";

export default function SubmissionsNotFound() {
  return (
    <Card className="text-center space-y-2">
      <Text variant="h5">Data Unavailable</Text>
      <Text className="text-muted-foreground">
        This form does not exist or is no longer available to view submissions.
      </Text>
      <Link href="/forms">
        <Button variant="secondary" size="sm">
          Back to Dashboard
        </Button>
      </Link>
    </Card>
  );
}
