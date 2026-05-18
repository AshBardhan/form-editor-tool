"use client";

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  createContext,
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
  ReactNode,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils/styleUtils";

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  registerItem: (value: string, label: ReactNode) => void;
  getLabel: (value: string) => ReactNode;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const SelectContext = createContext<SelectContextValue | null>(null);

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

function Select({
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const valueToLabelMapRef = useRef<Map<string, ReactNode>>(new Map());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const actualValue = value ?? internalValue;
  const actualOpen = open ?? internalOpen;

  const registerItem = useCallback((itemValue: string, label: ReactNode) => {
    valueToLabelMapRef.current.set(itemValue, label);
  }, []);

  const getLabel = useCallback((itemValue: string) => {
    return valueToLabelMapRef.current.get(itemValue);
  }, []);

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);

      // Close the select when a value is selected
      if (open === undefined) {
        setInternalOpen(false);
      }
      onOpenChange?.(false);
    },
    [value, open],
  );

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [open],
  );

  // Ref for the root element
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!actualOpen) return;
    function handleClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        handleOpenChange(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleOpenChange(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [actualOpen]);

  return (
    <SelectContext.Provider
      value={{
        value: actualValue,
        onValueChange: handleValueChange,
        open: actualOpen,
        onOpenChange: handleOpenChange,
        registerItem,
        getLabel,
        triggerRef,
        contentRef,
      }}
    >
      <div data-slot="select" className="relative" ref={rootRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectGroup({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="select-group" {...props}>
      {children}
    </div>
  );
}

interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

function SelectValue({
  placeholder,
  className,
  children,
  ...props
}: SelectValueProps) {
  const context = useContext(SelectContext);
  if (!context) throw new Error("SelectValue must be used within Select");

  // Priority: children > selected label > placeholder > "Select option"
  let displayValue: ReactNode;

  if (children) {
    displayValue = children;
  } else if (context.value) {
    const label = context.getLabel(context.value);
    displayValue = label ?? placeholder ?? "Select option";
  } else {
    displayValue = placeholder ?? "Select option";
  }

  return (
    <span data-slot="select-value" className={className} {...props}>
      {displayValue}
    </span>
  );
}

interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "default";
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  const context = useContext(SelectContext);
  if (!context) throw new Error("SelectTrigger must be used within Select");

  return (
    <button
      ref={context.triggerRef}
      type="button"
      data-slot="select-trigger"
      data-size={size}
      aria-expanded={context.open}
      aria-haspopup="listbox"
      onClick={() => context.onOpenChange(!context.open)}
      className={cn(
        "border-input dark:border-white data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/10 dark:text-white dark:hover:bg-input/30 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 opacity-50" />
    </button>
  );
}

interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  position?: "popper";
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: SelectContentProps) {
  const context = useContext(SelectContext);
  if (!context) throw new Error("SelectContent must be used within Select");

  // Focus first or selected item when dropdown opens
  useEffect(() => {
    if (!context.open || !context.contentRef.current) return;

    // Focus the selected item or first item
    const selectedItem = context.contentRef.current.querySelector(
      '[data-slot="select-item"][aria-selected="true"]',
    ) as HTMLElement;
    const firstItem = context.contentRef.current.querySelector(
      '[data-slot="select-item"]',
    ) as HTMLElement;

    const itemToFocus = selectedItem || firstItem;
    if (itemToFocus) {
      itemToFocus.focus();
    }
  }, [context.open, context.contentRef]);

  // Handle arrow key navigation at content level
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!context.contentRef.current) return;

      const items = Array.from(
        context.contentRef.current.querySelectorAll(
          '[data-slot="select-item"]',
        ),
      ) as HTMLElement[];

      const currentIndex = items.indexOf(document.activeElement as HTMLElement);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (currentIndex < items.length - 1) {
            items[currentIndex + 1]?.focus();
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (currentIndex > 0) {
            items[currentIndex - 1]?.focus();
          }
          break;
        case "Home":
          e.preventDefault();
          items[0]?.focus();
          break;
        case "End":
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;
        case "Tab":
          // Close on Tab
          context.onOpenChange(false);
          break;
      }
    },
    [context],
  );

  // Always render to mount items and register labels, but hide when closed
  return (
    <div
      ref={context.contentRef}
      role="listbox"
      aria-activedescendant={undefined}
      data-slot="select-content"
      data-state={context.open ? "open" : "closed"}
      onKeyDown={handleKeyDown}
      className={cn(
        "bg-white dark:bg-black text-gray-900 dark:text-white z-50 max-h-96 min-w-32 overflow-x-hidden overflow-y-auto rounded-md border border-input dark:border-white shadow-md",
        position === "popper" && "absolute left-0 top-full mt-1 w-full",
        position !== "popper" && "relative",
        // Hide when closed but keep in DOM for label registration
        !context.open && "invisible opacity-0 pointer-events-none",
        className,
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

function SelectLabel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

function SelectItem({ className, children, value, ...props }: SelectItemProps) {
  const context = useContext(SelectContext);
  if (!context) throw new Error("SelectItem must be used within Select");

  // Register this item's value and label when mounted or when they change
  useEffect(() => {
    context.registerItem(value, children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, children]); // context.registerItem is stable from useCallback with empty deps

  const isSelected = context.value === value;

  const handleClick = () => {
    context.onValueChange?.(value);
    // Return focus to trigger after selection
    context.triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      context.onValueChange?.(value);
      // Return focus to trigger after selection
      context.triggerRef.current?.focus();
    }
  };

  return (
    <div
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-input/20 focus:bg-gray-100 dark:focus:bg-input/20 [&_svg:not([class*='text-'])]:text-gray-500 [&_svg:not([class*='text-'])]:dark:text-gray-400 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        {isSelected && <CheckIcon className="size-4" />}
      </span>
      <span>{children}</span>
    </div>
  );
}

function SelectSeparator({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

// These components are not strictly necessary for basic functionality
// but included for API compatibility
function SelectScrollUpButton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </div>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
