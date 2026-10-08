import { cn } from "@/lib/utils/styleUtils";

interface PageHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const PageHeader = ({ className, children }: PageHeaderProps) => {
  return <div className={cn("page-header", className)}>{children}</div>;
};
