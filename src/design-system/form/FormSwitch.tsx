import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import {
  Field,
  FieldLabel,
  Switch,
  SwitchThumb,
} from "@/design-system/primitives";

const switchVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center rounded-full bg-form-border-subtle px-0.5 shadow-xs outline-none transition-colors duration-150 ease-[ease] focus-visible:ring-[3px] focus-visible:ring-offset-0 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      size: {
        md: "h-5 w-9",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-form-surface shadow-sm transition-[translate] duration-150 ease-[ease]",
  {
    variants: {
      size: {
        md: "size-4 data-checked:translate-x-4",
        lg: "size-5 data-checked:translate-x-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const rowVariants = cva("group inline-flex items-center", {
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
  "inline-flex cursor-pointer items-center font-medium text-form-fg transition-colors group-data-disabled:cursor-not-allowed group-data-disabled:opacity-70 data-[invalid]:text-form-error",
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

type SwitchSize = NonNullable<VariantProps<typeof switchVariants>["size"]>;

export type FormSwitchProps = {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
};

function isInvalid(ariaInvalid: FormSwitchProps["aria-invalid"]) {
  return ariaInvalid === true || ariaInvalid === "true";
}

export function FormSwitch({
  label,
  checked = false,
  defaultChecked = false,
  onCheckedChange = () => {},
  size = "md",
  required = false,
  disabled = false,
  readOnly = false,
  name,
  id,
  value,
  className,
  "aria-invalid": ariaInvalid,
}: FormSwitchProps) {
  const invalid = isInvalid(ariaInvalid);
  const labelNode = label ? (
    <FieldLabel
      data-slot="form-switch-label"
      className={labelVariants({ size })}
    >
      {label}
      {required ? (
        <span aria-hidden="true" className="text-form-error">
          *
        </span>
      ) : null}
    </FieldLabel>
  ) : null;

  return (
    <Field
      disabled={disabled}
      invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-slot="form-switch-field"
      className={rowVariants({ size })}
    >
      <Switch
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-invalid={ariaInvalid}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        data-slot="form-switch"
        className={cn(switchVariants({ size }), className, {
          "bg-form-error/30 focus-visible:ring-form-error/30 data-checked:bg-form-error":
            invalid,
          "focus-visible:ring-form-brand/30 data-checked:bg-form-brand":
            !invalid,
        })}
      >
        <SwitchThumb
          data-slot="form-switch-thumb"
          className={thumbVariants({ size })}
        />
      </Switch>
      {labelNode}
    </Field>
  );
}
