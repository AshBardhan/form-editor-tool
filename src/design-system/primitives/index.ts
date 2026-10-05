/**
 * Design System Primitives
 *
 * Low-level, unstyled components focused on behavior and accessibility.
 * These primitives expose data-* attributes for state that derived components
 * can style against. No appearance classes, styles, or visual opinions.
 *
 * Built on Base UI for complex widgets (Button, Checkbox, CheckboxGroup, RadioGroup, Select, Switch)
 * and native HTML elements for simple controls (Input, TextArea, Label, Text).
 *
 * State Attributes Contract:
 * - data-disabled: Element is disabled
 * - data-invalid: Element has validation error (aria-invalid)
 * - data-checked: Checkbox/radio/switch is checked
 * - data-selected: Select item is selected
 * - data-open: Dropdown/popover is open
 * - data-required: Label marks required field
 *
 * All primitives forward className and props untouched.
 */

// Text input
export { Input } from "./Input";

// Field
export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldControl,
  FieldError,
  FieldItem,
} from "./Field";

// Fieldset
export { Fieldset, FieldsetLegend } from "./Fieldset";

// Button
export { Button } from "./Button";

// Checkbox
export { Checkbox, CheckboxIndicator } from "./Checkbox";

// Checkbox Group
export { CheckboxGroup } from "./CheckboxGroup";

// Radio Group
export { RadioGroup, RadioGroupItem, RadioGroupIndicator } from "./RadioGroup";

// Text Area
export { TextArea } from "./TextArea";

// Select
export {
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectPositioner,
  SelectPopup,
  SelectScrollUpArrow,
  SelectList,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectScrollDownArrow,
  SelectGroup,
  SelectGroupLabel,
} from "./Select";

// Label
export { Label } from "./Label";

// Text
export { Text } from "./Text";

// Switch
export { Switch } from "./Switch";
