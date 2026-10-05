import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import {
  Field,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@/design-system/primitives";

const radioVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border bg-form-field outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-offset-0 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      size: {
        md: "size-4 [&_[data-slot=form-radio-indicator]]:size-2",
        lg: "size-5 [&_[data-slot=form-radio-indicator]]:size-2.5",
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
  "inline-flex cursor-pointer items-center font-medium text-form-fg transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-70",
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

const legendVariants = cva(
  "inline-flex items-center font-medium text-form-fg data-[invalid]:text-form-error group-data-disabled:opacity-70",
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

const optionsVariants = cva("flex", {
  variants: {
    orientation: {
      vertical: "flex-col gap-3",
      horizontal: "flex-row flex-wrap gap-x-5 gap-y-3",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

type RadioSize = NonNullable<VariantProps<typeof radioVariants>["size"]>;
type RadioOrientation = NonNullable<
  VariantProps<typeof optionsVariants>["orientation"]
>;

export type FormRadioOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type FormRadioGroupProps = {
  label?: ReactNode;
  options: FormRadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: RadioOrientation;
  size?: RadioSize;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
};

function isInvalid(ariaInvalid: FormRadioGroupProps["aria-invalid"]) {
  return ariaInvalid === true || ariaInvalid === "true";
}

export function FormRadioGroup({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  orientation = "vertical",
  size = "md",
  required = false,
  disabled = false,
  name,
  className,
  "aria-invalid": ariaInvalid,
}: FormRadioGroupProps) {
  const invalid = isInvalid(ariaInvalid);

  return (
    <Fieldset
      disabled={disabled}
      data-disabled={disabled || undefined}
      data-slot="form-radio-group"
      className={cn(
        "group m-0 flex min-w-0 flex-col gap-3 border-0 p-0",
        className,
      )}
    >
      {label ? (
        <FieldsetLegend
          data-slot="form-radio-group-legend"
          data-invalid={invalid || undefined}
          className={legendVariants({ size })}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-form-error">
              *
            </span>
          ) : null}
        </FieldsetLegend>
      ) : null}
      <RadioGroup
        name={name}
        disabled={disabled}
        required={required}
        aria-invalid={ariaInvalid}
        data-slot="form-radio-group-options"
        className={optionsVariants({ orientation })}
        {...(value !== undefined ? { value } : {})}
        {...(defaultValue !== undefined ? { defaultValue } : {})}
        {...(onValueChange
          ? { onValueChange: (next: string) => onValueChange(next) }
          : {})}
      >
        {options.map((option) => {
          const optionDisabled = disabled || Boolean(option.disabled);

          return (
            <Field
              key={option.value}
              disabled={optionDisabled}
              data-slot="form-radio-group-item"
              className={rowVariants({ size })}
            >
              <RadioGroupItem
                value={option.value}
                disabled={optionDisabled}
                aria-invalid={ariaInvalid}
                data-slot="form-radio"
                className={cn(radioVariants({ size }), {
                  "border-form-error text-form-error focus-visible:ring-form-error/30 data-checked:border-form-error":
                    invalid,
                  "border-form-field-border text-form-brand focus-visible:ring-form-brand/30 data-checked:border-form-brand":
                    !invalid,
                  "hover:border-form-border-strong data-checked:hover:border-form-brand":
                    !optionDisabled && !invalid,
                })}
              >
                <RadioGroupIndicator
                  data-slot="form-radio-indicator"
                  className="rounded-full bg-current"
                />
              </RadioGroupItem>
              <FieldLabel
                data-slot="form-radio-label"
                className={labelVariants({ size })}
              >
                {option.label}
              </FieldLabel>
            </Field>
          );
        })}
      </RadioGroup>
    </Fieldset>
  );
}
