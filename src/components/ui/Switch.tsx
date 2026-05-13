"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/styleUtils";

interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          ref={ref}
          data-slot="switch"
          className={cn("peer sr-only", className)}
          {...props}
        />
        <div className="bg-gray-300 dark:bg-gray-700 peer-checked:bg-blue-500  focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center justify-start peer-checked:justify-end rounded-full shadow-xs outline-none peer-focus-visible:ring-[3px] peer-disabled:cursor-not-allowed peer-disabled:opacity-50 px-0.25">
          <div
            data-slot="switch-thumb"
            className="bg-white pointer-events-none block size-4 rounded-full ring-0 shadow-sm"
          />
        </div>
      </label>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
