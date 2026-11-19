"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Particles } from "@/components/particles";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  telegramHref: string;
};

export function HeroSection({ title, subtitle, telegramHref }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pb-16 pt-6 sm:pb-24 sm:pt-10">
      <Particles />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild variant="neon" size="lg">
            <a href={telegramHref} target="_blank" rel="noopener noreferrer">
              {t("ctaTelegram")}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#services">{t("ctaServices")}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
