import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const storage = {
  get: <T>(key: string): string | null => {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(key);
    if (item !== null) {
      try {
        return item;
      } catch {
        console.error(`item with key: ${key} not found`);
        return null;
      }
    }
    return null;
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Error setting localStorage item with key: ${key}`);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};
