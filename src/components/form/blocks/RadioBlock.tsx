import { getPropValue } from "@/lib/utils/formUtils";
import { FormBlock, FormBlockOrientation } from "@/lib/types/form";
import { FormRadioGroup } from "@/design-system/form/FormRadioGroup";
import { FormError } from "@/design-system/form/FormError";
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
  const label = getPropValue(block, "label") || "Option";
  const groupName = (getPropValue(block, "key") ||
    `radio_${block.id}`) as string;
  const options = (getPropValue(block, "options") ?? [
    "Option 1",
    "Option 2",
  ]) as string[];
  const required = Boolean(getPropValue(block, "required"));
  const orientation = (getPropValue(block, "orientation") ??
    "vertical") as FormBlockOrientation;
  const defaultValue = getPropValue(block, "value") as string | undefined;
  const controlledValue = value ?? defaultValue;
  const errorId = `radio-${block.id}-error`;
  const invalid = errors.length > 0;

  return (
    <div className="form-block flex flex-col gap-3 @sm:gap-4">
      <FormRadioGroup
        label={label}
        name={groupName}
        options={options.map((option) => ({
          value: option,
          label: option,
        }))}
        {...(controlledValue !== undefined ? { value: controlledValue } : {})}
        orientation={orientation}
        required={required}
        disabled={!editable}
        tabIndex={editable ? 0 : -1}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        onValueChange={(next) => onChange?.(next)}
      />
      <FormError id={errorId} errors={errors} />
    </div>
  );
};
