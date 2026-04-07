import { FormBlock } from "@/lib/types/form";
import { Button } from "@/components/ui/Button";
import { getPropValue } from "@/lib/utils/formUtils";
import { cn } from "@/lib/utils/styleUtils";
import { JSX } from "react";

interface ButtonBlockProps {
  block: FormBlock;
}

/**
 * Maps block levels to button variants.
 */
const BUTTON_VARIANT_MAP: Record<string, "default" | "secondary"> = {
  primary: "default",
  secondary: "secondary",
};

/**
 * Maps block positions to CSS classes for horizontal alignment.
 */
const POSITION_CLASS_MAP: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

/**
 * Button Block
 * - Displays a button with title, variant, and alignment
 *
 * @param {ButtonBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const ButtonBlock = ({ block }: ButtonBlockProps): JSX.Element => {
  const title = getPropValue(block, "title") ?? "Button";
  const levelRaw = getPropValue(block, "level") ?? "primary";
  const positionRaw = getPropValue(block, "position") ?? "left";

  const level = BUTTON_VARIANT_MAP[levelRaw as string as string] || "default";
  const alignmentClass =
    POSITION_CLASS_MAP[positionRaw as string as string] || "justify-start";

  return (
    <div className={cn("form-block flex", alignmentClass)}>
      <Button variant={level}>{title}</Button>
    </div>
  );
};
