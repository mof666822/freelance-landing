import type { SiteContent } from "@/lib/types";
import { telegramUrl } from "@/lib/utils";

const tg = telegramUrl(process.env.TELEGRAM_USERNAME || "mangerssh");

export const defaultContent: SiteContent = {
  hero: {
    title: {
      ru: "Делаю сайты и Telegram Mini Apps под ключ",
      en: "I build websites and Telegram Mini Apps turnkey",
    },
    subtitle: {
      ru: "Обсудим ТЗ в Telegram — цена договорная, предоплата 50% в USDT",
      en: "Let’s discuss the brief in Telegram — price is negotiable, 50% USDT deposit",
    },
  },
  categories: {
    sites: {
      title: { ru: "Сайты", en: "Websites" },
      description: {
        ru: "Лендинги, магазины, корпоративные сайты, веб-приложения",
        en: "Landing pages, stores, corporate sites, web apps",
      },
      services: [
        {
          id: "landing",
          icon: "Layout",
          title: { ru: "Лендинги", en: "Landing pages" },
          description: {
            ru: "Продающие одностраничники под заявки и Telegram.",
            en: "Conversion-focused one-pagers for leads and Telegram.",
          },
        },
        {
          id: "shop",
          icon: "ShoppingCart",
          title: { ru: "Интернет-магазины", en: "Online stores" },
          description: {
            ru: "Каталог, корзина и оплата под ваш продукт.",
            en: "Catalog, cart and checkout tailored to your product.",
          },
        },
        {
          id: "corporate",
          icon: "Building2",
          title: { ru: "Корпоративные сайты", en: "Corporate websites" },
          description: {
            ru: "Представительский сайт компании с понятной структурой.",
            en: "Company site with a clear structure and brand look.",
          },
        },
        {
          id: "webapp",
          icon: "AppWindow",
          title: { ru: "Веб-приложения", en: "Web applications" },
          description: {
            ru: "Кабинеты, CRM-подобные интерфейсы и внутренние сервисы.",
            en: "Dashboards, CRM-like UIs and internal tools.",
          },
        },
        {
          id: "redesign",
          icon: "Sparkles",
          title: { ru: "Редизайн / аудит", en: "Redesign / audit" },
          description: {
            ru: "Обновлю внешний вид и найду узкие места в текущем сайте.",
            en: "Refresh the look and find bottlenecks in your current site.",
          },
        },
        {
          id: "markup",
          icon: "Code2",
          title: { ru: "Верстка по макету", en: "Pixel-perfect markup" },
          description: {
            ru: "Аккуратная адаптивная верстка по Figma / макету.",
            en: "Clean responsive markup from Figma or a design file.",
          },
        },
      ],
    },
    bots: {
      title: { ru: "Боты и Mini Apps", en: "Bots & Mini Apps" },
      description: {
        ru: "Telegram-боты, Mini Apps, автоматизация, интеграции с крипто-платежами",
        en: "Telegram bots, Mini Apps, automation, crypto payment integrations",
      },
      services: [
        {
          id: "tg-bots",
          icon: "Bot",
          title: { ru: "Telegram-боты", en: "Telegram bots" },
          description: {
            ru: "Боты для заявок, поддержки, продаж и уведомлений.",
            en: "Bots for leads, support, sales and notifications.",
          },
        },
        {
          id: "mini-apps",
          icon: "Smartphone",
          title: { ru: "Telegram Mini Apps", en: "Telegram Mini Apps" },
          description: {
            ru: "Полноценные приложения внутри Telegram под ваш сценарий.",
            en: "Full apps inside Telegram for your product flow.",
          },
        },
        {
          id: "automation",
          icon: "Workflow",
          title: { ru: "Автоматизация процессов", en: "Process automation" },
          description: {
            ru: "Свяжу ботов, таблицы, CRM и рутину в один поток.",
            en: "Connect bots, sheets, CRM and routine into one flow.",
          },
        },
        {
          id: "crypto",
          icon: "Coins",
          title: {
            ru: "Интеграции с крипто-платежами",
            en: "Crypto payment integrations",
          },
          description: {
            ru: "Приём USDT и других крипто-платежей в боте или Mini App.",
            en: "Accept USDT and other crypto payments in a bot or Mini App.",
          },
        },
        {
          id: "parsers",
          icon: "FileSearch",
          title: { ru: "Парсеры / скрипты", en: "Parsers / scripts" },
          description: {
            ru: "Сбор данных, мониторинг и вспомогательные скрипты.",
            en: "Data scraping, monitoring and helper scripts.",
          },
        },
        {
          id: "support",
          icon: "Wrench",
          title: { ru: "Техподдержка / доработки", en: "Support / improvements" },
          description: {
            ru: "Поддержу и доработаю уже запущенный бот или Mini App.",
            en: "Maintain and improve an existing bot or Mini App.",
          },
        },
      ],
    },
  },
  steps: [
    {
      id: "step-1",
      icon: "Send",
      title: { ru: "Пишешь в Telegram", en: "Message me on Telegram" },
      description: {
        ru: "Жмёшь кнопку — открывается мой ЛС.",
        en: "Tap the button and my DMs open.",
      },
    },
    {
      id: "step-2",
      icon: "FileText",
      title: { ru: "Скидываешь ТЗ", en: "Share the brief" },
      description: {
        ru: "Что нужно, примеры, сроки (если есть).",
        en: "What you need, references and deadlines if any.",
      },
    },
    {
      id: "step-3",
      icon: "Handshake",
      title: { ru: "Согласуем условия", en: "Agree on terms" },
      description: {
        ru: "Объём, цена (договорная), сроки.",
        en: "Scope, negotiable price and timeline.",
      },
    },
    {
      id: "step-4",
      icon: "Wallet",
      title: { ru: "Предоплата 50% в USDT", en: "50% USDT deposit" },
      description: {
        ru: "Вносишь предоплату (TRC20) — я приступаю.",
        en: "You pay the deposit (TRC20) and I start.",
      },
    },
    {
      id: "step-5",
      icon: "CheckCircle2",
      title: { ru: "Сдача и остаток", en: "Delivery & balance" },
      description: {
        ru: "Сдаю работу, вносишь остаток 50%. Правки по ТЗ — бесплатно до сдачи работы.",
        en: "I deliver, you pay the remaining 50%. Brief-based revisions are free until delivery.",
      },
    },
  ],
  payment: {
    ru: "Работаю по предоплате 50% в USDT (TRC20). Остаток — по готовности. Все детали — в ЛС.",
    en: "I work with a 50% USDT (TRC20) deposit. The rest is due on delivery. All details in DMs.",
  },
  contacts: {
    primary: {
      label: { ru: "Telegram", en: "Telegram" },
      url: tg,
    },
    secondary: process.env.TELEGRAM_USERNAME_2
      ? {
          label: { ru: "Написать в ЛС", en: "Message in DMs" },
          url: telegramUrl(process.env.TELEGRAM_USERNAME_2),
        }
      : null,
  },
  examples: [],
  seo: {
    title: {
      ru: "Сайты и Telegram Mini Apps под ключ",
      en: "Turnkey websites & Telegram Mini Apps",
    },
    description: {
      ru: "Делаю сайты и Telegram Mini Apps. Цена договорная, предоплата 50% в USDT. Пиши в Telegram.",
      en: "I build websites and Telegram Mini Apps. Negotiable price, 50% USDT deposit. Message me on Telegram.",
    },
  },
};

export function t(text: { ru: string; en: string }, locale: "ru" | "en") {
  return text[locale] || text.ru;
}
