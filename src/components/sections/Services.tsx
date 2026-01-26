"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AUDIENCE_SEGMENTS } from "@/lib/constants";

// Simplified service list for cleaner sidebar
const servicesList = [
  { id: "strategy", label: "Business Strategy" },
  { id: "planning", label: "Product Planning" },
  { id: "insights", label: "Market Insights" },
  { id: "content", label: "Content & Publications" },
  { id: "outreach", label: "Outreach & Campaigns" },
  { id: "seo", label: "SEO & Technical SEO" },
] as const;

// Content for each service by audience
const serviceContent: Record<
  string,
  Record<string, { headline: string; emphasis: string; description: string }>
> = {
  startups: {
    strategy: {
      headline: "Turning ideas into",
      emphasis: "clear direction",
      description:
        "We help businesses turn complex ideas into clear, actionable strategies. By defining priorities, aligning teams, and structuring decisions, we support sustainable growth from early planning through execution. Every step is guided by clarity, focus, and long-term vision.",
    },
    planning: {
      headline: "Building products with",
      emphasis: "purpose",
      description:
        "Transform your product vision into a concrete roadmap. We help startups prioritize features, validate assumptions, and build products that resonate with your target market from day one.",
    },
    insights: {
      headline: "Understanding markets with",
      emphasis: "precision",
      description:
        "Data-driven market analysis that reveals opportunities others miss. We help you understand your competitive landscape, identify gaps, and position your offering for maximum impact.",
    },
    content: {
      headline: "Creating content that",
      emphasis: "establishes authority",
      description:
        "Launch your brand into the market with compelling content that positions your startup as an industry innovator. Build credibility with investors and customers through strategic thought leadership.",
    },
    outreach: {
      headline: "Connecting with prospects",
      emphasis: "at scale",
      description:
        "Strategic outreach sequences designed to get meetings with decision-makers at target accounts. Personalized messaging that opens doors and builds meaningful B2B relationships.",
    },
    seo: {
      headline: "Building organic growth",
      emphasis: "from the ground up",
      description:
        "Establish the SEO foundation that will compound your organic traffic for years to come. Keyword strategy, technical optimization, and content that ranks.",
    },
  },
  scaleups: {
    strategy: {
      headline: "Scaling with",
      emphasis: "strategic clarity",
      description:
        "Navigate the complexities of rapid growth with proven frameworks. We help scale-ups maintain strategic focus while expanding operations, entering new markets, and building sustainable competitive advantages.",
    },
    planning: {
      headline: "Evolving products for",
      emphasis: "market leadership",
      description:
        "Take your product to the next level with advanced planning methodologies. Balance feature expansion with user experience, and build systems that scale with your growing customer base.",
    },
    insights: {
      headline: "Deepening market",
      emphasis: "intelligence",
      description:
        "Advanced analytics and competitive intelligence that inform strategic decisions. Understand market dynamics, customer segments, and emerging opportunities with sophisticated research.",
    },
    content: {
      headline: "Scaling content",
      emphasis: "systematically",
      description:
        "Transform your content operation from ad-hoc to systematic with our publication frameworks. Consistent production, multi-format distribution, and industry-leading thought leadership.",
    },
    outreach: {
      headline: "Account-based engagement",
      emphasis: "that converts",
      description:
        "Sophisticated ABM programs that coordinate across your sales and marketing teams. Multi-threaded account engagement with CRM integration and sales enablement content.",
    },
    seo: {
      headline: "Dominating your",
      emphasis: "category",
      description:
        "Content strategies designed to win the most competitive keywords in your space. Pillar content development, link building campaigns, and international SEO expansion.",
    },
  },
  enterprise: {
    strategy: {
      headline: "Transforming enterprises with",
      emphasis: "bold vision",
      description:
        "Guide large-scale organizational transformation with executive-level strategic consulting. We help enterprises navigate digital transformation, market evolution, and competitive disruption.",
    },
    planning: {
      headline: "Orchestrating product",
      emphasis: "portfolios",
      description:
        "Manage complex product ecosystems with enterprise-grade planning frameworks. Coordinate across business units, balance innovation with stability, and align products with corporate strategy.",
    },
    insights: {
      headline: "Enterprise-grade",
      emphasis: "market intelligence",
      description:
        "Comprehensive market analysis powered by proprietary data and expert analysis. Strategic intelligence that informs board-level decisions and long-term corporate strategy.",
    },
    content: {
      headline: "Executive thought",
      emphasis: "leadership",
      description:
        "Premium content programs that position your executives as industry authorities. Ghostwritten executive content, premium research partnerships, and global content localization.",
    },
    outreach: {
      headline: "Strategic account",
      emphasis: "engagement",
      description:
        "Executive-level outreach programs for your most important strategic accounts. C-suite engagement strategies, event integration, and partnership development.",
    },
    seo: {
      headline: "Building SEO",
      emphasis: "centers of excellence",
      description:
        "Build internal SEO capabilities while driving immediate organic performance improvements. Team training, process governance, and tool stack optimization.",
    },
  },
};

