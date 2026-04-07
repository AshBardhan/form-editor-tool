"use client";

import clsx from "clsx";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const Skeleton = ({ width, height, className }: SkeletonProps) => {
  const getSkeletonWidth = () =>
    width ? (typeof width === "number" ? `${width}px` : width) : "100%";
  const getSkeletonHeight = () =>
    height ? (typeof height === "number" ? `${height}px` : height) : "10px";

  return (
    <div
      className={clsx("w-full bg-gray-200 rounded animate-pulse", className)}
      style={{ width: getSkeletonWidth(), height: getSkeletonHeight() }}
      role="status"
      aria-label="Loading..."
    ></div>
  );
};
