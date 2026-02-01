import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTA, PageHero } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = genMeta({
  title: "Case Studies",
  description: `See how ${BRAND_NAME} has helped B2B companies achieve measurable marketing results. Real examples of pipeline growth, lead generation, and ROI.`,
  path: "/case-studies",
});

const caseStudies = [
  {
    id: "techcorp-pipeline",
    company: "TechCorp",
    industry: "SaaS",
    title: "3x Pipeline Growth in 6 Months",
    description:
      "How we helped a Series B SaaS company transform their demand generation with integrated campaigns.",
    metrics: [
      { label: "Pipeline Growth", value: "3x" },
      { label: "Cost Per Lead", value: "-45%" },
      { label: "MQL to SQL Rate", value: "+67%" },
    ],
  },
  {
    id: "dataflow-seo",
    company: "DataFlow",
    industry: "Data Analytics",
    title: "From Zero to 50K Organic Visitors",
    description:
      "Building a content-driven SEO engine that generates consistent organic traffic and leads.",
    metrics: [
      { label: "Organic Traffic", value: "50K/mo" },
      { label: "Ranking Keywords", value: "2,500+" },
      { label: "Organic Leads", value: "200/mo" },
    ],
  },
  {
    id: "cloudbase-abm",
    company: "CloudBase",
    industry: "Cloud Infrastructure",
    title: "Enterprise ABM Success Story",
    description:
      "Targeted account-based marketing that opened doors at Fortune 500 companies.",
    metrics: [
      { label: "Target Accounts Engaged", value: "78%" },
      { label: "Enterprise Deals", value: "12" },
      { label: "Deal Size Increase", value: "+40%" },
    ],
  },
  {
    id: "growthlabs-content",
    company: "GrowthLabs",
    industry: "Marketing Tech",
    title: "Thought Leadership at Scale",
    description:
      "Building industry authority through strategic content and publications.",
    metrics: [
      { label: "Media Mentions", value: "150+" },
      { label: "Newsletter Subscribers", value: "25K" },
      { label: "Inbound Leads", value: "+120%" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        title="Real Results for B2B Companies"
        description="See how we've helped companies like yours achieve measurable marketing outcomes."
      />

      {/* Case Studies Grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((study) => (
              <Card
                key={study.id}
                className="group overflow-hidden card-hover"
              >
                <CardContent className="p-0">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5" />

                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{study.company}</span>
                      <span>&middot;</span>
                      <span>{study.industry}</span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold">{study.title}</h2>
                    <p className="mt-2 text-muted-foreground">
                      {study.description}
                    </p>

                    {/* Metrics */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      {study.metrics.map((metric) => (
                        <div key={metric.label}>
                          <div className="text-2xl font-bold text-primary">
                            {metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="link"
                      className="mt-6 h-auto p-0 text-primary"
                      asChild
                    >
                      <Link href={`/case-studies/${study.id}`}>
                        Read case study
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
