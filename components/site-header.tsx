"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";

export function SiteHeader({ telegramHref }: { telegramHref: string }) {
  const tHero = useTranslations("hero");
  const tNav = useTranslations("nav");

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <a
        href="#services"
        className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        {tNav("services")}
      </a>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <a href={telegramHref} target="_blank" rel="noopener noreferrer">
            {tHero("ctaTelegram")}
          </a>
        </Button>
      </div>
    </header>
  );
}
