"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { ChevronUp, ChevronDown, Check } from "lucide-react";

/**
 * Select Primitive
 *
 * Unstyled dropdown select using Base UI for complete a11y and behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * Slots:
 * - Root: Container managing state
 * - Label: Optional label for the select
 * - Trigger: Button that opens the dropdown
 * - Value: Display area for selected value with placeholder support
 * - Icon: Caret icon (ChevronDown in unstyled form)
 * - Portal: Portals the dropdown outside DOM flow
 * - Positioner: Positions the dropdown relative to trigger
 * - Popup: Dropdown container
 * - ScrollUpArrow: Scroll indicator at top
 * - List: Container for items
 * - Item: Individual option
 * - ItemText: Item text content
 * - ItemIndicator: Selected indicator (checkmark)
 * - ScrollDownArrow: Scroll indicator at bottom
 * - Group: Grouping container for items
 * - GroupLabel: Label for a group
 */

/**
 * SelectRoot - Container managing select state
 */
export function SelectRoot<TValue extends string | number = string>({
  disabled,
  ...props
}: BaseSelect.Root.Props<TValue>) {
  return (
    <BaseSelect.Root
      disabled={disabled}
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

/**
 * SelectLabel - Optional label for the select
 */
export function SelectLabel({ ...props }: BaseSelect.Label.Props) {
  return <BaseSelect.Label data-slot="select-label" {...props} />;
}

/**
 * SelectTrigger - Button that opens the dropdown
 *
 * State attributes:
 * - data-disabled: Set when trigger is disabled
 * - aria-expanded: Reflects open state
 * - aria-haspopup: Indicates popup availability
 */
export function SelectTrigger({ ...props }: BaseSelect.Trigger.Props) {
  return <BaseSelect.Trigger data-slot="select-trigger" {...props} />;
}

/**
 * SelectValue - Display area for selected value with placeholder support
 *
 * Props:
 * - placeholder: Text shown when no value is selected
 *
 * State attributes:
 * - data-placeholder: Set when displaying placeholder
 */
export function SelectValue({ placeholder, ...props }: BaseSelect.Value.Props) {
  return (
    <BaseSelect.Value
      data-slot="select-value"
      placeholder={placeholder}
      {...props}
    />
  );
}

/**
 * SelectIcon - Icon slot for trigger (typically caret icon)
 * Should contain an icon component, defaults to ChevronDown
 */
export function SelectIcon({ ...props }: BaseSelect.Icon.Props) {
  return (
    <BaseSelect.Icon data-slot="select-icon" {...props}>
      <ChevronDown className="size-4" />
    </BaseSelect.Icon>
  );
}

/**
 * SelectPortal - Portals the dropdown outside DOM flow
 */
export function SelectPortal({ ...props }: BaseSelect.Portal.Props) {
  return <BaseSelect.Portal data-slot="select-portal" {...props} />;
}

/**
 * SelectPositioner - Positions dropdown relative to trigger
 *
 * Props:
 * - sideOffset: Distance from trigger (default: 0)
 * - align: Alignment relative to trigger
 * - side: Which side to position (top/bottom/left/right)
 */
export function SelectPositioner({ ...props }: BaseSelect.Positioner.Props) {
  return <BaseSelect.Positioner data-slot="select-positioner" {...props} />;
}

/**
 * SelectPopup - Dropdown container
 *
 * State attributes:
 * - data-starting-style: Animation start state
 * - data-ending-style: Animation end state
 */
export function SelectPopup({ ...props }: BaseSelect.Popup.Props) {
  return <BaseSelect.Popup data-slot="select-popup" {...props} />;
}

/**
 * SelectScrollUpArrow - Scroll indicator shown at top when list is scrollable
 */
export function SelectScrollUpArrow({
  ...props
}: BaseSelect.ScrollUpArrow.Props) {
  return (
    <BaseSelect.ScrollUpArrow data-slot="select-scroll-up-arrow" {...props}>
      <ChevronUp className="size-4" />
    </BaseSelect.ScrollUpArrow>
  );
}

/**
 * SelectList - Container for select items
 */
export function SelectList({ ...props }: BaseSelect.List.Props) {
  return <BaseSelect.List data-slot="select-list" {...props} />;
}

/**
 * SelectItem - Individual option
 *
 * Props:
 * - value: Unique identifier for the item
 * - disabled: Whether item is disabled
 *
 * State attributes:
 * - data-disabled: Set when option is disabled
 * - data-selected: Set when option is selected
 * - data-highlighted: Set when focused/hovered during keyboard navigation
 */
export function SelectItem({ disabled, ...props }: BaseSelect.Item.Props) {
  return (
    <BaseSelect.Item
      disabled={disabled}
      data-slot="select-item"
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

/**
 * SelectItemText - Text content of a select item
 */
export function SelectItemText({ ...props }: BaseSelect.ItemText.Props) {
  return <BaseSelect.ItemText data-slot="select-item-text" {...props} />;
}

/**
 * SelectItemIndicator - Checkmark or indicator shown for selected item
 * Typically contains a Check icon
 */
export function SelectItemIndicator({
  ...props
}: BaseSelect.ItemIndicator.Props) {
  return (
    <BaseSelect.ItemIndicator data-slot="select-item-indicator" {...props}>
      <Check className="size-4" />
    </BaseSelect.ItemIndicator>
  );
}

/**
 * SelectScrollDownArrow - Scroll indicator shown at bottom when list is scrollable
 */
export function SelectScrollDownArrow({
  ...props
}: BaseSelect.ScrollDownArrow.Props) {
  return (
    <BaseSelect.ScrollDownArrow data-slot="select-scroll-down-arrow" {...props}>
      <ChevronDown className="size-4" />
    </BaseSelect.ScrollDownArrow>
  );
}

/**
 * SelectGroup - Grouping container for related items
 *
 * Typically wraps multiple SelectItem components with a SelectGroupLabel
 */
export function SelectGroup({ ...props }: BaseSelect.Group.Props) {
  return <BaseSelect.Group data-slot="select-group" {...props} />;
}

/**
 * SelectGroupLabel - Label for a select group
 */
export function SelectGroupLabel({ ...props }: BaseSelect.GroupLabel.Props) {
  return <BaseSelect.GroupLabel data-slot="select-group-label" {...props} />;
}
