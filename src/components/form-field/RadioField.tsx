import { getPropValue } from "@/lib/utils/fieldUtils";
import { FormField } from "@/types/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

interface RadioFieldProps {
  field: FormField;
}

const RadioField = ({ field }: RadioFieldProps) => {
  const alignment = getPropValue(field, "alignment") ?? "vertical";
  const options = getPropValue(field, "options") ?? [];

  return (
    <RadioGroup
      name={`radio-${field.id}`}
      alignment={alignment}
      className="px-6 py-2"
    >
      {options.map((option: string) => (
        <div key={option} className="flex items-center gap-2">
          <RadioGroupItem
            value={option}
            readOnly
            id={`${field.id}-${option}`}
          ></RadioGroupItem>
          <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export { RadioField };
