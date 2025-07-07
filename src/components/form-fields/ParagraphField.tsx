import { getPropValue } from "@/lib/utils/fieldUtils";
import { Field } from "@/types/field";

export const ParagraphField = ({ field }: { field: Field }) => {
  return (
    <div>
      <p>{getPropValue(field, "text")}</p>
    </div>
  );
};
