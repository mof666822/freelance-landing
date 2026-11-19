"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import type { ExampleItem } from "@/lib/types";
import { t as pick } from "@/lib/defaults";

export function ExamplesSection({ examples }: { examples: ExampleItem[] }) {
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("sections");

  if (!examples.length) return null;

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 text-3xl font-bold text-white">{t("examples")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example, index) => (
            <article
              key={example.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-glass backdrop-blur-md"
              style={{
                animation: `fadeSlideUp 0.4s ease ${index * 0.06}s both`,
              }}
            >
              <div className="relative aspect-[16/10] bg-black/40">
                <Image
                  src={example.image}
                  alt={pick(example.title, locale)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  {pick(example.title, locale)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {pick(example.description, locale)}
                </p>
                {example.link ? (
                  <a
                    href={example.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-telegram hover:underline"
                  >
                    {t("openExample")}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
