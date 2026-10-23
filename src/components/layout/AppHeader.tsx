import Link from "next/link";
import { cn } from "@/lib/utils/styleUtils";
import { HomeIcon } from "lucide-react";
import { auth } from "@/auth";
import { UserMenu } from "@/components/auth/UserMenu";
import { AppThemeSwitcher } from "@/components/layout/AppThemeSwitcher";
import { PageContainer } from "@/components/layout/PageContainer";

interface AppHeaderProps {
  className?: string;
}

export const AppHeader = async ({ className }: AppHeaderProps) => {
  const session = await auth();

  return (
    <header className={cn("app-header", className)}>
      <PageContainer className="flex items-center justify-between">
        <Link href="/forms">
          <HomeIcon size={24} />
        </Link>

        <div className="flex items-center gap-3">
          <AppThemeSwitcher />
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
      </PageContainer>
    </header>
  );
};
