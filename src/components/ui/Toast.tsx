"use client";

import * as React from "react";
import { cn } from "@/lib/utils/styleUtils";
import { cva } from "class-variance-authority";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

// Toast Types
export type ToastType = "default" | "success" | "info" | "warning" | "error";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Global state management
let toasts: ToastData[] = [];
let listeners: Array<(toasts: ToastData[]) => void> = [];
let toastCount = 0;

function subscribe(listener: (toasts: ToastData[]) => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function notify() {
  listeners.forEach((listener) => listener([...toasts]));
}

function addToast(data: Omit<ToastData, "id">): string {
  const id = `toast-${++toastCount}-${Date.now()}`;
  const toast: ToastData = {
    id,
    duration: 5000,
    dismissible: true,
    ...data,
  };

  toasts = [...toasts, toast];
  notify();

  // Auto dismiss
  if (toast.duration && toast.duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, toast.duration);
  }

  return id;
}

function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

// Toast API
export const toast = {
  show: (title: string, options?: Partial<Omit<ToastData, "id" | "title">>) => {
    return addToast({ type: "default", title, ...options });
  },
  success: (
    title: string,
    options?: Partial<Omit<ToastData, "id" | "title" | "type">>,
  ) => {
    return addToast({ type: "success", title, ...options });
  },
  error: (
    title: string,
    options?: Partial<Omit<ToastData, "id" | "title" | "type">>,
  ) => {
    return addToast({ type: "error", title, ...options });
  },
  info: (
    title: string,
    options?: Partial<Omit<ToastData, "id" | "title" | "type">>,
  ) => {
    return addToast({ type: "info", title, ...options });
  },
  warning: (
    title: string,
    options?: Partial<Omit<ToastData, "id" | "title" | "type">>,
  ) => {
    return addToast({ type: "warning", title, ...options });
  },
  dismiss: (id: string) => {
    removeToast(id);
  },
};

// Toast Variants
const toastVariants = cva(
  "pointer-events-auto relative flex w-full max-w-md items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        success:
          "border-green-500/50 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-100",
        info: "border-blue-500/50 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100",
        warning:
          "border-amber-500/50 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-100",
        error:
          "border-red-500/50 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Toast Icons
const ToastIcon = ({ type }: { type: ToastType }) => {
  const iconClass = "size-5 shrink-0 mt-0.5";

  switch (type) {
    case "success":
      return (
        <CheckCircle
          className={cn(iconClass, "text-green-600 dark:text-green-400")}
        />
      );
    case "error":
      return (
        <XCircle className={cn(iconClass, "text-red-600 dark:text-red-400")} />
      );
    case "warning":
      return (
        <AlertTriangle
          className={cn(iconClass, "text-amber-600 dark:text-amber-400")}
        />
      );
    case "info":
      return (
        <Info className={cn(iconClass, "text-blue-600 dark:text-blue-400")} />
      );
    default:
      return <Info className={cn(iconClass, "text-foreground/70")} />;
  }
};

// Toast Item Component
interface ToastItemProps extends ToastData {
  onRemove: (id: string) => void;
}

const ToastItem = React.forwardRef<HTMLDivElement, ToastItemProps>(
  (
    { id, type, title, description, dismissible = true, action, onRemove },
    ref,
  ) => {
    const variant = type;

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }))}
        data-state="open"
      >
        <ToastIcon type={type} />
        <div className="flex-1 grid gap-1">
          <div className="text-sm font-semibold">{title}</div>
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
          {action && (
            <button
              onClick={() => {
                action.onClick();
                onRemove(id);
              }}
              className="mt-2 inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {action.label}
            </button>
          )}
        </div>
        {dismissible && (
          <button
            onClick={() => onRemove(id)}
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    );
  },
);
ToastItem.displayName = "ToastItem";

// Position Styles
const positionStyles: Record<ToastPosition, string> = {
  "top-left": "top-0 left-0 flex-col",
  "top-center": "top-0 left-1/2 -translate-x-1/2 flex-col",
  "top-right": "top-0 right-0 flex-col",
  "bottom-left": "bottom-0 left-0 flex-col-reverse",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse",
  "bottom-right": "bottom-0 right-0 flex-col-reverse",
};

// Toaster Component
interface ToasterProps {
  position?: ToastPosition;
}

export function Toaster({ position = "bottom-right" }: ToasterProps = {}) {
  const [toastList, setToastList] = React.useState<ToastData[]>([]);

  React.useEffect(() => {
    return subscribe(setToastList);
  }, []);

  if (toastList.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed z-[100] flex max-h-screen w-full p-4 md:max-w-[420px] pointer-events-none",
        positionStyles[position],
      )}
    >
      {toastList.map((toast) => (
        <div key={toast.id} className="mb-2 group">
          <ToastItem {...toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
}
