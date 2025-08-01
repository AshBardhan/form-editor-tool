import { getPropValue } from "@/lib/utils/fieldUtils";
import { cn } from "@/lib/utils/styleUtils";
import { FormField } from "@/types/field";
import { JSX } from "react";

interface HeadingFieldProps {
  field: FormField;
}

/**
 * Heading Field component
 * - Displays a heading element with a level and text
 *
 * @param {HeadingFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const HeadingField = ({ field }: HeadingFieldProps): JSX.Element => {
  const text = getPropValue(field, "text");
  const level = Math.min(
    Math.max((getPropValue(field, "level") as number) || 1, 1),
    6,
  );

  /**
   * Styles for different heading levels.
   */
  const headingStyles: Record<number, string> = {
    1: "text-3xl font-bold",
    2: "text-2xl font-bold",
    3: "text-xl font-bold",
    4: "text-lg font-semibold",
    5: "text-base font-semibold",
    6: "text-sm font-semibold",
  };

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingTag
      className={cn(
        "form-field text-heading dark:text-white transition-colors",
        headingStyles[level],
      )}
    >
      {text}
    </HeadingTag>
  );
};

export { HeadingField };
