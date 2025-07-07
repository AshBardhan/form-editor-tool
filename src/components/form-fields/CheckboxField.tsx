import { getPropValue } from "@/lib/utils/fieldUtils";
import { Field } from "@/types/field";
import { Checkbox } from "../ui/Checkbox";
import { Label } from "../ui/Label";

export const CheckboxField = ({ field }: { field: Field }) => {
  return (
    <div className="flex gap-2 items-center py-2">
      <Checkbox id={field.id} />
      <Label htmlFor={field.id} className="font-semibold">
        {getPropValue(field, "label")}
      </Label>
    </div>
  );
};
