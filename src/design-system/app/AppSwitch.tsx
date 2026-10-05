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
  "inline-flex shrink-0 cursor-pointer items-center rounded-full bg-app-border-strong px-0.5 shadow-xs outline-none transition-colors duration-150 ease-[ease] focus-visible:ring-[3px] focus-visible:ring-offset-0 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
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
  "pointer-events-none block rounded-full bg-app-surface shadow-sm transition-[translate] duration-150 ease-[ease]",
  {
    variants: {
      size: {
        sm: "size-3 data-checked:translate-x-3",
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
  "inline-flex cursor-pointer items-center font-medium text-app-fg transition-colors group-data-disabled:cursor-not-allowed group-data-disabled:opacity-70 data-[invalid]:text-app-error",
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

type SwitchSize = NonNullable<VariantProps<typeof switchVariants>["size"]>;

export type AppSwitchProps = {
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

function isInvalid(ariaInvalid: AppSwitchProps["aria-invalid"]) {
  return ariaInvalid === true || ariaInvalid === "true";
}

export function AppSwitch({
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
}: AppSwitchProps) {
  const invalid = isInvalid(ariaInvalid);
  const labelNode = label ? (
    <FieldLabel data-slot="app-switch-label" className={labelVariants({ size })}>
      {label}
      {required ? (
        <span aria-hidden="true" className="text-app-error">
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
      data-slot="app-switch-field"
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
        data-slot="app-switch"
        className={cn(switchVariants({ size }), className, {
          "bg-app-error/30 focus-visible:ring-app-error/30 data-checked:bg-app-error":
            invalid,
          "focus-visible:ring-app-brand/30 data-checked:bg-app-brand":
            !invalid,
        })}
      >
        <SwitchThumb
          data-slot="app-switch-thumb"
          className={thumbVariants({ size })}
        />
      </Switch>
      {labelNode}
    </Field>
  );
}
