import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/seo";
import { CTA, PageHero } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { BRAND_NAME, SERVICES, SITE_URL } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return genMeta({
    title: t("services.title"),
    description: t("services.description"),
    path: "/services",
    locale,
    image: "/og-services.jpg",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tCta = await getTranslations("common.cta");

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${BRAND_NAME} Services`,
    description: "Full-stack investor relations services for public companies.",
    url: `${SITE_URL}/services`,
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: t(`cards.${service.id}.title`),
        description: t(`cards.${service.id}.description`),
        url: `${SITE_URL}/services/${service.id}`,
        provider: {
          "@type": "Organization",
          name: BRAND_NAME,
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={serviceListSchema} />
      <PageHero
        title={t("page.title")}
        description={t("page.description")}
      />

      {/* Services Grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <Card
                  key={service.id}
                  className="group relative overflow-hidden card-hover"
                >
                  <CardContent className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="mt-6 text-xl font-semibold">
                      {t(`cards.${service.id}.title`)}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {t(`cards.${service.id}.description`)}
                    </p>
                    <Button
                      variant="link"
                      className="mt-4 h-auto p-0 text-primary"
                      asChild
                    >
                      <Link href={`/services/${service.id}`}>
                        {tCta("learnMore")} {t(`cards.${service.id}.title`)}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
