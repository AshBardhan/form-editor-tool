"use client";

import { type ReactNode } from "react";
import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils/styleUtils";
import { Toast as BaseToast } from "@base-ui/react/toast";
import {
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  createToastManager,
  useToastManager,
} from "@/design-system/primitives";

export type AppToastVariant = "success" | "error" | "info" | "warning";

export type AppToastData = {
  dismissible?: boolean;
};

export type AppToastOptions = {
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
};

type AppToastObject = BaseToast.Root.ToastObject<AppToastData>;

export const appToastManager = createToastManager<AppToastData>();

const toastRootClass =
  "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full origin-bottom [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] select-none after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-ending-style:opacity-0 data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-limited:opacity-0 data-starting-style:[transform:translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)] data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] h-[var(--height)] data-expanded:h-[var(--toast-height)] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] overflow-hidden rounded-lg border p-0 shadow-lg";

const toastVariantClass: Record<AppToastVariant, string> = {
  success: "border-app-success/50 bg-app-success-subtle text-app-success",
  error: "border-app-error/50 bg-app-error-subtle text-app-error",
  info: "border-app-info/50 bg-app-info-subtle text-app-info",
  warning: "border-app-warning/50 bg-app-warning-subtle text-app-warning",
};

const toastContentClass =
  "flex items-start gap-3 overflow-hidden p-4 transition-opacity duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100";

const toastTitleClass = "text-sm font-semibold leading-5";

const toastDescriptionClass = "text-sm leading-5 opacity-90";

const toastCloseClass =
  "absolute right-2 top-2 inline-flex size-6 shrink-0 items-center justify-center rounded-md text-current/50 outline-none transition-colors hover:bg-black/5 hover:text-current focus-visible:ring-[3px] focus-visible:ring-current/30";

const toastActionClass =
  "mt-2 inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-current/30 bg-transparent px-3 text-sm font-medium outline-none transition-colors hover:bg-black/5 focus-visible:ring-[3px] focus-visible:ring-current/30";

const toastViewportClass =
  "fixed bottom-6 left-1/2 z-[60] w-[calc(100vw-2rem)] -translate-x-1/2 outline-none sm:bottom-8 sm:w-[22.5rem]";

function isAppToastVariant(
  value: string | undefined,
): value is AppToastVariant {
  return (
    value === "success" ||
    value === "error" ||
    value === "info" ||
    value === "warning"
  );
}

function getToastVariant(type: string | undefined): AppToastVariant {
  return isAppToastVariant(type) ? type : "info";
}

function toTimeout(duration: number | undefined) {
  if (duration === Infinity) return 0;
  return duration;
}

function createToastId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function toAddOptions(type: AppToastVariant, options: AppToastOptions) {
  const { title, description, duration, dismissible = true, action } = options;
  const id = createToastId();

  return {
    id,
    type,
    title,
    description,
    timeout: toTimeout(duration),
    priority:
      type === "error" || type === "warning"
        ? ("high" as const)
        : ("low" as const),
    data: { dismissible },
    actionProps: action
      ? {
          children: action.label,
          onClick: () => {
            action.onClick();
            appToastManager.close(id);
          },
        }
      : undefined,
  };
}

export const toast = {
  success: (options: AppToastOptions) =>
    appToastManager.add(toAddOptions("success", options)),
  error: (options: AppToastOptions) =>
    appToastManager.add(toAddOptions("error", options)),
  info: (options: AppToastOptions) =>
    appToastManager.add(toAddOptions("info", options)),
  warning: (options: AppToastOptions) =>
    appToastManager.add(toAddOptions("warning", options)),
  update: (
    id: string,
    data: Partial<AppToastOptions> & { type?: AppToastVariant },
  ) => {
    appToastManager.update(id, (prev) => ({
      type: data.type ?? prev.type,
      title: data.title ?? prev.title,
      description: data.description ?? prev.description,
      timeout:
        data.duration !== undefined ? toTimeout(data.duration) : prev.timeout,
      priority:
        data.type === "error" || data.type === "warning"
          ? "high"
          : data.type
            ? "low"
            : prev.priority,
      data: {
        ...prev.data,
        dismissible: data.dismissible ?? prev.data?.dismissible,
      },
      actionProps: data.action
        ? {
            children: data.action.label,
            onClick: data.action.onClick,
          }
        : prev.actionProps,
    }));
  },
  dismiss: (id?: string) => appToastManager.close(id),
};

