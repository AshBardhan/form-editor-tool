"use client";

import { cn } from "@/lib/utils/styleUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppNavigationItem {
  label: string;
  path: string;
}

interface AppNavigationTabsProps {
  items: AppNavigationItem[];
  basePath: string;
  className?: string;
}

interface AppNavigationTabProps {
  item: AppNavigationItem;
  basePath: string;
  pathname: string;
}

function getNavigationHref(item: AppNavigationItem, basePath: string): string {
  return `${basePath}/${item.path}`;
}

function isNavigationTabActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function AppNavigationTab({ item, basePath, pathname }: AppNavigationTabProps) {
  const href = getNavigationHref(item, basePath);
  const isActive = isNavigationTabActive(pathname, href);

  return (
    <li className="list-none relative">
      <Link
        href={href}
        className={cn(
          "inline-flex py-2 font-medium border-b-2",
          isActive
            ? "text-app-brand border-app-brand"
            : "text-app-fg-muted border-transparent hover:text-app-fg",
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}

export function AppNavigationTabs({
  items,
  basePath,
  className,
}: AppNavigationTabsProps) {
  const pathname = usePathname();

  return (
    <nav className={cn(className)}>
      <ul className="flex gap-6">
        {items.map((item) => (
          <AppNavigationTab
            key={item.path}
            item={item}
            basePath={basePath}
            pathname={pathname}
          />
        ))}
      </ul>
    </nav>
  );
}
