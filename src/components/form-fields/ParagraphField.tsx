import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";

interface ParagraphFieldProps {
  field: FormField;
}

const ParagraphField = ({ field }: ParagraphFieldProps) => {
  return (
    <div className="py-2 text-[#4a4a4a]">
      <p>{getPropValue(field, "text")}</p>
    </div>
  );
};

export { ParagraphField };
