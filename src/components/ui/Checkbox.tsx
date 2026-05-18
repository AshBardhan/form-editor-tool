"use client";

import { CheckIcon } from "lucide-react";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/styleUtils";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex self-start">
        <input
          type="checkbox"
          ref={ref}
          data-slot="checkbox"
          className={cn(
            "peer border-input dark:bg-input/10 dark:text-white dark:hover:bg-input/50 checked:bg-primary checked:text-primary-foreground dark:checked:bg-primary dark:hover:checked:bg-primary checked:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-sm border shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
            className,
          )}
          {...props}
        />
        <CheckIcon className="absolute size-3.5 text-white pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
