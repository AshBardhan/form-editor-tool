import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/form.types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import { JSX } from "react";

interface RadioFieldProps {
  field: FormField;
}

/**
 * Radio Field
 * - Displays a group of radio buttons with labels
 *
 * @param {RadioFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const RadioField = ({ field }: RadioFieldProps): JSX.Element => {
  const alignment = (getPropValue(field, "alignment") ?? "vertical") as
    | "horizontal"
    | "vertical";
  const options = (getPropValue(field, "options") ?? []) as string[];

  return (
    <RadioGroup
      name={`radio-${field.id}`}
      alignment={alignment}
      className="form-field"
    >
      {options.map((option: string) => (
        <div key={option} className="flex items-center gap-2">
          <RadioGroupItem
            value={option}
            readOnly
            tabIndex={-1}
            id={`radio-${field.id}-${option}`}
          ></RadioGroupItem>
          <Label htmlFor={`radio-${field.id}-${option}`}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export { RadioField };
