import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Download, BookOpen, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTA } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = genMeta({
  title: "Resources",
  description: `Free B2B marketing resources from ${BRAND_NAME}. Download guides, templates, and learn best practices for demand generation, SEO, and content marketing.`,
  path: "/resources",
});

const resources = [
  {
    title: "B2B Content Marketing Guide",
    description:
      "A comprehensive guide to creating content that generates leads and establishes thought leadership.",
    type: "Guide",
    icon: BookOpen,
    comingSoon: true,
  },
  {
    title: "SEO Audit Checklist",
    description:
      "A 50-point checklist to audit your website's technical and on-page SEO.",
    type: "Checklist",
    icon: FileText,
    comingSoon: true,
  },
  {
    title: "Email Newsletter Templates",
    description:
      "Proven email templates for B2B newsletters that drive engagement.",
    type: "Templates",
    icon: Download,
    comingSoon: true,
  },
  {
    title: "Demand Gen Metrics Dashboard",
    description:
      "Track the metrics that matter with our customizable marketing dashboard template.",
    type: "Template",
    icon: FileText,
    comingSoon: true,
  },
  {
    title: "ABM Campaign Playbook",
    description:
      "Step-by-step guide to launching account-based marketing campaigns.",
    type: "Playbook",
    icon: BookOpen,
    comingSoon: true,
  },
  {
    title: "LinkedIn Ads Best Practices",
    description:
      "Learn how to create high-performing LinkedIn ad campaigns for B2B.",
    type: "Guide",
    icon: Video,
    comingSoon: true,
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Marketing Resources
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Free guides, templates, and tools to help you build a
              high-performing B2B marketing program.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={resource.title}
                  className="group relative overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {resource.type}
                      </span>
                    </div>
                    <h2 className="mt-6 text-xl font-semibold">
                      {resource.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {resource.description}
                    </p>
                    {resource.comingSoon ? (
                      <p className="mt-4 text-sm font-medium text-muted-foreground">
                        Coming Soon
                      </p>
                    ) : (
                      <Button variant="link" className="mt-4 h-auto p-0" asChild>
                        <Link href="#">Download</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Get New Resources in Your Inbox
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Subscribe to our newsletter and be the first to know when we
              release new guides and templates.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/contact">Subscribe</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
