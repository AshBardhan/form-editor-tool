import Link from "next/link";
import { FormThemeContainer } from "@/design-system/containers/FormThemeContainer";
import { FormButton } from "@/design-system/form/FormButton";
import { FormText } from "@/design-system/form/FormText";

export default function PublicFormNotFound() {
  return (
    <FormThemeContainer theme="light">
      <div className="min-h-screen bg-form-surface flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <FormText variant="h2">Form Not Found</FormText>
            <FormText variant="p" className="text-form-fg-muted">
              This form doesn&apos;t exist or is no longer accepting
              submissions.
            </FormText>
          </div>

          <Link href="/forms" className="inline-flex">
            <FormButton variant="solid" color="primary">
              Go to Dashboard
            </FormButton>
          </Link>
        </div>
      </div>
    </FormThemeContainer>
  );
}
