import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Label } from "../ui/Label";

interface TextareaFieldProps {
  field: FormField;
}

const TextareaField = ({ field }: TextareaFieldProps) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {getPropValue(field, "label") && (
        <Label htmlFor={field.id} className="font-semibold">
          {getPropValue(field, "label")}
        </Label>
      )}
      <textarea
        id={field.id}
        placeholder={String(getPropValue(field, "placeholder"))}
        required={Boolean(getPropValue(field, "required"))}
        rows={Number(getPropValue(field, "rows") || 3)}
        disabled
        className="border rounded px-2 py-1 w-full"
      />
    </div>
  );
};

export { TextareaField };
