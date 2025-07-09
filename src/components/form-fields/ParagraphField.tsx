import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";

interface ParagraphFieldProps {
  field: FormField;
}

const ParagraphField = ({ field }: ParagraphFieldProps) => {
  return (
    <div className="py-2 text-paragraph">
      <p>{getPropValue(field, "text")}</p>
    </div>
  );
};

export { ParagraphField };
