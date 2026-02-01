import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedServicesProps {
  currentServiceId: string;
  relatedIds?: string[];
  title?: string;
}

export function RelatedServices({
  currentServiceId,
  relatedIds,
  title = "Related Services",
}: RelatedServicesProps) {
  // Get related services - either specified or all except current
  const relatedServices = relatedIds
    ? SERVICES.filter((s) => relatedIds.includes(s.id))
    : SERVICES.filter((s) => s.id !== currentServiceId).slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our other services that complement your marketing strategy.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((service) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden card-hover"
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.shortDescription}
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
          ))}
        </div>
      </div>
    </section>
  );
}