function ToastIcon({ variant }: { variant: AppToastVariant }) {
  const iconClass = "mt-0.5 size-5 shrink-0";

  switch (variant) {
    case "success":
      return <CheckCircle className={iconClass} />;
    case "error":
      return <XCircle className={iconClass} />;
    case "warning":
      return <AlertTriangle className={iconClass} />;
    case "info":
      return <Info className={iconClass} />;
  }
}

export type AppToastProviderProps = BaseToast.Provider.Props;

/**
 * AppToastProvider - Themed toast context, viewport, and stack.
 */
export function AppToastProvider({
  children,
  timeout = 5000,
  limit = 5,
  toastManager = appToastManager,
  ...props
}: AppToastProviderProps) {
  return (
    <ToastProvider
      timeout={timeout}
      limit={limit}
      toastManager={toastManager}
      {...props}
    >
      {children}
      <AppToastViewport />
    </ToastProvider>
  );
}

export type AppToastViewportProps = BaseToast.Viewport.Props;

/**
 * AppToastViewport - Portaled, stacked toast region.
 */
export function AppToastViewport({
  className,
  ...props
}: AppToastViewportProps) {
  return (
    <ToastPortal>
      <ToastViewport
        data-slot="app-toast-viewport"
        className={cn(toastViewportClass, className)}
        {...props}
      >
        <AppToastList />
      </ToastViewport>
    </ToastPortal>
  );
}

function AppToastList() {
  const { toasts } = useToastManager<AppToastData>();

  return toasts.map((item) => <AppToast key={item.id} toast={item} />);
}

export type AppToastProps = BaseToast.Root.Props & {
  toast: AppToastObject;
};

/**
 * AppToast - Themed toast item with success, error, info, and warning variants.
 */
export function AppToast({
  toast: toastItem,
  className,
  ...props
}: AppToastProps) {
  const variant = getToastVariant(toastItem.type);
  const dismissible = toastItem.data?.dismissible !== false;

  return (
    <ToastRoot
      toast={toastItem}
      swipeDirection={dismissible ? ["down", "right"] : []}
      data-slot="app-toast"
      className={cn(toastRootClass, toastVariantClass[variant], className)}
      {...props}
    >
      <AppToastContent>
        <ToastIcon variant={variant} />
        <div className="flex min-w-0 flex-1 flex-col gap-1 pr-6">
          <AppToastTitle />
          <AppToastDescription />
          <AppToastAction />
        </div>
        {dismissible ? <AppToastClose /> : null}
      </AppToastContent>
    </ToastRoot>
  );
}

export type AppToastContentProps = BaseToast.Content.Props;

export function AppToastContent({ className, ...props }: AppToastContentProps) {
  return (
    <ToastContent
      data-slot="app-toast-content"
      className={cn(toastContentClass, className)}
      {...props}
    />
  );
}

export type AppToastTitleProps = BaseToast.Title.Props;

export function AppToastTitle({ className, ...props }: AppToastTitleProps) {
  return (
    <ToastTitle
      data-slot="app-toast-title"
      className={cn(toastTitleClass, className)}
      {...props}
    />
  );
}

export type AppToastDescriptionProps = BaseToast.Description.Props;

export function AppToastDescription({
  className,
  ...props
}: AppToastDescriptionProps) {
  return (
    <ToastDescription
      data-slot="app-toast-description"
      className={cn(toastDescriptionClass, className)}
      {...props}
    />
  );
}

export type AppToastCloseProps = BaseToast.Close.Props;

export function AppToastClose({
  className,
  children,
  ...props
}: AppToastCloseProps) {
  return (
    <ToastClose
      data-slot="app-toast-close"
      aria-label="Close"
      className={cn(toastCloseClass, className)}
      {...props}
    >
      {children ?? <X className="size-4" />}
    </ToastClose>
  );
}

export type AppToastActionProps = BaseToast.Action.Props;

export function AppToastAction({ className, ...props }: AppToastActionProps) {
  return (
    <ToastAction
      data-slot="app-toast-action"
      className={cn(toastActionClass, className)}
      {...props}
    />
  );
}
