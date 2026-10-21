import type { ReactNode } from "react";
import { cn } from "@/lib/utils/styleUtils";

export type DemoScope = "app" | "form";

const headingClass: Record<DemoScope, string> = {
  app: "text-app-fg-heading",
  form: "text-form-fg-heading",
};

const descriptionClass: Record<DemoScope, string> = {
  app: "text-app-fg-muted",
  form: "text-form-fg-muted",
};

interface DemoSectionProps {
  title: string;
  description?: string;
  scope: DemoScope;
  children: ReactNode;
}

export function DemoSection({
  title,
  description,
  scope,
  children,
}: DemoSectionProps) {
  return (
    <section>
      <h3 className={cn("text-lg font-semibold mb-1", headingClass[scope])}>
        {title}
      </h3>
      {description ? (
        <p className={cn("text-sm mb-4", descriptionClass[scope])}>
          {description}
        </p>
      ) : null}
      {children}
    </section>
  );
}

interface DemoBlockProps {
  title: string;
  scope: DemoScope;
  children: ReactNode;
  className?: string;
}

export function DemoBlock({
  title,
  scope,
  children,
  className,
}: DemoBlockProps) {
  return (
    <div className={className}>
      <h4 className={cn("text-sm font-semibold mb-2", headingClass[scope])}>
        {title}
      </h4>
      {children}
    </div>
  );
}
