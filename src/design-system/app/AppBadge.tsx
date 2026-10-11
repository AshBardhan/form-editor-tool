import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";

const badgeVariants = cva(
  "inline-flex items-center text-center rounded-full font-medium border",
  {
    variants: {
      variant: {
        success: "bg-app-success-subtle text-app-success border-app-success",
        warning: "bg-app-warning-subtle text-app-warning border-app-warning",
        error: "bg-app-error-subtle text-app-error border-app-error",
        info: "bg-app-info-subtle text-app-info border-app-info",
        neutral: "bg-app-surface-muted text-app-fg border-app-border-strong",
      },
      size: {
        sm: "px-1 py-0.5 text-xs sm:px-2 sm:py-0.5",
        md: "px-2 py-0.5 text-xs sm:px-2.5 sm:py-0.5",
        lg: "px-3 py-1 text-sm sm:px-3",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

interface AppBadgeProps extends VariantProps<typeof badgeVariants> {
  label: string;
  className?: string;
}

export function AppBadge({
  label,
  variant = "neutral",
  size = "md",
  className,
}: AppBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))}>
      {label}
    </span>
  );
}
