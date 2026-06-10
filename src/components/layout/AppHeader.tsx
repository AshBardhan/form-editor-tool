import Link from "next/link";
import { cn } from "@/lib/utils/styleUtils";
import { CircleUserIcon } from "lucide-react";

interface AppHeaderProps {
  theme?: string;
  className?: string;
}

export const AppHeader = ({ theme, className }: AppHeaderProps) => {
  return (
    <header
      className={cn(
        "app-header",
        theme ? `app-header--${theme}` : "",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/">Form Editor Tool</Link>
        <CircleUserIcon size={20} />
      </div>
    </header>
  );
};
