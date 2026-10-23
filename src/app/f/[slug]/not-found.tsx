import Link from "next/link";
import { FormThemeContainer } from "@/design-system/containers/FormThemeContainer";
import { DEFAULT_FORM_THEME } from "@/lib/constants/themes";
import { FormButton } from "@/design-system/form/FormButton";
import { FormText } from "@/design-system/form/FormText";

export default function PublicFormNotFound() {
  return (
    <FormThemeContainer theme={DEFAULT_FORM_THEME}>
      <div className="form-content flex flex-col gap-6 items-center justify-center h-[30vh]">
        <div className="space-y-2 text-center">
          <FormText variant="h2">Form Not Found</FormText>
          <FormText variant="p" className="text-form-fg-muted">
            This form doesn&apos;t exist or is no longer accepting submissions.
          </FormText>
        </div>

        <FormButton
          render={<Link href="/forms" />}
          variant="solid"
          color="primary"
        >
          Go to Dashboard
        </FormButton>
      </div>
    </FormThemeContainer>
  );
}
