import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using `clsx` and merges them with `twMerge` for Tailwind CSS.
 * @param {...ClassValue[]} args - The class values to be combined and merged.
 * @returns {string} The combined and merged class name string.
 */
export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
