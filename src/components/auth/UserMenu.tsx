"use client";

/**
 * User Menu
 * Dropdown menu for authenticated users
 */

import Link from "next/link";
import { CircleUserIcon, LogOutIcon, ShieldIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Badge } from "@/components/ui/Badge";
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
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="User menu"
      >
        <CircleUserIcon size={20} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {/* User Info */}
        <div className="px-2 py-3 border-b border-gray-100">
          <AppText variant="h6" className="truncate">
            {user.name || "User"}
          </AppText>
          <AppText variant="p" className="text-sm text-app-fg-muted truncate">
            {user.email}
          </AppText>
          <Badge label={user.role} variant="info" size="sm" className="mt-1" />
        </div>

        {/* Admin Panel Link */}
        {user.role === "ADMIN" && (
          <>
            <DropdownMenuItem>
              <Link
                href="/admin/users"
                className="flex items-center gap-2 w-full"
              >
                <ShieldIcon size={16} />
                Admin Panel
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Sign Out */}
        <DropdownMenuItem
          onSelect={handleSignOut}
          className="flex items-center gap-2 text-red-600 hover:bg-red-50 focus:bg-red-50"
        >
          <LogOutIcon size={16} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
