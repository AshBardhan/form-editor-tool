"use client";

import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { ComponentProps } from "react";

/**
 * Separator Primitive
 *
 * Base separator using Base UI for behavior.
 * Zero styling - all appearance delegated to derived components.
 *
 * State attributes:
 * - data-orientation: Set the orientation of the separator
 */
export function Separator({ ...props }: ComponentProps<typeof BaseSeparator>) {
  return <BaseSeparator {...props} />;
}
