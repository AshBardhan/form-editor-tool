"use client";

import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";

type RadioGroupProps = BaseRadioGroup.Props<string>;
type RadioGroupItemProps = BaseRadio.Root.Props<string>;

/**
 * RadioGroup Primitive
 *
 * Container for radio items using Base UI for behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * Wrap with RadioGroupItem components inside.
 */
export function RadioGroup({ ...props }: RadioGroupProps) {
  const { disabled, "aria-invalid": ariaInvalid, ...rest } = props;

  return (
    <BaseRadioGroup
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-disabled={disabled || undefined}
      data-invalid={ariaInvalid || undefined}
      {...rest}
    />
  );
}

/**
 * RadioGroupItem Primitive
 *
 * Individual radio item within a RadioGroup.
 * Must be used inside a RadioGroup component.
 *
 * State attributes:
 * - data-disabled: Set when item is disabled
 * - data-checked: Set when item is selected
 */
export function RadioGroupItem({ ...props }: RadioGroupItemProps) {
  const { value, disabled, "aria-invalid": ariaInvalid, ...rest } = props;

  return (
    <BaseRadio.Root
      value={value}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-disabled={disabled || undefined}
      data-invalid={ariaInvalid || undefined}
      {...rest}
    />
  );
}

/**
 * RadioGroupIndicator Primitive
 *
 * Visual mark shown while a radio item is selected.
 * Zero styling - all appearance delegated to derived components.
 */
export function RadioGroupIndicator({ ...props }: BaseRadio.Indicator.Props) {
  return <BaseRadio.Indicator data-slot="radio-group-indicator" {...props} />;
}
