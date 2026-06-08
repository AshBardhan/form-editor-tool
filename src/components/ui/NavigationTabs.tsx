"use client";

import { cn } from "@/lib/utils/styleUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function buildPath(basePath: string, segments: string[]): string {
  const cleaned = [basePath.replace(/\/$/, ""), ...segments.filter(Boolean)];

  return cleaned.join("/");
}

function getNavigationHref(
  item: NavigationItem,
  basePath: string,
  parentSegments: string[] = [],
): string {
  return buildPath(basePath, [...parentSegments, item.path]);
}

function isNavigationItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavigationItem {
  label: string;
  path: string;
  children?: NavigationItem[];
}

interface NavigationTabsProps {
  items: NavigationItem[];
  basePath: string;
  className?: string;
}

export function NavigationTabs({
  items,
  basePath,
  className,
}: NavigationTabsProps) {
  const pathname = usePathname();

  return (
    <nav className={cn(className)}>
      <ul className="flex gap-6">
        {items.map((item) => (
          <NavigationNode
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

interface NavigationNodeProps {
  item: NavigationItem;
  basePath: string;
  pathname: string;
  parentSegments?: string[];
}

function NavigationNode({
  item,
  basePath,
  pathname,
  parentSegments = [],
}: NavigationNodeProps) {
  const currentSegments = [...parentSegments, item.path];
  const href = getNavigationHref(item, basePath, parentSegments);
  const isActive = isNavigationItemActive(pathname, href);

  return (
    <li className="list-none relative">
      <Link
        href={href}
        className={cn(
          isActive ? " text-blue-600" : "text-gray-600 hover:text-gray-900",
          "font-medium",
        )}
      >
        {item.label}
      </Link>

      {item.children?.length ? (
        <ul className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 border bg-white rounded mt-1 p-2 flex flex-col gap-2">
          {item.children.map((child) => (
            <NavigationNode
              key={child.path}
              item={child}
              basePath={basePath}
              pathname={pathname}
              parentSegments={currentSegments}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
