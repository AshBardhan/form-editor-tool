import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectPositioner,
  SelectPopup,
  SelectScrollUpArrow,
  SelectList,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectScrollDownArrow,
} from "@/design-system/primitives";

export type FormSelectOption = {
  value: string;
  label?: string;
  disabled?: boolean;
  [field: string]: string | number | boolean | null | undefined;
};

export type FormSelectProps = {
  items: FormSelectOption[];
  labelKey?: string;
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  size?: "md" | "lg";
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
};

const selectTriggerVariants = cva(
  "inline-flex items-center justify-between w-full font-medium transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-[3px] focus-visible:ring-offset-0 border border-form-field-border bg-form-field text-form-fg rounded-md focus-visible:ring-form-brand/30",
  {
    variants: {
      size: {
        md: "h-8 px-3 py-1 text-sm leading-5 gap-1.5 [&_svg]:size-3.5",
        lg: "h-12 px-4 py-2.5 text-lg leading-6 gap-2 [&_svg]:size-4.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const selectPopupVariants = cva(
  "z-50 min-w-50 w-(--anchor-width) rounded-md border border-form-border-subtle bg-form-surface text-form-fg shadow-lg overflow-y-auto max-h-64",
);

const selectItemVariants = cva(
  "relative flex items-center outline-none select-none cursor-pointer transition-colors data-[highlighted]:bg-form-surface-muted data-[selected]:bg-form-brand-subtle data-[selected]:text-form-brand data-[highlighted]:data-[selected]:bg-form-brand-subtle data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
  {
    variants: {
      size: {
        md: "gap-1.5 px-3 py-1.5 text-sm leading-5 [&_svg]:size-3.5",
        lg: "gap-2 px-4 py-3 text-lg leading-6 [&_svg]:size-4.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function optionLabel(item: FormSelectOption, labelKey: string) {
  const fromKey = item[labelKey];
  if (typeof fromKey === "string" || typeof fromKey === "number") {
    return String(fromKey);
  }
  return item.label ?? item.value;
}

function toSelectValue(value: string | null) {
  return value === "" ? null : value;
}

export function FormSelect({
  items,
  labelKey = "label",
  value,
  onValueChange,
  placeholder = "Choose option",
  size = "md",
  required = false,
  disabled = false,
  className,
  name,
  id,
}: FormSelectProps) {
  const options = items.map((item) => ({
    value: item.value,
    label: optionLabel(item, labelKey),
    disabled: Boolean(item.disabled),
  }));

  return (
    <SelectRoot
      items={options}
      {...(value !== undefined ? { value: toSelectValue(value) } : {})}
      onValueChange={(next) => {
        onValueChange?.(typeof next === "string" ? next : null);
      }}
      required={required}
      disabled={disabled}
      name={name}
      id={id}
    >
      <SelectTrigger
        data-slot="form-select-trigger"
        disabled={disabled}
        className={cn(selectTriggerVariants({ size }), className, {
          "hover:border-form-border-strong": !disabled,
        })}
      >
        <SelectValue
          data-slot="form-select-value"
          placeholder={placeholder}
          className="flex items-center text-form-fg data-placeholder:text-form-field-placeholder"
        />
        <SelectIcon
          data-slot="form-select-icon"
          className="text-form-fg-muted shrink-0"
        />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner data-slot="form-select-positioner" sideOffset={4}>
          <SelectPopup
            data-slot="form-select-popup"
            className={selectPopupVariants()}
          >
            <SelectScrollUpArrow
              data-slot="form-select-scroll-up-arrow"
              className="flex items-center justify-center py-1 text-form-fg-muted"
            />
            <SelectList data-slot="form-select-list" className="py-1">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  data-slot="form-select-item"
                  value={option.value}
                  disabled={option.disabled}
                  className={selectItemVariants({ size })}
                >
                  <SelectItemText
                    data-slot="form-select-item-text"
                    className="flex-1"
                  >
                    {option.label}
                  </SelectItemText>
                  <SelectItemIndicator
                    data-slot="form-select-item-indicator"
                    className="ml-auto shrink-0 text-form-brand"
                  />
                </SelectItem>
              ))}
            </SelectList>
            <SelectScrollDownArrow
              data-slot="form-select-scroll-down-arrow"
              className="flex items-center justify-center py-1 text-form-fg-muted"
            />
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </SelectRoot>
  );
}
