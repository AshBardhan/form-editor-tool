"use client";

/**
 * Form Field Component
 * Input with label support
 */

import { ComponentProps } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface FormFieldProps extends ComponentProps<"input"> {
  label?: string;
  error?: string;
  hint?: string;
}

export function FormField({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: FormFieldProps) {
  const fieldId =
    id ??
    (label ? `field-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <Input id={fieldId} className={className} {...props} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {hint && !error && <p className="text-sm text-gray-500">{hint}</p>}
    </div>
  );
}
