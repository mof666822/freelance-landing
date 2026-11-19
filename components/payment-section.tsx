"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Wallet } from "lucide-react";

export function PaymentSection({ text }: { text: string }) {
  const t = useTranslations("sections");

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-neon/20 bg-gradient-to-r from-neon/10 via-white/5 to-telegram/10 p-6 shadow-glass backdrop-blur-md sm:p-8"
        >
          <div className="mb-3 flex items-center gap-3">
            <Wallet className="h-6 w-6 text-neon" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{t("payment")}</h2>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
