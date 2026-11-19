"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ServiceIcon } from "@/components/icons";
import { ScaleCard } from "@/components/scale-card";
import { Button } from "@/components/ui/button";
import type { ServiceItem } from "@/lib/types";
import { t as pick } from "@/lib/defaults";

type ServiceGridProps = {
  services: ServiceItem[];
  telegramHref: string;
};

export function ServiceGrid({ services, telegramHref }: ServiceGridProps) {
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("category");

  return (
    <div className="grid gap-10 overflow-visible py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 lg:py-20">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="overflow-visible"
        >
          <ScaleCard className="flex h-full min-h-[240px] flex-col bg-gradient-to-br from-white/10 to-transparent">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-telegram/20 text-telegram">
              <ServiceIcon name={service.icon} className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              {pick(service.title, locale)}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {pick(service.description, locale)}
            </p>
            <div className="mt-5">
              <Button asChild size="sm">
                <a href={telegramHref} target="_blank" rel="noopener noreferrer">
                  {t("discuss")}
                </a>
              </Button>
            </div>
          </ScaleCard>
        </motion.div>
      ))}
    </div>
  );
}
