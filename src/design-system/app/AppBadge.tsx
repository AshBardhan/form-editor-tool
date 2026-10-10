import clsx from "clsx";

type StatusVariant = "success" | "warning" | "error" | "info" | "neutral";

interface AppBadgeProps {
  label: string;
  variant?: StatusVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantClasses = {
  success: "bg-app-success-subtle text-app-success border-app-success",
  warning: "bg-app-warning-subtle text-app-warning border-app-warning",
  error: "bg-app-error-subtle text-app-error border-app-error",
  info: "bg-app-info-subtle text-app-info border-app-info",
  neutral: "bg-app-surface-muted text-app-fg border-app-border-strong",
};

const sizeClasses = {
  sm: "sm:px-2 sm:py-0.5 px-1 py-0.5 text-xs",
  md: "sm:px-2.5 sm:py-0.5 px-2 py-0.5 text-xs",
  lg: "sm:px-3 sm:py-1 px-3 py-1 text-sm",
};

export function AppBadge({
  label,
  variant = "neutral",
  size = "md",
  className,
}: AppBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center text-center rounded-full font-medium border",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {label}
    </span>
  );
}
