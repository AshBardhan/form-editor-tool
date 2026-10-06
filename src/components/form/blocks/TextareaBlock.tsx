import { getFieldKey, getPropValue } from "@/lib/utils/formUtils";
import { FormBlock } from "@/lib/types/form";
import { FormLabel } from "@/design-system/form/FormLabel";
import { FormTextArea } from "@/design-system/form/FormTextArea";
import { FormError } from "@/design-system/form/FormError";
import { JSX } from "react";

interface TextareaBlockProps {
  block: FormBlock;
  editable?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  errors?: string[];
}

/**
 * Textarea Block
 * - Displays a textarea element with an optional label
 *
 * @param {TextareaBlockProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const TextareaBlock = ({
  block,
  editable = false,
  value,
  onChange,
  errors = [],
}: TextareaBlockProps): JSX.Element => {
  const label = getPropValue(block, "label");
  const required = Boolean(getPropValue(block, "required"));
  const placeholder = String(getPropValue(block, "placeholder") ?? "");
  const rows = Number(getPropValue(block, "rows") || 3);
  const defaultValue = getPropValue(block, "value") as string | undefined;
  const controlledValue = value ?? defaultValue ?? "";
  const fieldName = getFieldKey(block);
  const textareaId = `textarea-${block.id}`;
  const errorId = `${textareaId}-error`;
  const invalid = errors.length > 0;
  const maxLengthProp = getPropValue(block, "maxLength");
  const maxLength =
    typeof maxLengthProp === "number" ? maxLengthProp : undefined;

  return (
    <div className="form-block flex flex-col gap-1.5 @sm:gap-2">
      {label ? (
        <FormLabel
          htmlFor={textareaId}
          required={required}
          aria-invalid={invalid}
        >
          {label}
        </FormLabel>
      ) : null}
      <FormTextArea
        id={textareaId}
        name={fieldName}
        className="resize-y"
        disabled={!editable}
        tabIndex={editable ? 0 : -1}
        value={controlledValue}
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <FormError id={errorId} errors={errors} />
    </div>
  );
};
