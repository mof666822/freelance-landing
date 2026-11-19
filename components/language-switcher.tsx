"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const switchLocale = (next: "ru" | "en") => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      {(["ru", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-telegram",
            locale === code
              ? "bg-telegram text-white"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={locale === code}
        >
          {t(code)}
        </button>
      ))}
    </div>
  );
}
