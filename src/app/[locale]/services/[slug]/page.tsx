import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ProcessSection,
  FAQSection,
  BenefitsSection,
  RelatedServices,
  CTA,
} from "@/components/sections";
import { JsonLd } from "@/components/seo";
import {
  generateMetadata as genMeta,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/metadata";
import { SERVICES, SERVICE_DETAILS, SITE_URL, BRAND_NAME } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

// Generate static params for all services
export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

// Generate metadata for each service page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  const details = SERVICE_DETAILS[slug];

  if (!service || !details) {
    return genMeta({
      title: "Service Not Found",
      description: "The requested service page could not be found.",
      noIndex: true,
    });
  }

  return genMeta({
    title: details.headline,
    description: `${details.tagline} Learn how ${BRAND_NAME} can help your business grow.`,
    path: `/services/${slug}`,
    locale,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = SERVICES.find((s) => s.id === slug);
  const details = SERVICE_DETAILS[slug];

  if (!service || !details) {
    notFound();
  }

  // Get the icon component for this service
  // Note: This is a Server Component so icon lookup happens at build/request time
  const Icon = getIcon(service.icon);

  // Generate Service schema
  const serviceSchema = generateServiceSchema({
    name: details.headline,
    description: details.tagline,
    url: `${SITE_URL}/services/${slug}`,
  });

  // Generate Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.title, url: `${SITE_URL}/services/${slug}` },
  ]);

  // Generate FAQ schema
  const faqSchema = generateFAQSchema(details.faqs);

  // Map benefits to include actual icon components
  const benefitsWithIcons = details.benefits.map((benefit) => ({
    ...benefit,
    icon: getIcon(benefit.icon),
  }));

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/services"
              className="hover:text-foreground transition-colors"
            >
              Services
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium">{service.title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {details.headline}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {details.tagline}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                asChild
              >
                <Link href="/case-studies">See Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features / What We Offer */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What We Offer
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive {service.title.toLowerCase()} services tailored to
              your business needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {details.features.map((feature, index) => {
              const FeatureIcon = getIcon(feature.icon);
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden card-hover"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <FeatureIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection
        title="Our Process"
        subtitle={`How we deliver exceptional ${service.title.toLowerCase()} results`}
        steps={details.process}
      />

      {/* Benefits */}
      <BenefitsSection
        title="Key Benefits"
        subtitle="Why public companies trust us with their investor relations"
        benefits={benefitsWithIcons}
      />

      {/* FAQ */}
      <FAQSection
        title="Frequently Asked Questions"
        subtitle={`Common questions about our ${service.title.toLowerCase()} services`}
        faqs={details.faqs}
      />

      {/* Related Services */}
      <RelatedServices
        currentServiceId={slug}
        relatedIds={details.relatedServices}
      />

      {/* CTA */}
      <CTA />
    </>
  );
}
