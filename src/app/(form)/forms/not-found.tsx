import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";

export default function NotFound() {
  return (
    <div className="empty-content">
      <Card>
        <CardContent className="text-center space-y-4 max-w-md">
          <Text variant="h4">Form Not Found</Text>
          <Text className="text-muted-foreground">
            The form you're looking for is no longer available.
          </Text>
          <Link href="/forms">
            <Button variant="secondary" size="sm">
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
