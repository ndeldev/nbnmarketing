import Link from "next/link";
import type { Metadata } from "next";
import {
  FileText,
  Mail,
  Users,
  Megaphone,
  Target,
  Search,
  Code,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTA } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = genMeta({
  title: "B2B Marketing Services",
  description:
    "Comprehensive B2B marketing services including publications, newsletters, outreach, campaigns, paid ads, SEO, and technical SEO. Drive growth with data-driven strategies.",
  path: "/services",
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Mail,
  Users,
  Megaphone,
  Target,
  Search,
  Code,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              B2B Marketing Services
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From thought leadership content to technical SEO, we offer
              end-to-end marketing services designed to accelerate your
              pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Card
                  key={service.id}
                  className="group relative overflow-hidden transition-shadow hover:shadow-lg"
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
