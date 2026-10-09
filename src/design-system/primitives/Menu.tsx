"use client";

import { Menu as BaseMenu } from "@base-ui/react/menu";

/**
 * Menu Primitive
 *
 * Unstyled menu using Base UI for complete a11y and behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * Slots:
 * - Root: Container managing open state
 * - Trigger: Button that opens the menu
 * - Portal: Portals the menu outside DOM flow
 * - Positioner: Positions the menu relative to the trigger
 * - Popup: Menu container
 * - Item: Individual action
 * - LinkItem: Menu item that navigates
 * - Separator: Visual divider between items
 * - Group: Grouping container for items
 * - GroupLabel: Label for a group
 *
 * State attributes:
 * - data-disabled: Trigger or item is disabled
 * - data-highlighted: Item is focused or hovered
 * - data-popup-open: Menu opened by this trigger is open
 * - data-pressed: Trigger is pressed
 * - data-starting-style: Popup enter animation
 * - data-ending-style: Popup exit animation
 */

/**
 * MenuRoot - Container managing menu state.
 * Does not render its own HTML element.
 */
export function MenuRoot({ ...props }: BaseMenu.Root.Props) {
  return <BaseMenu.Root data-slot="menu-root" {...props} />;
}

/**
 * MenuTrigger - Button that opens the menu.
 *
 * State attributes:
 * - data-disabled: Set when the trigger is disabled
 * - data-popup-open: Set while the menu opened by this trigger is open
 * - data-pressed: Set while the trigger is pressed
 */
export function MenuTrigger({ disabled, ...props }: BaseMenu.Trigger.Props) {
  return (
    <BaseMenu.Trigger
      disabled={disabled}
      data-slot="menu-trigger"
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

/**
 * MenuPortal - Portals the menu outside DOM flow.
 */
export function MenuPortal({ ...props }: BaseMenu.Portal.Props) {
  return <BaseMenu.Portal data-slot="menu-portal" {...props} />;
}

/**
 * MenuPositioner - Positions the menu relative to the trigger.
 */
export function MenuPositioner({ ...props }: BaseMenu.Positioner.Props) {
  return <BaseMenu.Positioner data-slot="menu-positioner" {...props} />;
}

/**
 * MenuPopup - Container for menu items.
 *
 * State attributes:
 * - data-open / data-closed: Reflects menu visibility
 * - data-starting-style: Animation start state
 * - data-ending-style: Animation end state
 */
export function MenuPopup({ ...props }: BaseMenu.Popup.Props) {
  return <BaseMenu.Popup data-slot="menu-popup" {...props} />;
}

/**
 * MenuItem - Individual menu action.
 *
 * State attributes:
 * - data-disabled: Set when the item is disabled
 * - data-highlighted: Set when the item is focused or hovered
 */
export function MenuItem({ disabled, ...props }: BaseMenu.Item.Props) {
  return (
    <BaseMenu.Item
      disabled={disabled}
      data-slot="menu-item"
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

/**
 * MenuLinkItem - Menu item that renders a link.
 *
 * State attributes:
 * - data-highlighted: Set when the item is focused or hovered
 */
export function MenuLinkItem({ ...props }: BaseMenu.LinkItem.Props) {
  return <BaseMenu.LinkItem data-slot="menu-link-item" {...props} />;
}

/**
 * MenuSeparator - Visual divider between menu items.
 */
export function MenuSeparator({ ...props }: BaseMenu.Separator.Props) {
  return <BaseMenu.Separator data-slot="menu-separator" {...props} />;
}

/**
 * MenuGroup - Groups related menu items.
 */
export function MenuGroup({ ...props }: BaseMenu.Group.Props) {
  return <BaseMenu.Group data-slot="menu-group" {...props} />;
}

/**
 * MenuGroupLabel - Accessible label for a menu group.
 */
export function MenuGroupLabel({ ...props }: BaseMenu.GroupLabel.Props) {
  return <BaseMenu.GroupLabel data-slot="menu-group-label" {...props} />;
}