// Pill tab component matching reference design
function PillTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all",
        active
          ? "bg-white shadow-sm text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {active && <span className="indicator-dot" />}
    </button>
  );
}

export function Services() {
  const [selectedAudience, setSelectedAudience] = useState("startups");
  const [selectedService, setSelectedService] = useState("strategy");

  const currentContent =
    serviceContent[selectedAudience]?.[selectedService] ||
    serviceContent.startups.strategy;

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header with Pill Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
          {/* Left: Title */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What We Offer
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md">
              Helping teams turn ideas into clear strategies and scalable solutions.
            </p>
          </div>

          {/* Right: Pill Tabs */}
          <div className="flex items-center gap-1 p-1.5 rounded-full pill-tab-container shadow-sm">
            {AUDIENCE_SEGMENTS.map((segment) => (
              <PillTab
                key={segment.id}
                active={selectedAudience === segment.id}
                onClick={() => setSelectedAudience(segment.id)}
              >
                {segment.label}
              </PillTab>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Service Selector - Left Sidebar */}
          <div className="md:col-span-4 xl:col-span-3 order-2 md:order-1">
            <div className="rounded-2xl bg-card border border-border/50 p-4 shadow-sm md:sticky md:top-24">
              {/* Mobile: Horizontal scroll, Desktop: Vertical list */}
              <nav className="flex md:flex-col gap-2 md:gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0">
                {servicesList.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap md:whitespace-normal md:w-full flex-shrink-0 md:flex-shrink",
                      selectedService === service.id
                        ? "bg-muted font-medium"
                        : "hover:bg-muted/50 text-muted-foreground"
                    )}
                  >
                    <span className="text-sm">{service.label}</span>
                    {selectedService === service.id && (
                      <span className="indicator-dot ml-2 md:ml-0" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Service Details - Main Content */}
          <div className="md:col-span-8 xl:col-span-9 order-1 md:order-2">
            <div className="rounded-3xl bg-card border border-border/50 overflow-hidden shadow-sm">
              {/* Visual Area - Gradient Placeholder */}
              <div className="h-64 md:h-80 gradient-warm relative">
                {/* Placeholder for illustration - will be replaced later */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm" />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 lg:p-10">
                {/* Headline with italic emphasis */}
                <h3 className="text-2xl font-bold">
                  {currentContent.headline}{" "}
                  <em className="font-serif">{currentContent.emphasis}</em>
                </h3>

                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  {currentContent.description}
                </p>

                {/* CTAs matching reference design */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="rounded-full px-6" asChild>
                    <Link href={`/services/${selectedService}`}>
                      Explore {servicesList.find(s => s.id === selectedService)?.label.toLowerCase()}
                    </Link>
                  </Button>
                  <Button className="rounded-full px-6" asChild>
                    <Link href="/contact">Schedule a call</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
