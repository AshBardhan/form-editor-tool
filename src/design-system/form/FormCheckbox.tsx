import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils/styleUtils";
import {
  Checkbox,
  CheckboxIndicator,
  Field,
  FieldLabel,
} from "@/design-system/primitives";

const checkboxVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center justify-center border bg-form-field text-form-fg-on-brand outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-offset-0 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      size: {
        md: "size-4 rounded-sm [&_svg]:size-3",
        lg: "size-5 rounded-md [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const rowVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      md: "gap-2",
      lg: "gap-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const labelVariants = cva(
  "inline-flex cursor-pointer items-center font-medium text-form-fg transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-70 data-[invalid]:text-form-error",
  {
    variants: {
      size: {
        md: "gap-1 text-sm leading-5",
        lg: "gap-1.5 text-lg leading-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>["size"]>;

export type FormCheckboxProps = {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  required?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
};

function isInvalid(ariaInvalid: FormCheckboxProps["aria-invalid"]) {
  return ariaInvalid === true || ariaInvalid === "true";
}

export function FormCheckbox({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  size = "md",
  required = false,
  disabled = false,
  indeterminate = false,
  name,
  id,
  value,
  className,
  "aria-invalid": ariaInvalid,
}: FormCheckboxProps) {
  const invalid = isInvalid(ariaInvalid);

  return (
    <Field
      disabled={disabled}
      invalid={invalid || undefined}
      data-slot="form-checkbox-field"
      className={rowVariants({ size })}
    >
      <Checkbox
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        indeterminate={indeterminate}
        aria-invalid={ariaInvalid}
        {...(checked !== undefined ? { checked } : {})}
        {...(defaultChecked !== undefined ? { defaultChecked } : {})}
        {...(onCheckedChange
          ? { onCheckedChange: (next: boolean) => onCheckedChange(next) }
          : {})}
        data-slot="form-checkbox"
        className={cn(checkboxVariants({ size }), className, {
          "border-form-error focus-visible:ring-form-error/30 data-checked:border-form-error data-checked:bg-form-error data-indeterminate:border-form-error data-indeterminate:bg-form-error":
            invalid,
          "border-form-field-border focus-visible:ring-form-brand/30 data-checked:border-form-brand data-checked:bg-form-brand data-indeterminate:border-form-brand data-indeterminate:bg-form-brand":
            !invalid,
          "hover:border-form-border-strong data-checked:hover:border-form-brand":
            !disabled && !invalid,
        })}
      >
        <CheckboxIndicator
          data-slot="form-checkbox-indicator"
          className="flex items-center justify-center"
        >
          {indeterminate ? (
            <Minus strokeWidth={3} />
          ) : (
            <Check strokeWidth={3} />
          )}
        </CheckboxIndicator>
      </Checkbox>
      {label ? (
        <FieldLabel
          data-slot="form-checkbox-label"
          className={labelVariants({ size })}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-form-error">
              *
            </span>
          ) : null}
        </FieldLabel>
      ) : null}
    </Field>
  );
}
