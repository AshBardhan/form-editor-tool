"use client";

import {
  forwardRef,
  HTMLAttributes,
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/styleUtils";

// ==================== Modal Root ====================

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/**
 * Modal root component - Controls open/close state
 * @example
 * <Modal open={isOpen} onOpenChange={setIsOpen}>
 *   <ModalTrigger>Open</ModalTrigger>
 *   <ModalContent>...</ModalContent>
 * </Modal>
 */
function Modal({ children, open, onOpenChange }: ModalProps) {
  return (
    <ModalProvider open={open} onOpenChange={onOpenChange}>
      {children}
    </ModalProvider>
  );
}

// ==================== Modal Context ====================

interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId?: string;
  descriptionId?: string;
  setTitleId: (id: string) => void;
  setDescriptionId: (id: string) => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within <Modal>");
  }
  return context;
}

function ModalProvider({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [titleId, setTitleId] = useState<string>();
  const [descriptionId, setDescriptionId] = useState<string>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setUncontrolledOpen(newOpen);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        titleId,
        descriptionId,
        setTitleId,
        setDescriptionId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// ==================== Modal Trigger ====================

interface ModalTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

/**
 * Modal trigger button - Opens the modal when clicked
 */
const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const { setOpen } = useModalContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
      onClick?.(e);
    };

    if (asChild && children) {
      // Clone child and add onClick
      const child = children as React.ReactElement<{
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
      }>;
      return (
        <child.type
          {...child.props}
          ref={ref}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleClick(e);
            child.props.onClick?.(e);
          }}
        />
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  },
);
ModalTrigger.displayName = "ModalTrigger";

// ==================== Modal Overlay ====================

const ModalOverlay = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
ModalOverlay.displayName = "ModalOverlay";

// ==================== Modal Content ====================

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const modalSizeClasses = {
  sm: "max-w-sm", // 384px (24rem)
  md: "max-w-2xl", // 672px (42rem) - default
  lg: "max-w-6xl", // 1152px (72rem)
};

/**
 * Modal content container - Renders modal with overlay
 * @param size - Modal width: sm (384px), md (672px, default), lg (1152px)
 */
const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, size = "md", ...props }, ref) => {
    const { open, setOpen, titleId, descriptionId } = useModalContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (!open) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [open]);

    // Handle Escape key to close modal
    useEffect(() => {
      if (!open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open]);

    if (!open || !mounted) return null;

    const modalContent = (
      <>
        <ModalOverlay onClick={() => setOpen(false)} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={ref}
            className={cn(
              "relative w-full bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden",
              modalSizeClasses[size],
              "border border-gray-200 dark:border-gray-800",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[state=closed]:slide-out-to-bottom-[48%] data-[state=open]:slide-in-from-bottom-[48%]",
              className,
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            data-state={open ? "open" : "closed"}
            {...props}
          >
            {children}
            <ModalClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500 dark:ring-offset-gray-950 dark:focus:ring-gray-300 dark:data-[state=open]:bg-gray-800 dark:data-[state=open]:text-gray-400">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </ModalClose>
          </div>
        </div>
      </>
    );

    return createPortal(modalContent, document.body);
  },
);
ModalContent.displayName = "ModalContent";

// ==================== Modal Header ====================

/**
 * Modal header - Contains title and description
 */
const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 px-6 pt-6", className)}
      {...props}
    />
  ),
);
ModalHeader.displayName = "ModalHeader";

// ==================== Modal Footer ====================

/**
 * Modal footer - Contains action buttons
 */
const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-6 pb-6 pt-4",
        className,
      )}
      {...props}
    />
  ),
);
ModalFooter.displayName = "ModalFooter";

// ==================== Modal Title ====================

/**
 * Modal title
 */
const ModalTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, id, ...props }, ref) => {
  const { setTitleId } = useModalContext();
  const titleId = useMemo(
    () => id || `modal-title-${Math.random().toString(36).substr(2, 9)}`,
    [id],
  );

  useEffect(() => {
    setTitleId(titleId);
  }, [titleId]);

  return (
    <h2
      ref={ref}
      id={titleId}
      className={cn(
        "text-xl font-semibold leading-none tracking-tight text-gray-950 dark:text-gray-50",
        className,
      )}
      {...props}
    />
  );
});
ModalTitle.displayName = "ModalTitle";

// ==================== Modal Description ====================

/**
 * Modal description text
 */
const ModalDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, id, ...props }, ref) => {
  const { setDescriptionId } = useModalContext();
  const descriptionId = useMemo(
    () => id || `modal-description-${Math.random().toString(36).substr(2, 9)}`,
    [id],
  );

  useEffect(() => {
    setDescriptionId(descriptionId);
  }, [descriptionId]);

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
      {...props}
    />
  );
});
ModalDescription.displayName = "ModalDescription";

// ==================== Modal Close ====================

interface ModalCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

/**
 * Modal close button
 */
const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const { setOpen } = useModalContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false);
      onClick?.(e);
    };

    if (asChild && children) {
      const child = children as React.ReactElement<{
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
      }>;
      return (
        <child.type
          {...child.props}
          ref={ref}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleClick(e);
            child.props.onClick?.(e);
          }}
        />
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  },
);
ModalClose.displayName = "ModalClose";

// ==================== Exports ====================

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
};
