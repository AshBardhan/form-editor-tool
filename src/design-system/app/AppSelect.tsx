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
  "inline-flex items-center justify-between w-full font-medium transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-[3px] focus-visible:ring-offset-0 border border-app-border-subtle bg-app-surface text-app-fg rounded-md",
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
  "z-50 min-w-56 rounded-md border border-app-border-subtle bg-app-surface text-app-fg shadow-lg overflow-y-auto max-h-64",
);

const selectItemVariants = cva(
  "relative flex items-center px-3 py-2 text-sm outline-none select-none cursor-pointer transition-colors data-[highlighted]:bg-app-surface-muted data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
);

export function AppSelect({
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

export function AppSelectLabel({
  className,
  ...props
}: ComponentProps<typeof SelectLabel>) {
  return (
    <SelectLabel
      className={cn("text-sm font-medium text-app-fg", className)}
      {...props}
    />
  );
}

export function AppSelectTrigger({
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
    "border-app-border-subtle focus-visible:ring-app-brand/30": true,
    "hover:border-app-border-strong": !props.disabled,
  });

  return (
    <SelectTrigger
      data-slot="app-select-trigger"
      className={triggerClassName}
      {...props}
    >
      {children}
      <AppSelectIcon />
    </SelectTrigger>
  );
}

export function AppSelectValue({
  className,
  placeholder,
  ...props
}: ComponentProps<typeof SelectValue>) {
  return (
    <SelectValue
      data-slot="app-select-value"
      placeholder={placeholder}
      className={cn(
        "flex items-center text-app-fg data-placeholder:text-app-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function AppSelectIcon({
  className,
  ...props
}: ComponentProps<typeof SelectIcon>) {
  return (
    <SelectIcon
      data-slot="app-select-icon"
      className={cn("text-app-fg-muted shrink-0", className)}
      {...props}
    />
  );
}

export function AppSelectPortal({
  ...props
}: ComponentProps<typeof SelectPortal>) {
  return <SelectPortal {...props} />;
}

export function AppSelectPositioner({
  sideOffset = 4,
  ...props
}: ComponentProps<typeof SelectPositioner>) {
  return (
    <SelectPositioner
      data-slot="app-select-positioner"
      sideOffset={sideOffset}
      {...props}
    />
  );
}

export function AppSelectPopup({
  className,
  ...props
}: ComponentProps<typeof SelectPopup>) {
  return (
    <SelectPopup
      data-slot="app-select-popup"
      className={cn(selectPopupVariants({ className }))}
      {...props}
    />
  );
}

export function AppSelectScrollUpArrow({
  className,
  ...props
}: ComponentProps<typeof SelectScrollUpArrow>) {
  return (
    <SelectScrollUpArrow
      data-slot="app-select-scroll-up-arrow"
      className={cn(
        "flex items-center justify-center py-1 text-app-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function AppSelectList({
  className,
  ...props
}: ComponentProps<typeof SelectList>) {
  return (
    <SelectList
      data-slot="app-select-list"
      className={cn("py-1", className)}
      {...props}
    />
  );
}

export function AppSelectItemText({
  className,
  ...props
}: ComponentProps<typeof SelectItemText>) {
  return (
    <SelectItemText
      data-slot="app-select-item-text"
      className={cn("flex-1", className)}
      {...props}
    />
  );
}

/**
 * AppSelectContent - Simplified dropdown content wrapper
 *
 * Automatically handles Portal, Positioner, Popup, and scroll indicators.
 * Just pass AppSelectItem children.
 */
export function AppSelectContent({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & ComponentProps<typeof SelectPopup>) {
  return (
    <AppSelectPortal>
      <AppSelectPositioner sideOffset={4}>
        <AppSelectPopup {...props}>
          <AppSelectScrollUpArrow />
          <AppSelectList>{children}</AppSelectList>
          <AppSelectScrollDownArrow />
        </AppSelectPopup>
      </AppSelectPositioner>
    </AppSelectPortal>
  );
}

/**
 * AppSelectItem - Simplified select option
 *
 * Automatically renders the indicator checkmark.
 * Children become the item text.
 */
export function AppSelectItem({
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
      data-slot="app-select-item"
      value={value}
      disabled={disabled}
      className={cn(selectItemVariants({ className }))}
      {...props}
    >
      <AppSelectItemIndicator className="text-app-fg-muted" />
      <AppSelectItemText>{children}</AppSelectItemText>
    </SelectItem>
  );
}

export function AppSelectItemIndicator({
  className,
  ...props
}: ComponentProps<typeof SelectItemIndicator>) {
  return (
    <SelectItemIndicator
      data-slot="app-select-item-indicator"
      className={cn("text-app-fg-muted", className)}
      {...props}
    />
  );
}

export function AppSelectScrollDownArrow({
  className,
  ...props
}: ComponentProps<typeof SelectScrollDownArrow>) {
  return (
    <SelectScrollDownArrow
      data-slot="app-select-scroll-down-arrow"
      className={cn(
        "flex items-center justify-center py-1 text-app-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function AppSelectGroup({
  className,
  ...props
}: ComponentProps<typeof SelectGroup>) {
  return (
    <SelectGroup
      data-slot="app-select-group"
      className={cn("overflow-hidden", className)}
      {...props}
    />
  );
}

export function AppSelectGroupLabel({
  className,
  ...props
}: ComponentProps<typeof SelectGroupLabel>) {
  return (
    <SelectGroupLabel
      data-slot="app-select-group-label"
      className={cn(
        "px-3 py-2 text-xs font-semibold text-app-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
