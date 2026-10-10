"use client";

import {
  createContext,
  useContext,
  type ComponentProps,
  type ComponentType,
} from "react";
import { X } from "lucide-react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { cn } from "@/lib/utils/styleUtils";
import {
  AlertModalBackdrop,
  AlertModalClose,
  AlertModalDescription,
  AlertModalPopup,
  AlertModalPortal,
  AlertModalRoot,
  AlertModalTitle,
  AlertModalTrigger,
  ModalBackdrop,
  ModalClose,
  ModalDescription,
  ModalPopup,
  ModalPortal,
  ModalRoot,
  ModalTitle,
  ModalTrigger,
} from "@/design-system/primitives";

export type AppModalType = "base" | "alert";
export type AppModalSize = "sm" | "md" | "lg";

const AppModalTypeContext = createContext<AppModalType>("base");

function useAppModalType() {
  return useContext(AppModalTypeContext);
}

const modalBackdropClass =
  "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0";

const modalPopupClass =
  "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-app-border-subtle bg-app-surface text-app-fg shadow-lg outline-none transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0";

const modalSizeClass: Record<AppModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-2xl",
  lg: "max-w-6xl",
};

const modalTriggerClass =
  "inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-app-border-strong/30 bg-transparent px-3 text-sm leading-none font-medium whitespace-nowrap text-app-fg select-none outline-none transition-colors hover:bg-app-surface-muted focus-visible:ring-[3px] focus-visible:ring-app-border-strong data-disabled:pointer-events-none data-disabled:opacity-50 data-popup-open:bg-app-surface-muted";

const modalCloseClass =
  "absolute top-4 right-4 z-10 inline-flex size-8 items-center justify-center rounded-md text-app-fg-muted outline-none transition-colors hover:bg-app-surface-muted hover:text-app-fg focus-visible:ring-[3px] focus-visible:ring-app-brand/30";

const modalHeaderClass = "flex flex-col gap-1.5 px-6 pt-6";

const modalFooterClass =
  "flex flex-col-reverse gap-2 px-6 pt-4 pb-6 sm:flex-row sm:justify-end";

const modalTitleClass =
  "text-xl font-semibold leading-none tracking-tight text-app-fg-heading";

const modalDescriptionClass = "text-sm leading-5 text-app-fg-muted";

type AppModalBaseProps = BaseDialog.Root.Props & {
  /**
   * `base` dismisses on outside press. `alert` keeps the dialog open until an explicit action.
   * @default "base"
   */
  type?: "base";
};

type AppModalAlertProps = BaseAlertDialog.Root.Props & {
  type: "alert";
};

export type AppModalProps = AppModalBaseProps | AppModalAlertProps;

/**
 * AppModal - Themed dialog.
 * `type` selects the Base UI primitive used by every subcomponent.
 */
export function AppModal(props: AppModalProps) {
  if (props.type === "alert") {
    const { type, ...rest } = props;
    return (
      <AppModalTypeContext.Provider value={type}>
        <AlertModalRoot data-slot="app-modal" {...rest} />
      </AppModalTypeContext.Provider>
    );
  }

  const { type = "base", ...rest } = props;
  return (
    <AppModalTypeContext.Provider value={type}>
      <ModalRoot data-slot="app-modal" {...rest} />
    </AppModalTypeContext.Provider>
  );
}

export type AppModalTriggerProps = BaseDialog.Trigger.Props;

/**
 * AppModalTrigger - Themed button that opens the dialog.
 * Pass `render` to compose an existing button and skip the default trigger chrome.
 */
