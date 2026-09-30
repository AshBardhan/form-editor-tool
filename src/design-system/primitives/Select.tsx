"use client";

import { Select as BaseSelect } from "@base-ui/react/select";

/**
 * Select Primitive
 *
 * Dropdown select using Base UI for behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * Components: SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectGroupLabel
 */
export function Select({ ...props }: BaseSelect.Root.Props<any>) {
  const { disabled, ...rest } = props;

  return (
    <BaseSelect.Root
      disabled={disabled}
      data-disabled={disabled || undefined}
      {...rest}
    />
  );
}

/**
 * SelectTrigger - Button that opens the dropdown
 */
export function SelectTrigger({ ...props }: BaseSelect.Trigger.Props) {
  return <BaseSelect.Trigger {...props} />;
}

/**
 * SelectContent - Container for options (portalled)
 */
export function SelectContent({ ...props }: BaseSelect.Positioner.Props) {
  return (
    <BaseSelect.Positioner {...props}>
      <BaseSelect.Popup>{props.children}</BaseSelect.Popup>
    </BaseSelect.Positioner>
  );
}

/**
 * SelectItem - Individual option
 *
 * State attributes:
 * - data-disabled: Set when option is disabled
 * - data-selected: Set when option is currently selected
 */
export function SelectItem({ ...props }: BaseSelect.Item.Props) {
  const { disabled, ...rest } = props;

  return (
    <BaseSelect.Item
      disabled={disabled}
      data-disabled={disabled || undefined}
      {...rest}
    />
  );
}

/**
 * SelectGroup - Grouping container for options
 */
export function SelectGroup({ ...props }: BaseSelect.Group.Props) {
  return <BaseSelect.Group {...props} />;
}

/**
 * SelectGroupLabel - Label for a group
 */
export function SelectGroupLabel({ ...props }: BaseSelect.GroupLabel.Props) {
  return <BaseSelect.GroupLabel {...props} />;
}
