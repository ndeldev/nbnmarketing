import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics, ConsentBanner } from "@/components/analytics";
import { generateOrganizationSchema } from "@/lib/metadata";
import { BRAND_NAME, SITE_URL } from "@/lib/constants";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const ogLocale = locale === "de" ? "de_DE" : "en_US";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${BRAND_NAME} | ${t("title")}`,
      template: `%s | ${BRAND_NAME}`,
    },
    description: t("description"),
    keywords: [
      "B2B marketing agency",
      "demand generation",
      "content marketing",
      "SEO agency",
      "technical SEO",
      "email marketing",
      "newsletter marketing",
      "ABM",
      "account-based marketing",
    ],
    authors: [{ name: BRAND_NAME }],
    creator: BRAND_NAME,
    alternates: {
      languages: {
        en: SITE_URL,
        de: `${SITE_URL}/de`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: SITE_URL,
      siteName: BRAND_NAME,
      title: `${BRAND_NAME} | ${t("title")}`,
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      site: "@NBNMarketing",
      creator: "@NBNMarketing",
      title: `${BRAND_NAME} | ${t("title")}`,
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "Me6SOv58Lk3EsoGhsY9PFzDN2BTtRTceLjAGxJhO2aw",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} light`}
      style={{ colorScheme: "light" }}
    >
      <head>
        <JsonLd data={generateOrganizationSchema()} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
