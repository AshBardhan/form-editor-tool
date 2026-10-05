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
  "peer inline-flex shrink-0 cursor-pointer items-center justify-center border bg-app-surface text-app-fg-on-brand outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-offset-0 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-3.5 rounded-sm [&_svg]:size-2.5",
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
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const labelVariants = cva(
  "inline-flex cursor-pointer items-center font-medium text-app-fg transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-70 data-[invalid]:text-app-error",
  {
    variants: {
      size: {
        sm: "gap-1 text-xs leading-4",
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

export type AppCheckboxProps = {
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

function isInvalid(ariaInvalid: AppCheckboxProps["aria-invalid"]) {
  return ariaInvalid === true || ariaInvalid === "true";
}

export function AppCheckbox({
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
}: AppCheckboxProps) {
  const invalid = isInvalid(ariaInvalid);

  return (
    <Field
      disabled={disabled}
      invalid={invalid || undefined}
      data-slot="app-checkbox-field"
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
        data-slot="app-checkbox"
        className={cn(checkboxVariants({ size }), className, {
          "border-app-error focus-visible:ring-app-error/30 data-checked:border-app-error data-checked:bg-app-error data-indeterminate:border-app-error data-indeterminate:bg-app-error":
            invalid,
          "border-app-border-subtle focus-visible:ring-app-brand/30 data-checked:border-app-brand data-checked:bg-app-brand data-indeterminate:border-app-brand data-indeterminate:bg-app-brand":
            !invalid,
          "hover:border-app-border-strong data-checked:hover:border-app-brand":
            !disabled && !invalid,
        })}
      >
        <CheckboxIndicator
          data-slot="app-checkbox-indicator"
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
          data-slot="app-checkbox-label"
          className={labelVariants({ size })}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-app-error">
              *
            </span>
          ) : null}
        </FieldLabel>
      ) : null}
    </Field>
  );
}
