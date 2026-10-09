"use client";

import {
  createContext,
  useContext,
  useRef,
  type RefObject,
} from "react";
import { cn } from "@/lib/utils/styleUtils";
import {
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuLinkItem,
  MenuSeparator,
  MenuGroup,
  MenuGroupLabel,
} from "@/design-system/primitives";
import { Menu as BaseMenu } from "@base-ui/react/menu";

type MenuActions = NonNullable<BaseMenu.Root.Actions>;

const AppMenuActionsContext =
  createContext<RefObject<MenuActions | null> | null>(null);

const menuTriggerClass =
  "inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-app-border-strong bg-app-surface px-3 text-sm leading-none font-medium whitespace-nowrap text-app-fg select-none outline-none transition-colors hover:not-data-disabled:bg-app-surface-muted active:not-data-disabled:bg-app-border-subtle data-pressed:bg-app-surface-muted data-popup-open:bg-app-surface-muted data-disabled:cursor-not-allowed data-disabled:border-app-border-subtle data-disabled:text-app-fg-muted focus-visible:ring-[3px] focus-visible:ring-app-brand/30 [&_svg]:pointer-events-none [&_svg]:size-4";

const menuPopupClass =
  "relative z-50 min-w-40 origin-(--transform-origin) overflow-hidden rounded-md border border-app-border-subtle bg-app-surface py-1 text-sm text-app-fg shadow-lg outline-none transition-[scale,opacity] duration-100 ease-out data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-ending-style:scale-[0.98] data-ending-style:opacity-0";

const menuItemClass =
  "relative flex cursor-default items-center gap-2 py-2 pr-8 pl-4 text-sm leading-5 outline-none select-none data-highlighted:z-0 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-app-surface-muted data-highlighted:before:content-[''] data-disabled:text-app-fg-muted [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4";

const menuSeparatorClass = "mx-1 my-1 h-px bg-app-border-subtle";

const menuGroupLabelClass =
  "px-4 pt-2 pb-1 text-xs font-medium leading-4 text-app-fg-muted";

export type AppMenuProps = BaseMenu.Root.Props;

/**
 * AppMenu - Themed menu root.
 * Page scroll stays available while the menu is open.
 */
export function AppMenu({
  modal = false,
  actionsRef: actionsRefProp,
  ...props
}: AppMenuProps) {
  const actionsRef = useRef<MenuActions | null>(null);
  const ref = actionsRefProp ?? actionsRef;

  return (
    <AppMenuActionsContext.Provider value={ref}>
      <MenuRoot modal={modal} actionsRef={ref} {...props} />
    </AppMenuActionsContext.Provider>
  );
}

export type AppMenuTriggerProps = BaseMenu.Trigger.Props;

/**
 * AppMenuTrigger - Themed button that opens the menu.
 * Pass `render` to compose an existing button and skip the default trigger chrome.
 */
export function AppMenuTrigger({
  className,
  render,
  ...props
}: AppMenuTriggerProps) {
  return (
    <MenuTrigger
      data-slot="app-menu-trigger"
      render={render}
      className={cn(render ? undefined : menuTriggerClass, className)}
      {...props}
    />
  );
}

export type AppMenuContentProps = BaseMenu.Popup.Props & {
  align?: BaseMenu.Positioner.Props["align"];
  side?: BaseMenu.Positioner.Props["side"];
  sideOffset?: BaseMenu.Positioner.Props["sideOffset"];
  alignOffset?: BaseMenu.Positioner.Props["alignOffset"];
};

/**
 * AppMenuContent - Portaled, positioned menu surface.
 */
export function AppMenuContent({
  align = "start",
  side = "bottom",
  sideOffset = 8,
  alignOffset,
  className,
  ...props
}: AppMenuContentProps) {
  return (
    <MenuPortal>
      <MenuPositioner
        data-slot="app-menu-positioner"
        className="z-50 outline-none"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <MenuPopup
          data-slot="app-menu-popup"
          className={cn(menuPopupClass, className)}
          {...props}
        />
      </MenuPositioner>
    </MenuPortal>
  );
}

export type AppMenuItemProps = BaseMenu.Item.Props & {
  /**
   * Called when the item is chosen.
   * Call `preventDefault()` on the event to keep the menu open.
   */
  onSelect?: (event: Event) => void;
};

/**
 * AppMenuItem - Themed menu action.
 * Closes the menu after selection unless `closeOnClick` is false
 * or `onSelect` calls `preventDefault()`.
 */
export function AppMenuItem({
  className,
  disabled,
  onSelect,
  onClick,
  closeOnClick = true,
  ...props
}: AppMenuItemProps) {
  const actionsRef = useContext(AppMenuActionsContext);

  return (
    <MenuItem
      disabled={disabled}
      data-slot="app-menu-item"
      closeOnClick={false}
      className={cn(menuItemClass, className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.baseUIHandlerPrevented) return;

        let shouldClose = closeOnClick;
        if (onSelect) {
          const selectEvent = new Event("select", {
            bubbles: true,
            cancelable: true,
          });
          onSelect(selectEvent);
          if (selectEvent.defaultPrevented) shouldClose = false;
        }
        if (shouldClose) actionsRef?.current?.close();
      }}
      {...props}
    />
  );
}

export type AppMenuLinkItemProps = BaseMenu.LinkItem.Props;

/**
 * AppMenuLinkItem - Themed menu item that navigates.
 */
export function AppMenuLinkItem({
  className,
  closeOnClick = true,
  ...props
}: AppMenuLinkItemProps) {
  return (
    <MenuLinkItem
      data-slot="app-menu-link-item"
      closeOnClick={closeOnClick}
      className={cn(menuItemClass, className)}
      {...props}
    />
  );
}

export type AppMenuSeparatorProps = BaseMenu.Separator.Props;

export function AppMenuSeparator({
  className,
  ...props
}: AppMenuSeparatorProps) {
  return (
    <MenuSeparator
      data-slot="app-menu-separator"
      className={cn(menuSeparatorClass, className)}
      {...props}
    />
  );
}

export type AppMenuGroupProps = BaseMenu.Group.Props;

export function AppMenuGroup({ className, ...props }: AppMenuGroupProps) {
  return (
    <MenuGroup data-slot="app-menu-group" className={className} {...props} />
  );
}

export type AppMenuGroupLabelProps = BaseMenu.GroupLabel.Props;

export function AppMenuGroupLabel({
  className,
  ...props
}: AppMenuGroupLabelProps) {
  return (
    <MenuGroupLabel
      data-slot="app-menu-group-label"
      className={cn(menuGroupLabelClass, className)}
      {...props}
    />
  );
}
