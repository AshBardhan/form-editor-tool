import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Text from "@/components/ui/Text";

export default function PublicFormNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <Text variant="h2" className="text-foreground">
            Form Not Found
          </Text>
          <Text className="text-muted-foreground">
            This form doesn&apos;t exist or is no longer accepting responses.
          </Text>
        </div>

        <Link href="/forms">
          <Button variant="default" size="default">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
