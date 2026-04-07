import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/form.types";
import { JSX } from "react";

interface ParagraphFieldProps {
  field: FormField;
}

/**
 * Paragraph Field
 * - Renders a paragraph element with the provided text content.
 *
 * @param {ParagraphFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ParagraphField = ({ field }: ParagraphFieldProps): JSX.Element => {
  return (
    <div className="form-field text-paragraph dark:text-white transition-colors">
      <p>{getPropValue(field, "text")}</p>
    </div>
  );
};

export { ParagraphField };
