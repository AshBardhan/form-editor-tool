import Link from "next/link";
import { cn } from "@/lib/utils/styleUtils";
import { CircleUserIcon, HomeIcon } from "lucide-react";

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
        <Link href="/">
          <HomeIcon size={24} />
        </Link>
        <CircleUserIcon size={20} />
      </div>
    </header>
  );
};
