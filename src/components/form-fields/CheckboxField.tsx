import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

interface CheckboxFieldProps {
  field: FormField;
}

const CheckboxField = ({ field }: CheckboxFieldProps) => {
  return (
    <div className="flex gap-2 items-center py-2">
      <Checkbox id={field.id} className="size-5 border-[#bcbcbc]" />
      <Label htmlFor={field.id} className="font-medium text-[#777777]">
        {getPropValue(field, "label")}
      </Label>
    </div>
  );
};

export { CheckboxField };
