import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/form-field";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { JSX } from "react";

interface CheckboxFieldProps {
  field: FormField;
}

/**
 * Checkbox Field
 * - Displays a checkbox and a label, with the label text
 *
 * @param {CheckboxFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const CheckboxField = ({ field }: CheckboxFieldProps): JSX.Element => {
  return (
    <div className="form-field flex gap-2 items-center">
      <Checkbox readOnly id={`checkbox-${field.id}`} tabIndex={-1} />
      <Label htmlFor={`checkbox-${field.id}`}>
        {getPropValue(field, "label")}
      </Label>
    </div>
  );
};

export { CheckboxField };
