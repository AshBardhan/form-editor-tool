import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { JSX } from "react";

interface ParagraphBlockProps {
  block: FormBlock;
}

/**
 * Paragraph Block
 * - Renders a paragraph element with the provided text content.
 *
 * @param {ParagraphBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const ParagraphBlock = ({ block }: ParagraphBlockProps): JSX.Element => {
  return (
    <div className="form-block text-paragraph dark:text-white transition-colors">
      <p>{getPropValue(block, "text")}</p>
    </div>
  );
};
