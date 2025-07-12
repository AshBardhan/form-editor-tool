import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";

interface ParagraphFieldProps {
  field: FormField;
}

const ParagraphField = ({ field }: ParagraphFieldProps) => {
  return (
    <div className="form-field text-paragraph dark:text-white transition-colors">
      <p>{getPropValue(field, "text")}</p>
    </div>
  );
};

export { ParagraphField };
