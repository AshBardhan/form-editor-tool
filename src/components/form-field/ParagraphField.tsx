import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";

interface ParagraphFieldProps {
  field: FormField;
}

const ParagraphField = ({ field }: ParagraphFieldProps) => {
  return (
    <div className="px-6 py-2 text-paragraph dark:text-white transition-colors">
      <p>{getPropValue(field, "text")}</p>
    </div>
  );
};

export { ParagraphField };
