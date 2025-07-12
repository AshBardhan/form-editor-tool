import { FormField } from "@/types/field";
import { Button } from "@/components/ui/Button";
import { getPropValue } from "@/lib/utils/fieldUtils";
import { cn } from "@/lib/utils";
import { JSX } from "react";

interface ButtonFieldProps {
  field: FormField;
}

/**
 * Maps field levels to button variants.
 */
const BUTTON_VARIANT_MAP: Record<string, "default" | "secondary"> = {
  primary: "default",
  secondary: "secondary",
};

/**
 * Maps field positions to CSS classes for horizontal alignment.
 */
const POSITION_CLASS_MAP: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

/**
 * Button Field
 * - Displays a button with title, variant, and alignment
 *
 * @param {ButtonFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ButtonField = ({ field }: ButtonFieldProps): JSX.Element => {
  const title = getPropValue(field, "title") ?? "Button";
  const levelRaw = getPropValue(field, "level") ?? "primary";
  const positionRaw = getPropValue(field, "position") ?? "left";

  const level = BUTTON_VARIANT_MAP[levelRaw] || "default";
  const alignmentClass = POSITION_CLASS_MAP[positionRaw] || "justify-start";

  return (
    <div className={cn("form-field flex", alignmentClass)}>
      <Button variant={level}>{title}</Button>
    </div>
  );
};

export { ButtonField };
