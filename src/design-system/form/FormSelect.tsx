import { ComponentProps, createContext, useContext } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";
import {
  SelectRoot,
  SelectLabel,
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
  SelectGroup,
  SelectGroupLabel,
} from "@/design-system/primitives";

/**
 * SelectSizeContext - Provides size configuration to child Select components
 */
const SelectSizeContext = createContext<{ size?: "sm" | "md" | "lg" } | null>(
  null,
);

function useSelectSize() {
  return useContext(SelectSizeContext)?.size;
}

const selectTriggerVariants = cva(
  "inline-flex items-center justify-between w-full font-medium transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-[3px] focus-visible:ring-offset-0 border border-form-border-subtle bg-form-surface text-form-fg rounded-md",
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
  "z-50 min-w-56 rounded-md border border-form-border-subtle bg-form-surface text-form-fg shadow-lg overflow-y-auto max-h-64",
);

const selectItemVariants = cva(
  "relative flex items-center px-3 py-2 text-sm outline-none select-none cursor-pointer transition-colors data-[highlighted]:bg-form-surface-muted data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
);

export function FormSelect({
  value,
  onValueChange,
  size,
  children,
  ...props
}: ComponentProps<typeof SelectRoot> & {
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}) {
  return (
    <SelectSizeContext.Provider value={{ size }}>
      <SelectRoot value={value} onValueChange={onValueChange} {...props}>
        {children}
      </SelectRoot>
    </SelectSizeContext.Provider>
  );
}

export function FormSelectLabel({
  className,
  ...props
}: ComponentProps<typeof SelectLabel>) {
  return (
    <SelectLabel
      className={cn("text-sm font-medium text-form-fg", className)}
      {...props}
    />
  );
}

export function FormSelectTrigger({
  className,
  size: explicitSize,
  children,
  ...props
}: ComponentProps<typeof SelectTrigger> &
  VariantProps<typeof selectTriggerVariants> & {
    children?: React.ReactNode;
  }) {
  const contextSize = useSelectSize();
  const size = explicitSize || contextSize;

  const triggerClassName = cn(selectTriggerVariants({ size, className }), {
    "border-form-border-subtle focus-visible:ring-form-brand/30": true,
    "hover:border-form-border-strong": !props.disabled,
  });

  return (
    <SelectTrigger
      data-slot="form-select-trigger"
      className={triggerClassName}
      {...props}
    >
      {children}
      <FormSelectIcon />
    </SelectTrigger>
  );
}

export function FormSelectValue({
  className,
  placeholder,
  ...props
}: ComponentProps<typeof SelectValue>) {
  return (
    <SelectValue
      data-slot="form-select-value"
      placeholder={placeholder}
      className={cn(
        "flex items-center text-form-fg data-placeholder:text-form-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function FormSelectIcon({
  className,
  ...props
}: ComponentProps<typeof SelectIcon>) {
  return (
    <SelectIcon
      data-slot="form-select-icon"
      className={cn("text-form-fg-muted shrink-0", className)}
      {...props}
    />
  );
}

export function FormSelectPortal({
  ...props
}: ComponentProps<typeof SelectPortal>) {
  return <SelectPortal {...props} />;
}

export function FormSelectPositioner({
  sideOffset = 4,
  ...props
}: ComponentProps<typeof SelectPositioner>) {
  return (
    <SelectPositioner
      data-slot="form-select-positioner"
      sideOffset={sideOffset}
      {...props}
    />
  );
}

export function FormSelectPopup({
  className,
  ...props
}: ComponentProps<typeof SelectPopup>) {
  return (
    <SelectPopup
      data-slot="form-select-popup"
      className={cn(selectPopupVariants({ className }))}
      {...props}
    />
  );
}

export function FormSelectScrollUpArrow({
  className,
  ...props
}: ComponentProps<typeof SelectScrollUpArrow>) {
  return (
    <SelectScrollUpArrow
      data-slot="form-select-scroll-up-arrow"
      className={cn(
        "flex items-center justify-center py-1 text-form-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function FormSelectList({
  className,
  ...props
}: ComponentProps<typeof SelectList>) {
  return (
    <SelectList
      data-slot="form-select-list"
      className={cn("py-1", className)}
      {...props}
    />
  );
}

export function FormSelectItemText({
  className,
  ...props
}: ComponentProps<typeof SelectItemText>) {
  return (
    <SelectItemText
      data-slot="form-select-item-text"
      className={cn("flex-1", className)}
      {...props}
    />
  );
}

/**
 * FormSelectContent - Simplified dropdown content wrapper
 *
 * Automatically handles Portal, Positioner, Popup, and scroll indicators.
 * Just pass FormSelectItem children.
 */
export function FormSelectContent({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & ComponentProps<typeof SelectPopup>) {
  return (
    <FormSelectPortal>
      <FormSelectPositioner sideOffset={4}>
        <FormSelectPopup {...props}>
          <FormSelectScrollUpArrow />
          <FormSelectList>{children}</FormSelectList>
          <FormSelectScrollDownArrow />
        </FormSelectPopup>
      </FormSelectPositioner>
    </FormSelectPortal>
  );
}

/**
 * FormSelectItem - Simplified select option
 *
 * Automatically renders the indicator checkmark.
 * Children become the item text.
 */
export function FormSelectItem({
  value,
  children,
  className,
  disabled,
  ...props
}: ComponentProps<typeof SelectItem> & {
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <SelectItem
      data-slot="form-select-item"
      value={value}
      disabled={disabled}
      className={cn(selectItemVariants({ className }))}
      {...props}
    >
      <FormSelectItemIndicator className="text-form-fg-muted" />
      <FormSelectItemText>{children}</FormSelectItemText>
    </SelectItem>
  );
}

export function FormSelectItemIndicator({
  className,
  ...props
}: ComponentProps<typeof SelectItemIndicator>) {
  return (
    <SelectItemIndicator
      data-slot="form-select-item-indicator"
      className={cn("text-form-fg-muted", className)}
      {...props}
    />
  );
}

export function FormSelectScrollDownArrow({
  className,
  ...props
}: ComponentProps<typeof SelectScrollDownArrow>) {
  return (
    <SelectScrollDownArrow
      data-slot="form-select-scroll-down-arrow"
      className={cn(
        "flex items-center justify-center py-1 text-form-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function FormSelectGroup({
  className,
  ...props
}: ComponentProps<typeof SelectGroup>) {
  return (
    <SelectGroup
      data-slot="form-select-group"
      className={cn("overflow-hidden", className)}
      {...props}
    />
  );
}

export function FormSelectGroupLabel({
  className,
  ...props
}: ComponentProps<typeof SelectGroupLabel>) {
  return (
    <SelectGroupLabel
      data-slot="form-select-group-label"
      className={cn(
        "px-3 py-2 text-xs font-semibold text-form-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
