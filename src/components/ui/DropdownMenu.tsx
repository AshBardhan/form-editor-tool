"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/styleUtils";

// ==================== DropdownMenu Context ====================

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(
  null,
);

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      "DropdownMenu components must be used within a DropdownMenu",
    );
  }
  return context;
}

// ==================== DropdownMenu Root ====================

interface DropdownMenuProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * DropdownMenu root component - Controls open/close state
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>...</DropdownMenuContent>
 * </DropdownMenu>
 */
function DropdownMenu({ children, open, onOpenChange }: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internalOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  return (
    <DropdownMenuContext.Provider value={{ open: actualOpen, setOpen, triggerRef }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

// ==================== DropdownMenuTrigger ====================

interface DropdownMenuTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: ReactNode;
}

/**
 * DropdownMenuTrigger - Button that triggers the dropdown
 * @example
 * <DropdownMenuTrigger asChild>
 *   <Button>Open Menu</Button>
 * </DropdownMenuTrigger>
 */
function DropdownMenuTrigger({
  asChild = false,
  children,
  onClick,
  ...props
}: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdownMenuContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open);
    onClick?.(e);
  };

  if (asChild && typeof children === "object" && children !== null) {
    const child = children as React.ReactElement<
      ButtonHTMLAttributes<HTMLButtonElement>
    >;
    return (
      <child.type
        {...child.props}
        ref={(node: HTMLElement) => {
          triggerRef.current = node;
          // Handle forwarded refs from child
          const childRef = (
            child as React.ReactElement & { ref?: React.Ref<HTMLElement> }
          ).ref;
          if (typeof childRef === "function") {
            childRef(node);
          } else if (
            childRef &&
            typeof childRef === "object" &&
            "current" in childRef
          ) {
            (childRef as React.MutableRefObject<HTMLElement>).current = node;
          }
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick(e);
          child.props.onClick?.(e);
        }}
      />
    );
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup="menu"
      {...props}
    >
      {children}
    </button>
  );
}

// ==================== DropdownMenuContent ====================

interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

/**
 * DropdownMenuContent - Container for dropdown items
 * @example
 * <DropdownMenuContent align="end">
 *   <DropdownMenuItem>Item 1</DropdownMenuItem>
 * </DropdownMenuContent>
 */
function DropdownMenuContent({
  children,
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  const { open, setOpen, triggerRef } = useDropdownMenuContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate position
  useEffect(() => {
    if (open && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      let left = triggerRect.left;
      if (align === "center") {
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      } else if (align === "end") {
        left = triggerRect.right - contentRect.width;
      }

      const top = triggerRect.bottom + sideOffset;

      setPosition({ top, left });
    }
  }, [open, align, sideOffset, triggerRef]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen, triggerRef]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      ref={contentRef}
      role="menu"
      className={cn(
        "fixed z-50 min-w-32 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-md",
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className,
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}

// ==================== DropdownMenuGroup ====================

type DropdownMenuGroupProps = HTMLAttributes<HTMLDivElement>;

/**
 * DropdownMenuGroup - Groups related menu items
 * @example
 * <DropdownMenuGroup>
 *   <DropdownMenuLabel>Account</DropdownMenuLabel>
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 * </DropdownMenuGroup>
 */
function DropdownMenuGroup({
  children,
  className,
  ...props
}: DropdownMenuGroupProps) {
  return (
    <div
      role="group"
      className={cn("py-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ==================== DropdownMenuLabel ====================

type DropdownMenuLabelProps = HTMLAttributes<HTMLDivElement>;

/**
 * DropdownMenuLabel - Label for menu item groups
 * @example
 * <DropdownMenuLabel>My Account</DropdownMenuLabel>
 */
function DropdownMenuLabel({
  children,
  className,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ==================== DropdownMenuItem ====================

interface DropdownMenuItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  disabled?: boolean;
  onSelect?: (event: Event) => void;
}

/**
 * DropdownMenuItem - Individual menu item
 * @example
 * <DropdownMenuItem onSelect={() => console.log('clicked')}>
 *   Profile
 * </DropdownMenuItem>
 */
function DropdownMenuItem({
  children,
  className,
  disabled = false,
  onSelect,
  onClick,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    onClick?.(e);

    if (onSelect) {
      const event = new Event("select", { bubbles: true, cancelable: true });
      onSelect(event);
      if (!event.defaultPrevented) {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <div
      role="menuitem"
      aria-disabled={disabled}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        disabled
          ? "pointer-events-none opacity-50"
          : "hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700",
        "text-gray-900 dark:text-gray-100",
        className,
      )}
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// ==================== DropdownMenuSeparator ====================

type DropdownMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

/**
 * DropdownMenuSeparator - Visual separator between menu items
 * @example
 * <DropdownMenuSeparator />
 */
function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn(
        "-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700",
        className,
      )}
      {...props}
    />
  );
}

// ==================== Exports ====================

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
