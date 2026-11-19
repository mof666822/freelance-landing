"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { ServiceIcon } from "@/components/icons";
import { ScaleCard } from "@/components/scale-card";
import type { CategoryContent } from "@/lib/types";
import { t as pick } from "@/lib/defaults";

type CategoryCardsProps = {
  sites: CategoryContent;
  bots: CategoryContent;
};

export function CategoryCards({ sites, bots }: CategoryCardsProps) {
  const locale = useLocale() as "ru" | "en";
  const router = useRouter();
  const t = useTranslations("sections");
  const tCat = useTranslations("category");

  const items = [
    { key: "sites" as const, data: sites, icon: "Layout" },
    { key: "bots" as const, data: bots, icon: "Bot" },
  ];

  return (
    <section id="services" className="relative z-10 overflow-visible py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="mb-8"
          style={{ animation: "fadeSlideUp 0.45s ease both" }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("whatIDo")}</h2>
          <p className="mt-2 text-muted-foreground">{t("whatIDoHint")}</p>
        </div>

        <div className="flex flex-col gap-10 overflow-visible py-16 md:flex-row md:gap-12 md:py-24">
          {items.map((item, index) => (
            <div
              key={item.key}
              className="flex-1 overflow-visible"
              style={{
                animation: `fadeSlideUp 0.45s ease ${index * 0.08}s both`,
              }}
            >
              <ScaleCard
                href={`/${locale}/${item.key}`}
                onNavigate={() => router.push(`/${item.key}`)}
                className="min-h-[220px] cursor-pointer bg-gradient-to-br from-white/10 to-white/[0.03]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-telegram/20 text-telegram">
                  <ServiceIcon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {pick(item.data.title, locale)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {pick(item.data.description, locale)}
                </p>
                <p className="mt-6 text-sm font-medium text-neon">{tCat("more")}</p>
              </ScaleCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
