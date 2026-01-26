import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 gradient-soft opacity-50" />

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm shadow-sm">
            <span className="indicator-dot" />
            <span className="text-muted-foreground">
              Trusted by 50+ B2B companies
            </span>
          </div>

          {/* Headline with italic emphasis */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            B2B Marketing That Drives{" "}
            <em className="font-serif not-italic">Real Growth</em>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            We help ambitious companies generate demand through strategic content,
            targeted outreach, and campaigns that <em className="font-serif">convert</em>.
          </p>

          {/* CTAs with rounded buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-full px-8 group" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>

          {/* Social proof - cleaner layout */}
          <div className="mt-20 pt-12 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-8">
              Trusted by marketing leaders at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
              {["TechCorp", "ScaleAI", "DataFlow", "CloudBase", "GrowthLabs"].map(
                (company) => (
                  <div
                    key={company}
                    className="group flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-muted-foreground/10 group-hover:bg-muted-foreground/20 transition-colors" />
                    <span className="text-base font-semibold tracking-tight">
                      {company}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
