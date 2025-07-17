import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { JSX } from "react";

interface InputFieldProps {
  field: FormField;
}

/**
 * Input Field component
 * - Displays an input element with an optional label
 *
 * @param {InputFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const InputField = ({ field }: InputFieldProps): JSX.Element => {
  return (
    <div className="form-field flex flex-col gap-2">
      {getPropValue(field, "label") && (
        <Label htmlFor={`input-${field.id}`}>
          {getPropValue(field, "label")}
        </Label>
      )}
      <Input
        id={`input-${field.id}`}
        type={field.type}
        readOnly
        tabIndex={-1}
        required={Boolean(getPropValue(field, "required"))}
        placeholder={String(getPropValue(field, "placeholder"))}
      />
    </div>
  );
};

export { InputField };
