import Link from "next/link";
import { FormThemeContainer } from "@/design-system/containers/FormThemeContainer";
import { FormButton } from "@/design-system/form/FormButton";
import { FormText } from "@/design-system/form/FormText";
import { Card, CardContent } from "@/components/ui/Card";

export default function SubmissionSuccessPage() {
  return (
    <FormThemeContainer theme="light">
      <div className="min-h-screen bg-form-canvas flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center space-y-6 py-12">
            <div className="w-16 h-16 bg-form-success/10 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-form-success"
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
              <FormText variant="h3">Form Submitted Successfully!</FormText>
              <FormText variant="p" className="text-form-fg-muted">
                Thank you for your response. Your submission has been recorded.
              </FormText>
            </div>

            <Link href="/forms" className="block">
              <FormButton variant="solid" color="primary" className="w-full">
                Back to Dashboard
              </FormButton>
            </Link>
          </CardContent>
        </Card>
      </div>
    </FormThemeContainer>
  );
}
