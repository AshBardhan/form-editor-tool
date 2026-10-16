"use client";

import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";

type ToggleGroupProps = BaseToggleGroup.Props<string>;
type ToggleProps = BaseToggle.Props<string>;

/**
 * ToggleGroup Primitive
 *
 * Shared exclusive or multiple state for a series of toggle buttons.
 * Zero styling - all appearance delegated to derived components.
 *
 * State attributes:
 * - data-disabled: Set when the group is disabled
 * - data-orientation: horizontal | vertical
 * - data-multiple: Present when multiple toggles can be pressed
 */
export function ToggleGroup({ disabled, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      disabled={disabled}
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}

/**
 * Toggle Primitive
 *
 * Two-state button that can be on or off.
 * Must be used inside a ToggleGroup for grouped selection.
 *
 * State attributes:
 * - data-disabled: Set when the toggle is disabled
 * - data-pressed: Set when the toggle is pressed
 */
export function Toggle({ disabled, ...props }: ToggleProps) {
  return (
    <BaseToggle
      disabled={disabled}
      data-disabled={disabled || undefined}
      {...props}
    />
  );
}
