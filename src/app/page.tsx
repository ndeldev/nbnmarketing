import { Hero, Services, Features, CTA, Stats } from "@/components/sections";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateWebPageSchema } from "@/lib/metadata";
import { BRAND_NAME, BRAND_TAGLINE, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";

export default function HomePage() {
  const webPageSchema = generateWebPageSchema({
    title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <Hero />
      <Stats />
      <Services />
      <Features />
      <CTA />
    </>
  );
}
