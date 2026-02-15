import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo";
import { CTA, PageHero } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { generateOrganizationSchema } from "@/lib/metadata";
import { BRAND_NAME } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return genMeta({
    title: t("about.title"),
    description: t("about.description", { brandName: BRAND_NAME }),
    path: "/about",
    locale,
    image: "/og-about.jpg",
  });
}

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former VP Marketing at a Series C startup. 15+ years in B2B marketing.",
  },
  {
    name: "Marcus Williams",
    role: "Head of Strategy",
    bio: "Ex-McKinsey consultant specializing in go-to-market strategy.",
  },
  {
    name: "Elena Rodriguez",
    role: "Director of Content",
    bio: "Award-winning content strategist with experience at Fortune 500 brands.",
  },
  {
    name: "David Park",
    role: "Head of SEO",
    bio: "Former Google search quality analyst. Technical SEO expert.",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const values = [
    {
      title: t("values.resultsOverActivity.title"),
      description: t("values.resultsOverActivity.description"),
    },
    {
      title: t("values.radicalTransparency.title"),
      description: t("values.radicalTransparency.description"),
    },
    {
      title: t("values.partnershipMindset.title"),
      description: t("values.partnershipMindset.description"),
    },
    {
      title: t("values.continuousLearning.title"),
      description: t("values.continuousLearning.description"),
    },
  ];

  return (
    <>
      <JsonLd data={generateOrganizationSchema()} />
      <PageHero
        title={t("page.title")}
        description={t("page.description", { brandName: BRAND_NAME })}
      />

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">{t("story.title")}</h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground">
              <p>{t("story.p1", { brandName: BRAND_NAME })}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3", { brandName: BRAND_NAME })}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">{t("values.title")}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("values.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-card p-8">
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="mt-4 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("team.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("team.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-muted" />
                <h3 className="mt-6 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
