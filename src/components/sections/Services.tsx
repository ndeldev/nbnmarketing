"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICES, AUDIENCE_SEGMENTS } from "@/lib/constants";
import {
  Target,
  FileText,
  Globe,
  Mail,
  Video,
  BarChart3,
} from "lucide-react";

// Map icon names to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  FileText,
  Globe,
  Mail,
  Video,
  BarChart3,
};

// Simplified service list for cleaner sidebar
const servicesList = SERVICES.map((s) => ({
  id: s.id,
  label: s.title,
  icon: s.icon,
}));

// Content for each service by audience segment
const serviceContent: Record<
  string,
  Record<string, { headline: string; emphasis: string; description: string }>
> = {
  startups: {
    advertising: {
      headline: "Launching your story to",
      emphasis: "the right investors",
      description:
        "Precision-targeted digital campaigns across Google, Bing, and programmatic networks. We help newly listed companies build initial shareholder awareness with efficient ad spend that reaches active retail investors in your sector.",
    },
    content: {
      headline: "Establishing credibility",
      emphasis: "from day one",
      description:
        "CEO interviews, company profiles, and editorial features placed in leading financial publications. Build the third-party credibility that turns casual interest into invested shareholders.",
    },
    europe: {
      headline: "Opening European markets",
      emphasis: "early",
      description:
        "Whether you're considering a Frankfurt dual-listing or want to tap into DACH region retail investors, we help emerging issuers establish European presence from the start.",
    },
    email: {
      headline: "Reaching verified investors",
      emphasis: "directly",
      description:
        "Permission-based email campaigns to verified investor databases. Get your story in front of self-directed investors who actively trade junior market equities.",
    },
    social: {
      headline: "Building executive visibility",
      emphasis: "that attracts capital",
      description:
        "LinkedIn thought leadership and CEO video content that positions your leadership team as authorities worth investing in. Build the personal brand that builds shareholder confidence.",
    },
    analytics: {
      headline: "Measuring what matters",
      emphasis: "from the start",
      description:
        "Real-time dashboards that correlate your marketing spend with trading volume and shareholder acquisition. Know your cost per investor and optimize continuously.",
    },
  },
  scaleups: {
    advertising: {
      headline: "Scaling awareness for",
      emphasis: "your next catalyst",
      description:
        "Amplify your corporate milestones with coordinated advertising campaigns. Drilling results, resource estimates, product launches—turn news into trading volume with targeted investor reach.",
    },
    content: {
      headline: "Deepening your",
      emphasis: "investment story",
      description:
        "Comprehensive media coverage that educates investors on your growth trajectory. Research reports, analyst coverage, and thought leadership that builds institutional awareness alongside retail.",
    },
    europe: {
      headline: "Maximizing your",
      emphasis: "Frankfurt listing value",
      description:
        "Full-stack DACH region campaigns for companies ready to build serious European shareholder bases. German-language content, targeted advertising, and investor database access.",
    },
    email: {
      headline: "Nurturing investors through",
      emphasis: "your growth story",
      description:
        "Automated email sequences that keep your shareholder base engaged through corporate developments. Turn one-time visitors into long-term shareholders with strategic communication.",
    },
    social: {
      headline: "Commanding attention",
      emphasis: "in your sector",
      description:
        "Systematic social media presence that positions your company as the sector leader. YouTube investor presentations, Twitter engagement, and community building at scale.",
    },
    analytics: {
      headline: "Optimizing for",
      emphasis: "market cap growth",
      description:
        "Advanced analytics that correlate marketing campaigns with market performance. Attribution modeling, geographic analysis, and ROI reporting that informs strategic decisions.",
    },
  },
  enterprise: {
    advertising: {
      headline: "Maintaining visibility with",
      emphasis: "institutional reach",
      description:
        "Sustained advertising programs that keep your company visible to both retail and institutional investors. Programmatic campaigns targeting family offices, fund managers, and high-net-worth individuals.",
    },
    content: {
      headline: "Executive thought leadership",
      emphasis: "at scale",
      description:
        "Premium content programs positioning your C-suite as industry authorities. Ghostwritten executive content, premium research partnerships, and global content distribution.",
    },
    europe: {
      headline: "Sustaining European",
      emphasis: "investor relations",
      description:
        "Ongoing European investor engagement programs. Localized content, sustained media presence, and relationship management across DACH region financial media.",
    },
    email: {
      headline: "Strategic shareholder",
      emphasis: "communication",
      description:
        "Sophisticated email programs for established investor relations. Segmented communications for retail vs. institutional, catalyst announcements, and quarterly update sequences.",
    },
    social: {
      headline: "Managing executive",
      emphasis: "brand presence",
      description:
        "Full social media management for executives and corporate accounts. Consistent presence, community engagement, and crisis communication protocols.",
    },
    analytics: {
      headline: "Enterprise-grade",
      emphasis: "IR intelligence",
      description:
        "Comprehensive analytics dashboards for board-level reporting. Multi-channel attribution, competitive intelligence, and market correlation analysis.",
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
  const [selectedService, setSelectedService] = useState("advertising");

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const currentContent =
    serviceContent[selectedAudience]?.[selectedService] ||
    serviceContent.startups.advertising;

  const currentService = SERVICES.find((s) => s.id === selectedService);
  const IconComponent = currentService
    ? iconMap[currentService.icon]
    : Target;

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header with Pill Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12"
        >
          {/* Left: Title */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Full-Stack Investor Relations
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md">
              Integrated campaigns that build shareholder bases across North America and Europe.
            </p>
          </div>

          {/* Right: Pill Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-1 p-1.5 rounded-full pill-tab-container shadow-sm"
          >
            {AUDIENCE_SEGMENTS.map((segment) => (
              <PillTab
                key={segment.id}
                active={selectedAudience === segment.id}
                onClick={() => setSelectedAudience(segment.id)}
              >
                {segment.label}
              </PillTab>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Service Selector - Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-4 xl:col-span-3 order-2 md:order-1"
          >
            <div className="rounded-2xl bg-card border border-border/50 p-4 shadow-soft md:sticky md:top-24">
              {/* Mobile: Horizontal scroll, Desktop: Vertical list */}
              <nav className="flex md:flex-col gap-2 md:gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0">
                {servicesList.map((service) => {
                  const ServiceIcon = iconMap[service.icon] || Target;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap md:whitespace-normal md:w-full flex-shrink-0 md:flex-shrink",
                        selectedService === service.id
                          ? "bg-muted font-medium"
                          : "hover:bg-muted/50 text-muted-foreground"
                      )}
                    >
                      <ServiceIcon className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{service.label}</span>
                      {selectedService === service.id && (
                        <span className="indicator-dot ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Service Details - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-8 xl:col-span-9 order-1 md:order-2"
          >
            <div className="rounded-3xl bg-card border border-border/50 overflow-hidden shadow-soft">
              {/* Visual Area - Gradient with Icon */}
              <div className="h-64 md:h-80 gradient-warm relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <IconComponent className="w-16 h-16 text-white/80" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Content Area */}
              <div className="p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedAudience}-${selectedService}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Headline with italic emphasis */}
                    <h3 className="text-2xl font-bold">
                      {currentContent.headline}{" "}
                      <em className="font-serif text-fuji-nezu">{currentContent.emphasis}</em>
                    </h3>

                    <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                      {currentContent.description}
                    </p>

                    {/* CTAs matching reference design */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" className="rounded-full px-6" asChild>
                        <Link href={`/services/${selectedService}`}>
                          Learn more
                        </Link>
                      </Button>
                      <Button className="rounded-full px-6" asChild>
                        <Link href="/contact">Schedule a call</Link>
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
