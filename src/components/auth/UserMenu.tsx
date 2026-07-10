"use client";

/**
 * User Menu
 * Dropdown menu for authenticated users
 */

import { useRouter } from "next/navigation";
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
import Text from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/signin");
    router.refresh();
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
          <Text className="font-medium text-gray-900 truncate">
            {user.name || "User"}
          </Text>
          <Text className="text-xs text-gray-500 truncate">{user.email}</Text>
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
