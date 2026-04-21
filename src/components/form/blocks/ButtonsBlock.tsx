import { FormBlock } from "@/lib/types/form";
import { Button } from "@/components/ui/Button";
import { getPropValue } from "@/lib/utils/formUtils";
import { cn } from "@/lib/utils/styleUtils";
import { JSX } from "react";

interface ButtonsBlockProps {
  block: FormBlock;
}

/**
 * Maps theme names to button variants.
 */
const BUTTON_THEME_MAP: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  destructive: "destructive",
};

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
 * Buttons Block
 * - Displays two buttons (submit and reset) with configurable labels, themes, and alignment
 * - Supports four alignment options: left, right, center, justified
 *
 * @param {ButtonsBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const ButtonsBlock = ({ block }: ButtonsBlockProps): JSX.Element => {
  const submitLabel = getPropValue(block, "submitLabel") ?? "Submit";
  const submitTheme = getPropValue(block, "submitTheme") ?? "primary";
  const resetLabel = getPropValue(block, "resetLabel") ?? "Reset";
  const resetTheme = getPropValue(block, "resetTheme") ?? "outline";
  const alignment = getPropValue(block, "alignment") ?? "left";
  const reverse = Boolean(getPropValue(block, "reverse"));

  const submitButtonVariant =
    BUTTON_THEME_MAP[submitTheme as string] || "default";
  const resetButtonVariant =
    BUTTON_THEME_MAP[resetTheme as string] || "outline";
  const alignmentClass =
    ALIGNMENT_CLASS_MAP[alignment as string] || "justify-start";

  const submitButton = (
    <Button type="submit" variant={submitButtonVariant}>
      {submitLabel}
    </Button>
  );

  const resetButton = (
    <Button type="reset" variant={resetButtonVariant}>
      {resetLabel}
    </Button>
  );

  return (
    <div
      className={cn(
        "form-block flex flex-col @sm:flex-row gap-2 @sm:gap-3",
        alignmentClass,
      )}
    >
      {reverse ? (
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
