import { FormActions } from "@/lib/types/form";
import { FormButton } from "@/design-system/form/FormButton";
import { cn } from "@/lib/utils/styleUtils";
import { JSX } from "react";
import type { ButtonAlignment } from "@/lib/types/form";

interface FormActionGroupProps {
  actions: FormActions;
}

/**
 * Maps alignment options to CSS classes for horizontal alignment.
 */
const ALIGNMENT_CLASS_MAP: Record<ButtonAlignment, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  justified: "justify-between",
};

/**
 * Form Action Group
 * - Renders the form-wide submit/reset button pair driven by form-level `actions` config.
 * - Submit is always solid primary and reset is always outline secondary.
 *
 * @param {FormActionGroupProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormActionGroup = ({
  actions,
}: FormActionGroupProps): JSX.Element => {
  const alignmentClass =
    ALIGNMENT_CLASS_MAP[actions.alignment] || "justify-start";

  const submitButton = (
    <FormButton type="submit" variant="solid" color="primary">
      {actions.submitLabel}
    </FormButton>
  );

  const resetButton = actions.hideReset ? null : (
    <FormButton type="reset" variant="outline" color="secondary">
      {actions.resetLabel}
    </FormButton>
  );

  return (
    <div
      className={cn("form-block flex flex-row gap-2 @sm:gap-3", alignmentClass)}
    >
      {actions.reverse ? (
        <>
          {resetButton}
          {submitButton}
        </>
      ) : (
        <>
          {submitButton}
          {resetButton}
        </>
      )}
    </div>
  );
};
