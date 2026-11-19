"use client";

import { useLocale, useTranslations } from "next-intl";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactItem } from "@/lib/types";
import { t as pick } from "@/lib/defaults";

type ContactsFooterProps = {
  primary: ContactItem;
  secondary: ContactItem;
};

export function ContactsFooter({ primary, secondary }: ContactsFooterProps) {
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("sections");
  const tFooter = useTranslations("footer");

  return (
    <footer className="border-t border-white/10 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>
          <h2 className="mb-6 text-3xl font-bold text-white">{t("contacts")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button asChild size="lg" className="h-14 text-base">
              <a href={primary.url} target="_blank" rel="noopener noreferrer">
                <Send className="h-5 w-5" aria-hidden="true" />
                {pick(primary.label, locale)}
              </a>
            </Button>
            <Button asChild size="lg" variant="neon" className="h-14 text-base">
              <a href={secondary.url} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {pick(secondary.label, locale)}
              </a>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">{tFooter("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
