import { type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/styleUtils";

const alertVariants = cva(
  "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "border-app-border-subtle bg-app-surface text-app-fg",
        success: "border-app-success/50 bg-app-success-subtle text-app-success",
        info: "border-app-info/50 bg-app-info-subtle text-app-info",
        warning: "border-app-warning/50 bg-app-warning-subtle text-app-warning",
        error: "border-app-error/50 bg-app-error-subtle text-app-error",
        destructive: "border-app-error/50 bg-app-error-subtle text-app-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type AlertVariantProps = VariantProps<typeof alertVariants>;

export type AppAlertVariant = NonNullable<AlertVariantProps["variant"]>;

export interface AppAlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    AlertVariantProps {
  icon?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

/**
 * AppAlert - Inline notification with named slots for icon, heading, description, and actions.
 */
export function AppAlert({
  className,
  variant,
  icon,
  heading,
  description,
  actions,
  children,
  ...props
}: AppAlertProps) {
  const hasContent = heading != null || description != null || children != null;

  return (
    <div
      role="alert"
      data-slot="app-alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon != null && (
        <div
          data-slot="app-alert-icon"
          className="shrink-0 [&>svg]:size-4 [&>svg]:text-current"
        >
          {icon}
        </div>
      )}

      {hasContent && (
        <div data-slot="app-alert-content" className="min-w-0 flex-1 space-y-1">
          {heading != null && (
            <div
              data-slot="app-alert-heading"
              className="font-medium leading-none tracking-tight"
            >
              {heading}
            </div>
          )}

          {description != null && (
            <div
              data-slot="app-alert-description"
              className="text-sm opacity-90 [&_p]:leading-relaxed"
            >
              {description}
            </div>
          )}

          {children}
        </div>
      )}

      {actions != null && (
        <div
          data-slot="app-alert-actions"
          className="ml-auto shrink-0 flex items-center gap-2"
        >
          {actions}
        </div>
      )}
    </div>
  );
}

export { alertVariants };
