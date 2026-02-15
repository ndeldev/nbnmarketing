import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { CTA, PageHero } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { BRAND_NAME } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return genMeta({
    title: t("caseStudies.title"),
    description: t("caseStudies.description", { brandName: BRAND_NAME }),
    path: "/case-studies",
    locale,
  });
}

const studyKeys = ["juniorMining", "biotech", "techIpo", "resourceCatalyst"] as const;
const metricValues: Record<string, string[]> = {
  juniorMining: ["4x", "$12", "+280%"],
  biotech: ["1,200+", "3x", "25+"],
  techIpo: ["120%", "6 Firms", "50K+"],
  resourceCatalyst: ["8x Avg", "800+", "5.2x"],
};

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("caseStudies");

  return (
    <>
      <PageHero
        title={t("page.title")}
        description={t("page.description")}
      />

      {/* Case Studies Grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {studyKeys.map((key) => {
              const metricKeys = Object.keys(
                // Get metric label keys dynamically
                key === "juniorMining"
                  ? { shareholderGrowth: 1, costPerInvestor: 1, tradingVolume: 1 }
                  : key === "biotech"
                    ? { euShareholders: 1, frankfurtVolume: 1, mediaPlacements: 1 }
                    : key === "techIpo"
                      ? { ipoSubscribed: 1, analystCoverage: 1, newsletterReach: 1 }
                      : { peakDailyVolume: 1, newShareholders: 1, campaignRoi: 1 }
              );
              const values = metricValues[key];

              return (
                <Card
                  key={key}
                  className="group overflow-hidden card-hover"
                >
                  <CardContent className="p-0">
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5" />

                    <div className="p-8">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{t(`studies.${key}.company`)}</span>
                        <span>&middot;</span>
                        <span>{t(`studies.${key}.industry`)}</span>
                      </div>

                      <h2 className="mt-4 text-2xl font-bold">{t(`studies.${key}.title`)}</h2>
                      <p className="mt-2 text-muted-foreground">
                        {t(`studies.${key}.description`)}
                      </p>

                      {/* Metrics */}
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        {metricKeys.map((metricKey, i) => (
                          <div key={metricKey}>
                            <div className="text-2xl font-bold text-primary">
                              {values[i]}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t(`studies.${key}.metrics.${metricKey}`)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
