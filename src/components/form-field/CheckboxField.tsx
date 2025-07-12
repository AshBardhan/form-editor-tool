import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

interface CheckboxFieldProps {
  field: FormField;
}

const CheckboxField = ({ field }: CheckboxFieldProps) => {
  return (
    <div className="form-field flex gap-2 items-center">
      <Checkbox readOnly id={field.id} />
      <Label htmlFor={field.id}>{getPropValue(field, "label")}</Label>
    </div>
  );
};

export { CheckboxField };
