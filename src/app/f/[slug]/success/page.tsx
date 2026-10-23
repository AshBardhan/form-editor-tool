import Link from "next/link";
import { FormThemeContainer } from "@/design-system/containers/FormThemeContainer";
import { DEFAULT_FORM_THEME } from "@/lib/constants/themes";
import { FormButton } from "@/design-system/form/FormButton";
import { FormText } from "@/design-system/form/FormText";

export default function SubmissionSuccessPage() {
  return (
    <FormThemeContainer theme={DEFAULT_FORM_THEME}>
      <div className="form-content flex flex-col gap-6 items-center justify-center h-[30vh]">
        <div className="space-y-2 text-center">
          <FormText variant="h2">Form Submitted Successfully!</FormText>
          <FormText variant="p" className="text-form-fg-muted">
            Thank you for your response. Your submission has been recorded.
          </FormText>
        </div>

        <FormButton
          render={<Link href="/forms" />}
          variant="solid"
          color="primary"
          className="w-full"
        >
          Back to Dashboard
        </FormButton>
      </div>
    </FormThemeContainer>
  );
}
