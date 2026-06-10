import { cn } from "@/lib/utils/styleUtils";

interface AppContentProps {
  theme?: string;
  className?: string;
  children: React.ReactNode;
}

export const AppContent = ({ theme, className, children }: AppContentProps) => {
  return (
    <div
      className={cn(
        "app-content",
        theme ? `app-content--${theme}` : "",
        className,
      )}
    >
      {children}
    </div>
  );
};
