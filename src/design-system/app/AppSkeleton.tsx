"use client";

import clsx from "clsx";

interface AppSkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function AppSkeleton({ width, height, className }: AppSkeletonProps) {
  const getSkeletonWidth = () =>
    width ? (typeof width === "number" ? `${width}px` : width) : "100%";
  const getSkeletonHeight = () =>
    height ? (typeof height === "number" ? `${height}px` : height) : "10px";

  return (
    <div
      className={clsx(
        "w-full bg-app-fg-muted/30 rounded animate-pulse",
        className,
      )}
      style={{ width: getSkeletonWidth(), height: getSkeletonHeight() }}
      role="status"
      aria-label="Loading..."
    ></div>
  );
}
