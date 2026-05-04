import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils/styleUtils";

// Alert Types
export type AlertVariant =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "destructive";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-8",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/5 dark:bg-destructive/10",
        success:
          "border-green-500/50 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-100 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        info: "border-blue-500/50 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        warning:
          "border-amber-500/50 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-100 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        error:
          "border-red-500/50 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100 [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
}

type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed opacity-90", className)}
      {...props}
    />
  );
}

type AlertActionProps = React.HTMLAttributes<HTMLDivElement>;

function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div
      className={cn(
        "absolute top-3 right-3 [&>button]:h-auto [&>button]:p-0 [&>button]:px-2 [&>button]:py-1",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
