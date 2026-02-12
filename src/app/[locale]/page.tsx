import { setRequestLocale } from "next-intl/server";
import { Hero, Services, Features, CTA, Stats } from "@/components/sections";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateWebPageSchema } from "@/lib/metadata";
import { BRAND_NAME, BRAND_TAGLINE, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { AudienceProvider } from "@/lib/hooks/useAudienceContext";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const webPageSchema = generateWebPageSchema({
    title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <Hero />
      <AudienceProvider>
        <Stats />
        <Services />
      </AudienceProvider>
      <Features />
      <CTA />
    </>
  );
}
