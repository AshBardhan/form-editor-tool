import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { Card, CardContent } from "@/components/ui/Card";

export default function SubmissionSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="text-center space-y-6 py-12">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <Text variant="h3" className="text-foreground">
              Form Submitted Successfully!
            </Text>
            <Text className="text-muted-foreground">
              Thank you for your response. Your submission has been recorded.
            </Text>
          </div>

          <Link href="/forms">
            <Button className="w-full">Back to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