export function AppModalTrigger({
  className,
  render,
  ...props
}: AppModalTriggerProps) {
  const type = useAppModalType();
  const triggerClassName = cn(render ? undefined : modalTriggerClass, className);

  if (type === "alert") {
    return (
      <AlertModalTrigger
        data-slot="app-modal-trigger"
        render={render}
        className={triggerClassName}
        {...(props as BaseAlertDialog.Trigger.Props)}
      />
    );
  }

  return (
    <ModalTrigger
      data-slot="app-modal-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
}

export type AppModalContentProps = BaseDialog.Popup.Props & {
  size?: AppModalSize;
  /** Renders the corner close button. @default true */
  showClose?: boolean;
};

type ModalSurfaceProps = AppModalContentProps & {
  Portal: ComponentType<BaseDialog.Portal.Props>;
  Backdrop: ComponentType<BaseDialog.Backdrop.Props>;
  Popup: ComponentType<BaseDialog.Popup.Props>;
  Close: ComponentType<BaseDialog.Close.Props>;
};

function AppModalSurface({
  Portal,
  Backdrop,
  Popup,
  Close,
  size = "md",
  showClose = true,
  className,
  children,
  ...props
}: ModalSurfaceProps) {
  return (
    <Portal>
      <Backdrop
        data-slot="app-modal-backdrop"
        className={modalBackdropClass}
      />
      <Popup
        data-slot="app-modal-popup"
        className={cn(modalPopupClass, modalSizeClass[size], className)}
        {...props}
      >
        {children}
        {showClose ? (
          <Close data-slot="app-modal-close" className={modalCloseClass}>
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Close>
        ) : null}
      </Popup>
    </Portal>
  );
}

/**
 * AppModalContent - Portaled dialog surface with backdrop and close button.
 * @param size - sm (384px), md (672px, default), lg (1152px)
 */
export function AppModalContent(props: AppModalContentProps) {
  const type = useAppModalType();

  if (type === "alert") {
    return (
      <AppModalSurface
        Portal={AlertModalPortal}
        Backdrop={AlertModalBackdrop}
        Popup={AlertModalPopup}
        Close={AlertModalClose}
        {...props}
      />
    );
  }

  return (
    <AppModalSurface
      Portal={ModalPortal}
      Backdrop={ModalBackdrop}
      Popup={ModalPopup}
      Close={ModalClose}
      {...props}
    />
  );
}

export type AppModalHeaderProps = ComponentProps<"div">;

export function AppModalHeader({ className, ...props }: AppModalHeaderProps) {
  return (
    <div
      data-slot="app-modal-header"
      className={cn(modalHeaderClass, className)}
      {...props}
    />
  );
}

export type AppModalFooterProps = ComponentProps<"div">;

export function AppModalFooter({ className, ...props }: AppModalFooterProps) {
  return (
    <div
      data-slot="app-modal-footer"
      className={cn(modalFooterClass, className)}
      {...props}
    />
  );
}

export type AppModalTitleProps = BaseDialog.Title.Props;

export function AppModalTitle({ className, ...props }: AppModalTitleProps) {
  const type = useAppModalType();
  const titleClassName = cn(modalTitleClass, className);

  if (type === "alert") {
    return (
      <AlertModalTitle
        data-slot="app-modal-title"
        className={titleClassName}
        {...props}
      />
    );
  }

  return (
    <ModalTitle
      data-slot="app-modal-title"
      className={titleClassName}
      {...props}
    />
  );
}

export type AppModalDescriptionProps = BaseDialog.Description.Props;

export function AppModalDescription({
  className,
  ...props
}: AppModalDescriptionProps) {
  const type = useAppModalType();
  const descriptionClassName = cn(modalDescriptionClass, className);

  if (type === "alert") {
    return (
      <AlertModalDescription
        data-slot="app-modal-description"
        className={descriptionClassName}
        {...props}
      />
    );
  }

  return (
    <ModalDescription
      data-slot="app-modal-description"
      className={descriptionClassName}
      {...props}
    />
  );
}

export type AppModalCloseProps = BaseDialog.Close.Props;

/**
 * AppModalClose - Closes the dialog.
 * Pass `render` to compose an existing button.
 */
export function AppModalClose({
  className,
  render,
  ...props
}: AppModalCloseProps) {
  const type = useAppModalType();
  const closeClassName = cn(render ? undefined : modalTriggerClass, className);

  if (type === "alert") {
    return (
      <AlertModalClose
        data-slot="app-modal-close"
        render={render}
        className={closeClassName}
        {...props}
      />
    );
  }

  return (
    <ModalClose
      data-slot="app-modal-close"
      render={render}
      className={closeClassName}
      {...props}
    />
  );
}
