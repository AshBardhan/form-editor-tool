import { getFieldKey, getPropValue } from "@/lib/utils/formUtils";
import { FormBlock, FormBlockOrientation } from "@/lib/types/form";
import { FormCheckbox } from "@/design-system/form/FormCheckbox";
import { FormCheckboxGroup } from "@/design-system/form/FormCheckboxGroup";
import { FormError } from "@/design-system/form/FormError";
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
  const required = Boolean(getPropValue(block, "required"));
  const grouped = Boolean(getPropValue(block, "grouped"));
  const options = (getPropValue(block, "options") ?? []) as string[];
  const orientation = (getPropValue(block, "orientation") ??
    "vertical") as FormBlockOrientation;
  const fieldName = getFieldKey(block);
  const errorId = `checkbox-${block.id}-error`;
  const invalid = errors.length > 0;
  const isGroup = grouped || options.length > 0;

  if (isGroup) {
    const rawDefaultValue = getPropValue(block, "value");
    const defaultValue = Array.isArray(rawDefaultValue) ? rawDefaultValue : [];
    const controlledValue = Array.isArray(value) ? value : defaultValue;

    return (
      <div className="form-block flex flex-col gap-3 @sm:gap-4">
        <FormCheckboxGroup
          label={label || undefined}
          name={fieldName}
          options={options.map((option) => ({
            value: option,
            label: option,
          }))}
          value={controlledValue}
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
  }

  const defaultValue = Boolean(getPropValue(block, "value"));
  const controlledValue = (value as boolean | undefined) ?? defaultValue;

  return (
    <div className="form-block flex flex-col gap-1.5 @sm:gap-2">
      <FormCheckbox
        id={`checkbox-${block.id}`}
        name={fieldName}
        label={label || undefined}
        checked={controlledValue}
        required={required}
        disabled={!editable}
        tabIndex={editable ? 0 : -1}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        onCheckedChange={(checked) => onChange?.(checked)}
      />
      <FormError id={errorId} errors={errors} />
    </div>
  );
};
