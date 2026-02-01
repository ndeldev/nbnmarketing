import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTA, PageHero } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { SERVICES } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = genMeta({
  title: "Investor Relations Services",
  description:
    "Full-stack investor relations for public companies. Digital advertising, content & publications, European distribution, email marketing, social & video, and analytics.",
  path: "/services",
  image: "/og-services.jpg",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Investor Relations Services"
        description="From digital advertising to analytics reporting, we offer full-stack IR services designed to build shareholder bases across North America and Europe."
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
                      {service.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {service.description}
                    </p>
                    <Button
                      variant="link"
                      className="mt-4 h-auto p-0 text-primary"
                      asChild
                    >
                      <Link href={`/services/${service.id}`}>
                        Learn more
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
