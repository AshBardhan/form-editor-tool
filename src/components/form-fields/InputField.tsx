import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

interface InputFieldProps {
  field: FormField;
}

const InputField = ({ field }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {getPropValue(field, "label") && (
        <Label htmlFor={field.id} className="font-medium text-[#777777]">
          {getPropValue(field, "label")}
        </Label>
      )}
      <Input
        id={field.id}
        type={field.type}
        className="border-[#bcbcbc]"
        required={Boolean(getPropValue(field, "required"))}
        placeholder={String(getPropValue(field, "placeholder"))}
      />
    </div>
  );
};

export { InputField };
