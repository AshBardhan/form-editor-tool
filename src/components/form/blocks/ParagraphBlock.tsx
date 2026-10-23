import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { FormText } from "@/design-system/form/FormText";
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
  const text = getPropValue(block, "text");

  return (
    <div className="form-block flex flex-col">
      <FormText variant="p">{text}</FormText>
    </div>
  );
};
