import { FormCta } from "@/lib/types/form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/styleUtils";
import { JSX } from "react";

interface FormSubmitControlsProps {
  cta: FormCta;
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
 * - Renders the form-wide submit/reset button pair driven by form-level `cta` config.
 * - Submit is always styled "primary" and reset is always "outline" (fixed, not configurable).
 *
 * @param {FormSubmitControlsProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormSubmitControls = ({
  cta,
}: FormSubmitControlsProps): JSX.Element => {
  const alignmentClass = ALIGNMENT_CLASS_MAP[cta.alignment] || "justify-start";

  const submitButton = (
    <Button type="submit" variant="default">
      {cta.submitLabel}
    </Button>
  );

  const resetButton = cta.hideReset ? null : (
    <Button type="reset" variant="outline">
      {cta.resetLabel}
    </Button>
  );

  return (
    <div
      className={cn("form-block flex flex-row gap-2 @sm:gap-3", alignmentClass)}
    >
      {cta.reverse ? (
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
