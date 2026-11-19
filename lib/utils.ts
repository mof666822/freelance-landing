import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function telegramUrl(username?: string | null) {
  const clean = (username || process.env.TELEGRAM_USERNAME || "mangerssh").replace(
    /^@/,
    "",
  );
  return `https://t.me/${clean}`;
}
