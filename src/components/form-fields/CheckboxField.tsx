import { getPropValue } from "@/lib/utils/fieldUtils";
import { Field } from "@/types/field";

export const CheckboxField = ({ field }: { field: Field }) => {
  return (
    <div className="flex gap-2 items-center">
      <input type="checkbox" />
      <label>{getPropValue(field, "label")}</label>
    </div>
  );
};
