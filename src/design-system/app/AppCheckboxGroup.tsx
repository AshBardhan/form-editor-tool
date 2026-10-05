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
  "inline-flex cursor-pointer items-center font-medium text-app-fg transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-70",
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

const legendVariants = cva(
  "inline-flex items-center font-medium text-app-fg data-[invalid]:text-app-error group-data-disabled:opacity-70",
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

export type AppCheckboxOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type AppCheckboxGroupProps = {
  label?: ReactNode;
  options: AppCheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  orientation?: CheckboxOrientation;
  size?: CheckboxSize;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
};

function isInvalid(ariaInvalid: AppCheckboxGroupProps["aria-invalid"]) {
  return ariaInvalid === true || ariaInvalid === "true";
}

export function AppCheckboxGroup({
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
}: AppCheckboxGroupProps) {
  const invalid = isInvalid(ariaInvalid);

  return (
    <Fieldset
      disabled={disabled}
      data-disabled={disabled || undefined}
      data-slot="app-checkbox-group"
      className={cn(
        "group m-0 flex min-w-0 flex-col gap-3 border-0 p-0",
        className,
      )}
    >
      {label ? (
        <FieldsetLegend
          data-slot="app-checkbox-group-legend"
          data-invalid={invalid || undefined}
          className={legendVariants({ size })}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-app-error">
              *
            </span>
          ) : null}
        </FieldsetLegend>
      ) : null}
      <CheckboxGroup
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-required={required || undefined}
        data-slot="app-checkbox-group-options"
        className={optionsVariants({ orientation })}
        {...(value !== undefined ? { value } : {})}
        {...(defaultValue !== undefined ? { defaultValue } : {})}
        {...(onValueChange
          ? {
              onValueChange: (next: string[]) => onValueChange(next),
            }
          : {})}
      >
        {options.map((option) => {
          const optionDisabled = disabled || Boolean(option.disabled);

          return (
            <Field
              key={option.value}
              disabled={optionDisabled}
              data-slot="app-checkbox-group-item"
              className={rowVariants({ size })}
            >
              <Checkbox
                name={name}
                value={option.value}
                disabled={optionDisabled}
                aria-invalid={ariaInvalid}
                data-slot="app-checkbox"
                className={cn(checkboxVariants({ size }), {
                  "border-app-error focus-visible:ring-app-error/30 data-checked:border-app-error data-checked:bg-app-error":
                    invalid,
                  "border-app-border-subtle focus-visible:ring-app-brand/30 data-checked:border-app-brand data-checked:bg-app-brand":
                    !invalid,
                  "hover:border-app-border-strong data-checked:hover:border-app-brand":
                    !optionDisabled && !invalid,
                })}
              >
                <CheckboxIndicator
                  data-slot="app-checkbox-indicator"
                  className="flex items-center justify-center"
                >
                  <Check strokeWidth={3} />
                </CheckboxIndicator>
              </Checkbox>
              <FieldLabel
                data-slot="app-checkbox-label"
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
