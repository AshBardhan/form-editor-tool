import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";

interface InputFieldProps {
  field: FormField;
}

const InputField = ({ field }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {getPropValue(field, "label") && (
        <Label htmlFor={field.id} className="font-semibold">
          {getPropValue(field, "label")}
        </Label>
      )}
      <Input
        id={field.id}
        type={field.type}
        required={Boolean(getPropValue(field, "required"))}
        placeholder={String(getPropValue(field, "placeholder"))}
        disabled
      />
    </div>
  );
};

export { InputField };
