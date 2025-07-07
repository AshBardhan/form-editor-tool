import { getPropValue } from "@/lib/utils/fieldUtils";
import { Field } from "@/types/field";

export const ParagraphField = ({ field }: { field: Field }) => {
  return (
    <div className="py-2">
      <p>{getPropValue(field, "text")}</p>
    </div>
  );
};
