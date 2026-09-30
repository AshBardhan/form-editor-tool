import * as React from "react";
import { Field as BaseField } from "@base-ui/react/field";

export function Field({ ...props }: BaseField.Root.Props) {
  return <BaseField.Root {...props} />;
}

export function FieldLabel({ ...props }: BaseField.Label.Props) {
  return <BaseField.Label {...props} />;
}

export function FieldDescription({ ...props }: BaseField.Description.Props) {
  return <BaseField.Description {...props} />;
}

export const FieldControl = React.forwardRef<
  HTMLInputElement,
  BaseField.Control.Props
>(function FieldControl(
  { ...props }: BaseField.Control.Props,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  return <BaseField.Control ref={forwardedRef} {...props} />;
});

export function FieldError({ ...props }: BaseField.Error.Props) {
  return <BaseField.Error {...props} />;
}

export function FieldItem(props: BaseField.Item.Props) {
  return <BaseField.Item {...props} />;
}
