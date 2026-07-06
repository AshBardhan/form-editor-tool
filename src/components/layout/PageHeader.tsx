import { cn } from "@/lib/utils/styleUtils";

interface PageHeaderProps {
  theme?: string;
  className?: string;
  children: React.ReactNode;
}

export const PageHeader = ({ theme, className, children }: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "page-header",
        theme ? `page-header--${theme}` : "",
        className,
      )}
    >
      {children}
    </div>
  );
};
