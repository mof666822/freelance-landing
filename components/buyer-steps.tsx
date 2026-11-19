"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/icons";
import type { StepItem } from "@/lib/types";
import { t as pick } from "@/lib/defaults";

export function BuyerSteps({ steps }: { steps: StepItem[] }) {
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("sections");

  return (
    <section className="relative z-0 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          className="mb-8 text-3xl font-bold text-white sm:text-4xl"
          style={{ animation: "fadeSlideUp 0.4s ease both" }}
        >
          {t("howToBuy")}
        </h2>

        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2">
          {steps.map((step, index) => (
            <div key={step.id} className="contents">
              <div
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glass backdrop-blur-md"
                style={{
                  animation: `fadeSlideUp 0.4s ease ${index * 0.08}s both`,
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-telegram/20 text-sm font-bold text-telegram">
                    {index + 1}
                  </span>
                  <ServiceIcon name={step.icon} className="h-5 w-5 text-neon" />
                </div>
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {pick(step.title, locale)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {pick(step.description, locale)}
                </p>
              </div>

              {index < steps.length - 1 && (
                <>
                  <div
                    className="flex justify-center py-1 text-telegram md:hidden"
                    aria-hidden="true"
                  >
                    <ArrowDown className="h-7 w-7" strokeWidth={2.5} />
                  </div>
                  <div
                    className="hidden shrink-0 px-1 text-telegram md:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-8 w-8" strokeWidth={2.5} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
