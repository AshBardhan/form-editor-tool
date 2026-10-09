"use client";

/**
 * User Menu
 * Dropdown menu for authenticated users
 */

import Link from "next/link";
import { CircleUserIcon, LogOutIcon, ShieldIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  AppMenu,
  AppMenuContent,
  AppMenuItem,
  AppMenuLinkItem,
  AppMenuSeparator,
  AppMenuTrigger,
} from "@/design-system/app/AppMenu";
import { AppBadge } from "@/design-system/app/AppBadge";
import { AppText } from "@/design-system/app/AppText";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const handleSignOut = async () => {
    // Force full page redirect to properly clear session
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <AppMenu>
      <AppMenuTrigger
        render={
          <button
            type="button"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="User menu"
          />
        }
      >
        <CircleUserIcon size={20} />
      </AppMenuTrigger>

      <AppMenuContent align="end" className="w-64">
        {/* User Info */}
        <div className="px-4 py-3 border-b border-app-border-subtle">
          <AppText variant="h6" className="truncate">
            {user.name || "User"}
          </AppText>
          <AppText variant="p" className="text-sm text-app-fg-muted truncate">
            {user.email}
          </AppText>
          <AppBadge
            label={user.role}
            variant="info"
            size="sm"
            className="mt-1"
          />
        </div>

        {/* Admin Panel Link */}
        {user.role === "ADMIN" && (
          <>
            <AppMenuLinkItem render={<Link href="/admin/users" />}>
              <ShieldIcon size={16} />
              Admin Panel
            </AppMenuLinkItem>
            <AppMenuSeparator />
          </>
        )}

        {/* Sign Out */}
        <AppMenuItem onSelect={handleSignOut} className="text-app-error">
          <LogOutIcon size={16} />
          Sign Out
        </AppMenuItem>
      </AppMenuContent>
    </AppMenu>
  );
}
