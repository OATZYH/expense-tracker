import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalize(string) {
  if (typeof string !== "string") {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}