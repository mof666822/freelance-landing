"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export function BackLink() {
  const t = useTranslations("category");

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-telegram"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {t("back")}
    </Link>
  );
}
