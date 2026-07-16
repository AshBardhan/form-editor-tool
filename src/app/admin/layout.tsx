/**
 * Admin Layout
 * Layout with sidebar navigation for admin pages
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  UsersIcon,
  FileTextIcon,
  BarChartIcon,
  SettingsIcon,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/forbidden");
  }

  const navItems = [
    { href: "/admin/users", icon: UsersIcon, label: "Users" },
    { href: "/admin/forms", icon: FileTextIcon, label: "Forms" },
    { href: "/admin/analytics", icon: BarChartIcon, label: "Analytics" },
    { href: "/admin/settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/forms"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="text-sm text-gray-600">{session.user.email}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
