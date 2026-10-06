import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/styleUtils";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  Field,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
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

type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>["size"]>;
type CheckboxOrientation = NonNullable<
  VariantProps<typeof optionsVariants>["orientation"]
>;

export type FormCheckboxOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type FormCheckboxGroupProps = {
  label?: ReactNode;
  options: FormCheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  orientation?: CheckboxOrientation;
  size?: CheckboxSize;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  className?: string;
  tabIndex?: number;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
};

function isInvalid(ariaInvalid: FormCheckboxGroupProps["aria-invalid"]) {
  return ariaInvalid === true || ariaInvalid === "true";
}

export function FormCheckboxGroup({
  label,
  options,
  value = [],
  defaultValue = [],
  onValueChange = () => {},
  orientation = "vertical",
  size = "md",
  required = false,
  disabled = false,
  name,
  className,
  tabIndex,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: FormCheckboxGroupProps) {
  const invalid = isInvalid(ariaInvalid);

  return (
    <Fieldset
      disabled={disabled}
      data-disabled={disabled || undefined}
      aria-describedby={ariaDescribedBy}
      data-slot="form-checkbox-group"
      className={cn(
        "group m-0 flex min-w-0 flex-col gap-3 border-0 p-0",
        className,
      )}
    >
      {label ? (
        <FieldsetLegend
          data-slot="form-checkbox-group-legend"
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
      <CheckboxGroup
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-required={required || undefined}
        aria-describedby={ariaDescribedBy}
        data-slot="form-checkbox-group-options"
        className={optionsVariants({ orientation })}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        {options.map((option) => {
          const optionDisabled = disabled || Boolean(option.disabled);

          return (
            <Field
              key={option.value}
              disabled={optionDisabled}
              data-slot="form-checkbox-group-item"
              className={rowVariants({ size })}
            >
              <Checkbox
                name={name}
                value={option.value}
                disabled={optionDisabled}
                tabIndex={tabIndex}
                aria-invalid={ariaInvalid}
                data-slot="form-checkbox"
                className={cn(checkboxVariants({ size }), {
                  "border-form-error focus-visible:ring-form-error/30 data-checked:border-form-error data-checked:bg-form-error":
                    invalid,
                  "border-form-field-border focus-visible:ring-form-brand/30 data-checked:border-form-brand data-checked:bg-form-brand":
                    !invalid,
                  "hover:border-form-border-strong data-checked:hover:border-form-brand":
                    !optionDisabled && !invalid,
                })}
              >
                <CheckboxIndicator
                  data-slot="form-checkbox-indicator"
                  className="flex items-center justify-center"
                >
                  <Check strokeWidth={3} />
                </CheckboxIndicator>
              </Checkbox>
              <FieldLabel
                data-slot="form-checkbox-label"
                className={labelVariants({ size })}
              >
                {option.label}
              </FieldLabel>
            </Field>
          );
        })}
      </CheckboxGroup>
    </Fieldset>
  );
}
