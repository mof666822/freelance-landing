import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BackLink } from "@/components/back-link";
import { ExamplesSection } from "@/components/examples-section";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ServiceGrid } from "@/components/service-grid";
import { readContent, resolveContacts } from "@/lib/content";
import { t as pick } from "@/lib/defaults";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  const content = await readContent();
  const loc = (locale === "en" ? "en" : "ru") as "ru" | "en";
  return {
    title: pick(content.categories.bots.title, loc),
    description: pick(content.categories.bots.description, loc),
  };
}

export default async function BotsPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  const loc = (locale === "en" ? "en" : "ru") as "ru" | "en";
  setRequestLocale(loc);

  const content = await readContent();
  const contacts = resolveContacts(content);
  const examples = content.examples.filter((item) => item.category === "bots");
  const category = content.categories.bots;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <BackLink />
        <LanguageSwitcher />
      </div>
      <div className="mx-auto max-w-6xl overflow-visible px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          {pick(category.title, loc)}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {pick(category.description, loc)}
        </p>
        <ServiceGrid
          services={category.services}
          telegramHref={contacts.primary.url}
        />
      </div>
      {examples.length > 0 ? <ExamplesSection examples={examples} /> : null}
    </main>
  );
}
