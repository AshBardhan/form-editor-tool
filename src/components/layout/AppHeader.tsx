import Link from "next/link";
import { cn } from "@/lib/utils/styleUtils";
import { HomeIcon } from "lucide-react";
import { auth } from "@/auth";
import { UserMenu } from "@/components/auth/UserMenu";

interface AppHeaderProps {
  theme?: string;
  className?: string;
}

export const AppHeader = async ({ theme, className }: AppHeaderProps) => {
  const session = await auth();

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

        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Link
            href="/signin"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
