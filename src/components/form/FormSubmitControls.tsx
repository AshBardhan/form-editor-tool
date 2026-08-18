import { FormActions } from "@/lib/types/form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/styleUtils";
import { JSX } from "react";

interface FormSubmitControlsProps {
  actions: FormActions;
}

/**
 * Maps alignment options to CSS classes for horizontal alignment.
 */
const ALIGNMENT_CLASS_MAP: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  justified: "justify-between",
};

/**
 * Form Submit Controls
 * - Renders the form-wide submit/reset button pair driven by form-level `actions` config.
 * - Submit is always styled "primary" and reset is always "outline" (fixed, not configurable).
 *
 * @param {FormSubmitControlsProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormSubmitControls = ({
  actions,
}: FormSubmitControlsProps): JSX.Element => {
  const alignmentClass =
    ALIGNMENT_CLASS_MAP[actions.alignment] || "justify-start";

  const submitButton = (
    <Button type="submit" variant="default">
      {actions.submitLabel}
    </Button>
  );

  const resetButton = actions.hideReset ? null : (
    <Button type="reset" variant="outline">
      {actions.resetLabel}
    </Button>
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
