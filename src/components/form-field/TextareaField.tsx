import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { JSX } from "react";

interface TextareaFieldProps {
  field: FormField;
}

/**
 * Textarea Field
 * - Displays a textarea element with an optional label
 *
 * @param {TextareaFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const TextareaField = ({ field }: TextareaFieldProps): JSX.Element => {
  return (
    <div className="form-field flex flex-col gap-2">
      {getPropValue(field, "label") && (
        <Label htmlFor={`textarea-${field.id}`}>
          {getPropValue(field, "label")}
        </Label>
      )}
      <Textarea
        id={`textarea-${field.id}`}
        className="resize-y"
        readOnly
        tabIndex={-1}
        value={String(getPropValue(field, "value") || "")}
        placeholder={String(getPropValue(field, "placeholder"))}
        required={Boolean(getPropValue(field, "required"))}
        rows={Number(getPropValue(field, "rows") || 3)}
      />
    </div>
  );
};

export { TextareaField };
