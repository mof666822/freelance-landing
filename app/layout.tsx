import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3847",
  ),
  title: "Сайты и Telegram Mini Apps под ключ",
  description:
    "Делаю сайты и Telegram Mini Apps. Цена договорная, предоплата 50% в USDT. Пиши в Telegram.",
  openGraph: {
    title: "Сайты и Telegram Mini Apps под ключ",
    description:
      "Делаю сайты и Telegram Mini Apps. Цена договорная, предоплата 50% в USDT. Пиши в Telegram.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Сайты и Telegram Mini Apps под ключ",
    description:
      "Делаю сайты и Telegram Mini Apps. Цена договорная, предоплата 50% в USDT. Пиши в Telegram.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
