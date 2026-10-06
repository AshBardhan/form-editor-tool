import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { FormText } from "@/design-system/form/FormText";
import { type TextVariant } from "@/design-system/primitives";
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
  const variant = `h${level}` as TextVariant;

  return (
    <div className="form-block flex flex-col">
      <FormText variant={variant}>{text}</FormText>
    </div>
  );
};
