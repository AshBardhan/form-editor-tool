import * as React from "react";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";

export function Fieldset(props: BaseFieldset.Root.Props) {
  return <BaseFieldset.Root {...props} />;
}

export function FieldsetLegend({ ...props }: BaseFieldset.Legend.Props) {
  return <BaseFieldset.Legend {...props} />;
}
