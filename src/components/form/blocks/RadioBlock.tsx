import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock, FormBlockOrientation } from "@/lib/types/form";
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
  // Default values for new blocks
  const label = getPropValue(block, "label") || "Option";
  // If key is missing, generate a unique key using block.id (used for group name)
  const groupName = (getPropValue(block, "key") ||
    `radio_${block.id}`) as string;
  // Default options if missing
  const options = (getPropValue(block, "options") ?? [
    "Option 1",
    "Option 2",
  ]) as string[];
  const required = getPropValue(block, "required") || false;
  const orientation = (getPropValue(block, "orientation") ??
    "vertical") as FormBlockOrientation;
  const defaultValue = getPropValue(block, "value") as string | undefined;
  const controlledValue = value ?? defaultValue;

  return (
    <div className="form-block flex flex-col gap-3 @sm:gap-4">
      {label && (
        <Label>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <RadioGroup
        name={groupName}
        value={controlledValue}
        orientation={orientation}
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
