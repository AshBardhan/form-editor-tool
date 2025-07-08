import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";

export const ParagraphField = ({ field }: { field: FormField }) => {
  return (
    <div className="py-2">
      <p>{getPropValue(field, "text")}</p>
    </div>
  );
};
