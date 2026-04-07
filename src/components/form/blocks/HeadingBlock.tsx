import { getPropValue } from "@/lib/utils/formUtils";
import { cn } from "@/lib/utils/styleUtils";
import { FormBlock } from "@/lib/types/form";
import { JSX } from "react";

interface HeadingBlockProps {
  block: FormBlock;
}

/**
 * Heading Block component
 * - Displays a heading element with a level and text
 *
 * @param {HeadingBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const HeadingBlock = ({ block }: HeadingBlockProps): JSX.Element => {
  const text = getPropValue(block, "text");
  const level = Math.min(
    Math.max((getPropValue(block, "level") as number) || 1, 1),
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
        "form-block text-heading dark:text-white transition-colors",
        headingStyles[level],
      )}
    >
      {text}
    </HeadingTag>
  );
};
