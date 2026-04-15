import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import { ErrorMessages } from "@/components/form/ErrorMessages";
import { JSX } from "react";

interface RadioBlockProps {
  block: FormBlock;
  editable?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  errors?: string[];
}

/**
 * Radio Block
 * - Displays a group of radio buttons with labels
 *
 * @param {RadioBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const RadioBlock = ({
  block,
  editable = false,
  value,
  onChange,
  errors = [],
}: RadioBlockProps): JSX.Element => {
  const alignment = (getPropValue(block, "alignment") ?? "vertical") as
    | "horizontal"
    | "vertical";
  const options = (getPropValue(block, "options") ?? []) as string[];
  const defaultValue = getPropValue(block, "value") as string | undefined;
  const controlledValue = value ?? defaultValue;

  return (
    <div className="form-block flex flex-col gap-2">
      <RadioGroup
        name={`radio-${block.id}`}
        value={controlledValue}
        alignment={alignment}
        onValueChange={onChange}
      >
        {options.map((option: string) => (
          <div key={option} className="flex items-center gap-2">
            <RadioGroupItem
              value={option}
              readOnly={!editable}
              tabIndex={editable ? 0 : -1}
              id={`radio-${block.id}-${option}`}
            ></RadioGroupItem>
            <Label htmlFor={`radio-${block.id}-${option}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <ErrorMessages errors={errors} />
    </div>
  );
};
