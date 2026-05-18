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
   * Styles for different heading levels with mobile-first responsive typography.
   * Mobile (base) -> Tablet (@sm ≥384px) -> Desktop (@5xl ≥1024px)
   */
  const headingStyles: Record<number, string> = {
    1: "text-2xl @sm:text-3xl @5xl:text-4xl font-bold",
    2: "text-xl @sm:text-2xl @5xl:text-3xl font-bold",
    3: "text-lg @sm:text-xl @5xl:text-2xl font-bold",
    4: "text-base @sm:text-lg @5xl:text-xl font-semibold",
    5: "text-sm @sm:text-base @5xl:text-lg font-semibold",
    6: "text-xs @sm:text-sm @5xl:text-base font-semibold",
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
