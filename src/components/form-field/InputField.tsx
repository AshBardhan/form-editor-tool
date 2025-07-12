import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

interface InputFieldProps {
  field: FormField;
}

const InputField = ({ field }: InputFieldProps) => {
  return (
    <div className="form-field flex flex-col gap-2">
      {getPropValue(field, "label") && (
        <Label htmlFor={field.id}>{getPropValue(field, "label")}</Label>
      )}
      <Input
        id={field.id}
        type={field.type}
        readOnly
        required={Boolean(getPropValue(field, "required"))}
        placeholder={String(getPropValue(field, "placeholder"))}
      />
    </div>
  );
};

export { InputField };
