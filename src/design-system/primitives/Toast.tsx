"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";

/**
 * Toast Primitive
 *
 * Unstyled toast using Base UI for complete a11y and behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * Slots:
 * - Provider: Context for creating and managing toasts
 * - Portal: Portals the viewport outside DOM flow
 * - Viewport: Container that stacks visible toasts
 * - Root: Individual toast surface
 * - Content: Inner layout of a toast
 * - Title: Toast heading
 * - Description: Toast supporting text
 * - Close: Dismiss button
 * - Action: Optional action button
 * - Positioner: Positions an anchored toast
 * - Arrow: Arrow for anchored toasts
 *
 * State attributes:
 * - data-expanded: Viewport stack is expanded
 * - data-limited: Toast exceeded the visible limit
 * - data-behind: Toast is behind the frontmost toast
 * - data-starting-style: Enter animation
 * - data-ending-style: Exit animation
 * - data-swipe-direction: Direction the toast is being swiped
 */

/**
 * ToastProvider - Context for creating and managing toasts.
 * Does not render its own HTML element.
 */
export function ToastProvider({ ...props }: BaseToast.Provider.Props) {
  return <BaseToast.Provider data-slot="toast-provider" {...props} />;
}

/**
 * ToastPortal - Portals the viewport outside DOM flow.
 */
export function ToastPortal({ ...props }: BaseToast.Portal.Props) {
  return <BaseToast.Portal data-slot="toast-portal" {...props} />;
}

/**
 * ToastViewport - Container that stacks visible toasts.
 *
 * State attributes:
 * - data-expanded: Set while the toast stack is expanded
 */
export function ToastViewport({ ...props }: BaseToast.Viewport.Props) {
  return <BaseToast.Viewport data-slot="toast-viewport" {...props} />;
}

/**
 * ToastRoot - Individual toast surface.
 *
 * State attributes:
 * - data-expanded: Viewport stack is expanded
 * - data-limited: Toast exceeded the visible limit
 * - data-starting-style: Enter animation
 * - data-ending-style: Exit animation
 * - data-swipe-direction: Direction the toast is being swiped
 */
export function ToastRoot({ ...props }: BaseToast.Root.Props) {
  return <BaseToast.Root data-slot="toast-root" {...props} />;
}

/**
 * ToastContent - Inner layout of a toast.
 *
 * State attributes:
 * - data-expanded: Viewport stack is expanded
 * - data-behind: Toast is behind the frontmost toast
 */
export function ToastContent({ ...props }: BaseToast.Content.Props) {
  return <BaseToast.Content data-slot="toast-content" {...props} />;
}

/**
 * ToastTitle - Toast heading. Reads `title` from the toast object when empty.
 */
export function ToastTitle({ ...props }: BaseToast.Title.Props) {
  return <BaseToast.Title data-slot="toast-title" {...props} />;
}

/**
 * ToastDescription - Supporting text. Reads `description` from the toast object when empty.
 */
export function ToastDescription({ ...props }: BaseToast.Description.Props) {
  return <BaseToast.Description data-slot="toast-description" {...props} />;
}

/**
 * ToastClose - Dismisses the toast when clicked.
 */
export function ToastClose({ ...props }: BaseToast.Close.Props) {
  return <BaseToast.Close data-slot="toast-close" {...props} />;
}

/**
 * ToastAction - Optional action button. Reads `actionProps` from the toast object.
 */
export function ToastAction({ ...props }: BaseToast.Action.Props) {
  return <BaseToast.Action data-slot="toast-action" {...props} />;
}

/**
 * ToastPositioner - Positions an anchored toast relative to an element.
 */
export function ToastPositioner({ ...props }: BaseToast.Positioner.Props) {
  return <BaseToast.Positioner data-slot="toast-positioner" {...props} />;
}

/**
 * ToastArrow - Arrow for an anchored toast.
 */
export function ToastArrow({ ...props }: BaseToast.Arrow.Props) {
  return <BaseToast.Arrow data-slot="toast-arrow" {...props} />;
}

export const useToastManager = BaseToast.useToastManager;
export const createToastManager = BaseToast.createToastManager;
