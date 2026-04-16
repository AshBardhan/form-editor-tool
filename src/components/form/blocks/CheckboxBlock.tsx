import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { ErrorMessages } from "@/components/form/ErrorMessages";
import { JSX } from "react";

interface CheckboxBlockProps {
  block: FormBlock;
  editable?: boolean;
  value?: boolean | string[];
  onChange?: (value: boolean | string[]) => void;
  errors?: string[];
}

/**
 * Checkbox Block
 * - Single mode (no options): Displays a checkbox with a label (value: boolean)
 * - Group mode (with options): Displays multiple checkboxes with labels (value: string[])
 *
 * @param {CheckboxBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const CheckboxBlock = ({
  block,
  editable = false,
  value,
  onChange,
  errors = [],
}: CheckboxBlockProps): JSX.Element => {
  const label = getPropValue(block, "label");
  const required = getPropValue(block, "required") || false;
  const options = (getPropValue(block, "options") ?? []) as string[];
  const orientation = (getPropValue(block, "orientation") ?? "vertical") as
    | "horizontal"
    | "vertical";

  // Group mode: has options array
  const isGroup = options.length > 0;

  if (isGroup) {
    const defaultValue = (getPropValue(block, "value") ?? []) as string[];
    const controlledValue = (value as string[] | undefined) ?? defaultValue;

    const handleCheckboxChange = (option: string, checked: boolean) => {
      const newValue = checked
        ? [...controlledValue, option]
        : controlledValue.filter((v) => v !== option);
      onChange?.(newValue as any);
    };

    return (
      <div className="form-block flex flex-col gap-4">
        {label && (
          <Label>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        <div
          className={`flex ${orientation === "horizontal" ? "flex-wrap gap-5" : "flex-col gap-3"}`}
        >
          {options.map((option: string) => (
            <div key={option} className="flex items-center gap-2">
              <Checkbox
                readOnly={!editable}
                checked={controlledValue.includes(option)}
                id={`checkbox-${block.id}-${option}`}
                tabIndex={editable ? 0 : -1}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              />
              <Label htmlFor={`checkbox-${block.id}-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
        <ErrorMessages errors={errors} />
      </div>
    );
  }

  // Single mode: no options (current behavior)
  const defaultValue = getPropValue(block, "checked") as boolean | undefined;
  const controlledValue =
    (value as boolean | undefined) ?? defaultValue ?? false;

  return (
    <div className="form-block flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Checkbox
          readOnly={!editable}
          checked={controlledValue}
          id={`checkbox-${block.id}`}
          tabIndex={editable ? 0 : -1}
          onChange={(e) => onChange?.(e.target.checked as any)}
        />
        <Label htmlFor={`checkbox-${block.id}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
      <ErrorMessages errors={errors} />
    </div>
  );
};
