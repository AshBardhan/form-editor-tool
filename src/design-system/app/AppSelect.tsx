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

export type AppSelectOption = {
  value: string;
  label?: string;
  disabled?: boolean;
  [field: string]: string | number | boolean | null | undefined;
};

export type AppSelectProps = {
  items: AppSelectOption[];
  labelKey?: string;
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
};

const selectTriggerVariants = cva(
  "inline-flex items-center justify-between w-full font-medium transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-[3px] focus-visible:ring-offset-0 border border-app-border-subtle bg-app-surface text-app-fg rounded-md focus-visible:ring-app-brand/30",
  {
    variants: {
      size: {
        sm: "h-8 px-3 py-1.5 text-sm gap-1.5",
        md: "h-9 px-4 py-2 text-sm gap-2",
        lg: "h-10 px-4 py-2.5 text-base gap-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const selectPopupVariants = cva(
  "z-50 min-w-50 w-(--anchor-width) rounded-md border border-app-border-subtle bg-app-surface text-app-fg shadow-lg overflow-y-auto max-h-64",
);

const selectItemVariants = cva(
  "relative flex items-center gap-2 px-3 py-2 text-sm outline-none select-none cursor-pointer transition-colors data-[highlighted]:bg-app-surface-muted data-[selected]:bg-app-brand-subtle data-[selected]:text-app-brand data-[highlighted]:data-[selected]:bg-app-brand-subtle data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
);

function optionLabel(item: AppSelectOption, labelKey: string) {
  const fromKey = item[labelKey];
  if (typeof fromKey === "string" || typeof fromKey === "number") {
    return String(fromKey);
  }
  return item.label ?? item.value;
}

function toSelectValue(value: string | null) {
  return value === "" ? null : value;
}

export function AppSelect({
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
}: AppSelectProps) {
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
        data-slot="app-select-trigger"
        disabled={disabled}
        className={cn(selectTriggerVariants({ size }), className, {
          "hover:border-app-border-strong": !disabled,
        })}
      >
        <SelectValue
          data-slot="app-select-value"
          placeholder={placeholder}
          className="flex items-center text-app-fg data-placeholder:text-app-fg-muted"
        />
        <SelectIcon
          data-slot="app-select-icon"
          className="text-app-fg-muted shrink-0"
        />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner data-slot="app-select-positioner" sideOffset={4}>
          <SelectPopup
            data-slot="app-select-popup"
            className={selectPopupVariants()}
          >
            <SelectScrollUpArrow
              data-slot="app-select-scroll-up-arrow"
              className="flex items-center justify-center py-1 text-app-fg-muted"
            />
            <SelectList data-slot="app-select-list" className="py-1">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  data-slot="app-select-item"
                  value={option.value}
                  disabled={option.disabled}
                  className={selectItemVariants()}
                >
                  <SelectItemText
                    data-slot="app-select-item-text"
                    className="flex-1"
                  >
                    {option.label}
                  </SelectItemText>
                  <SelectItemIndicator
                    data-slot="app-select-item-indicator"
                    className="ml-auto shrink-0 text-app-brand"
                  />
                </SelectItem>
              ))}
            </SelectList>
            <SelectScrollDownArrow
              data-slot="app-select-scroll-down-arrow"
              className="flex items-center justify-center py-1 text-app-fg-muted"
            />
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </SelectRoot>
  );
}
