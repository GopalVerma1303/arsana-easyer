import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes using `clsx` and `tailwind-merge`
 * to avoid conflicts and optimize styles.
 */
export function cn(...inputs: string[]) {
  return twMerge(clsx(inputs));
}
