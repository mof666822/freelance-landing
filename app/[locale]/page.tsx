import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BuyerSteps } from "@/components/buyer-steps";
import { CategoryCards } from "@/components/category-cards";
import { ContactsFooter } from "@/components/contacts-footer";
import { HeroSection } from "@/components/hero-section";
import { PaymentSection } from "@/components/payment-section";
import { SiteHeader } from "@/components/site-header";
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
  const t = await getTranslations({ locale: loc, namespace: "meta" });

  const title = pick(content.seo.title, loc) || t("title");
  const description = pick(content.seo.description, loc) || t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: loc,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  const loc = (locale === "en" ? "en" : "ru") as "ru" | "en";
  setRequestLocale(loc);

  const content = await readContent();
  const contacts = resolveContacts(content);

  return (
    <main className="min-h-screen">
      <SiteHeader telegramHref={contacts.primary.url} />
      <HeroSection
        title={pick(content.hero.title, loc)}
        subtitle={pick(content.hero.subtitle, loc)}
        telegramHref={contacts.primary.url}
      />
      <CategoryCards sites={content.categories.sites} bots={content.categories.bots} />
      <BuyerSteps steps={content.steps} />
      <PaymentSection text={pick(content.payment, loc)} />
      <ContactsFooter primary={contacts.primary} secondary={contacts.secondary} />
    </main>
  );
}
