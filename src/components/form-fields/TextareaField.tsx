import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

interface TextareaFieldProps {
  field: FormField;
}

const TextareaField = ({ field }: TextareaFieldProps) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {getPropValue(field, "label") && (
        <Label htmlFor={field.id}>{getPropValue(field, "label")}</Label>
      )}
      <Textarea
        id={field.id}
        className="resize-y"
        value={String(getPropValue(field, "value") || "")}
        placeholder={String(getPropValue(field, "placeholder"))}
        required={Boolean(getPropValue(field, "required"))}
        rows={Number(getPropValue(field, "rows") || 3)}
      />
    </div>
  );
};

export { TextareaField };
