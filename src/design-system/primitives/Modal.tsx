"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

/**
 * Modal Primitive
 *
 * Unstyled dialogs using Base UI for complete a11y and behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * Regular modal (`dialog`): dismisses on outside press and Escape.
 * Confirmation modal (`alert-dialog`): outside press is ignored; Escape still dismisses.
 *
 * Slots:
 * - Root: Container managing open state. Does not render its own HTML element.
 * - Trigger: Button that opens the dialog
 * - Portal: Portals the dialog outside DOM flow
 * - Backdrop: Overlay beneath the popup
 * - Viewport: Optional scrollable positioning container
 * - Popup: Dialog surface
 * - Title: Accessible heading
 * - Description: Supporting text
 * - Close: Button that closes the dialog
 *
 * State attributes:
 * - data-disabled: Trigger or close button is disabled
 * - data-popup-open: Dialog opened by this trigger is open
 * - data-open / data-closed: Dialog visibility
 * - data-starting-style: Enter animation
 * - data-ending-style: Exit animation
 * - data-nested: Dialog is nested inside another dialog
 * - data-nested-dialog-open: Dialog has a nested dialog open
 */

export function ModalRoot({ ...props }: BaseDialog.Root.Props) {
  return <BaseDialog.Root data-slot="modal-root" {...props} />;
}

export function ModalTrigger({
  disabled,
  ...props
}: BaseDialog.Trigger.Props) {
  return (
    <BaseDialog.Trigger
      disabled={disabled}
      data-slot="modal-trigger"
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

export function ModalPortal({ ...props }: BaseDialog.Portal.Props) {
  return <BaseDialog.Portal data-slot="modal-portal" {...props} />;
}

export function ModalBackdrop({ ...props }: BaseDialog.Backdrop.Props) {
  return <BaseDialog.Backdrop data-slot="modal-backdrop" {...props} />;
}

export function ModalViewport({ ...props }: BaseDialog.Viewport.Props) {
  return <BaseDialog.Viewport data-slot="modal-viewport" {...props} />;
}

export function ModalPopup({ ...props }: BaseDialog.Popup.Props) {
  return <BaseDialog.Popup data-slot="modal-popup" {...props} />;
}

export function ModalTitle({ ...props }: BaseDialog.Title.Props) {
  return <BaseDialog.Title data-slot="modal-title" {...props} />;
}

export function ModalDescription({ ...props }: BaseDialog.Description.Props) {
  return <BaseDialog.Description data-slot="modal-description" {...props} />;
}

export function ModalClose({ disabled, ...props }: BaseDialog.Close.Props) {
  return (
    <BaseDialog.Close
      disabled={disabled}
      data-slot="modal-close"
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

export function AlertModalRoot({ ...props }: BaseAlertDialog.Root.Props) {
  return <BaseAlertDialog.Root data-slot="alert-modal-root" {...props} />;
}

export function AlertModalTrigger({
  disabled,
  ...props
}: BaseAlertDialog.Trigger.Props) {
  return (
    <BaseAlertDialog.Trigger
      disabled={disabled}
      data-slot="alert-modal-trigger"
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

export function AlertModalPortal({ ...props }: BaseAlertDialog.Portal.Props) {
  return <BaseAlertDialog.Portal data-slot="alert-modal-portal" {...props} />;
}

export function AlertModalBackdrop({
  ...props
}: BaseAlertDialog.Backdrop.Props) {
  return (
    <BaseAlertDialog.Backdrop data-slot="alert-modal-backdrop" {...props} />
  );
}

export function AlertModalViewport({
  ...props
}: BaseAlertDialog.Viewport.Props) {
  return (
    <BaseAlertDialog.Viewport data-slot="alert-modal-viewport" {...props} />
  );
}

export function AlertModalPopup({ ...props }: BaseAlertDialog.Popup.Props) {
  return <BaseAlertDialog.Popup data-slot="alert-modal-popup" {...props} />;
}

export function AlertModalTitle({ ...props }: BaseAlertDialog.Title.Props) {
  return <BaseAlertDialog.Title data-slot="alert-modal-title" {...props} />;
}

export function AlertModalDescription({
  ...props
}: BaseAlertDialog.Description.Props) {
  return (
    <BaseAlertDialog.Description
      data-slot="alert-modal-description"
      {...props}
    />
  );
}

export function AlertModalClose({
  disabled,
  ...props
}: BaseAlertDialog.Close.Props) {
  return (
    <BaseAlertDialog.Close
      disabled={disabled}
      data-slot="alert-modal-close"
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}
