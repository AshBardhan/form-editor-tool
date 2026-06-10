"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/styleUtils";

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const PageContainer = ({
  children,
  className,
  ...props
}: PageContainerProps) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4", className)} {...props}>
      {children}
    </div>
  );
};
