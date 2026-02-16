"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";
import { useAudience } from "@/lib/hooks/useAudienceContext";
import { AUDIENCE_SEGMENTS } from "@/lib/constants";
import { StatCard } from "./stats/StatCard";
import { PillTab } from "./stats/PillTab";

// Audience IDs for scroll-based switching
const audienceIds = AUDIENCE_SEGMENTS.map((s) => s.id);

// Scroll height multiplier per segment (shorter on mobile for easier scrolling)
const SCROLL_HEIGHT_MOBILE = 40; // vh per segment on mobile
const SCROLL_HEIGHT_DESKTOP = 100; // vh per segment on desktop

// Stats values per audience segment (numbers only, labels come from translations)
const statsValues: Record<string, {
  marketCap: number;
  clients: number;
  volume: number;
  metric4: number;
  metric4Suffix: string;
}> = {
  startups: { marketCap: 12, clients: 45, volume: 2.1, metric4: 90, metric4Suffix: "" },
  scaleups: { marketCap: 52, clients: 60, volume: 3.4, metric4: 85, metric4Suffix: "%" },
  enterprise: { marketCap: 115, clients: 25, volume: 4.2, metric4: 98, metric4Suffix: "%" },
};

// Map audience IDs to metric4 label keys
const metric4LabelKeys: Record<string, string> = {
  startups: "daysToFirstResults",
  scaleups: "clientRetentionRate",
  enterprise: "complianceRate",
};

export function Stats() {
  const t = useTranslations("home.stats");
  const { selectedAudience, setSelectedAudience } = useAudience();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress within the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Debounced audience switch — slight delay so pills don't flicker
  const switchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSetAudience = useRef(selectedAudience);

  // Update selected audience based on scroll position (bidirectional)
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const audienceIndex = Math.min(
      audienceIds.length - 1,
      Math.max(0, Math.floor(progress * audienceIds.length))
    );

    const newAudience = audienceIds[audienceIndex];
    if (newAudience && newAudience !== lastSetAudience.current) {
      lastSetAudience.current = newAudience;
      if (switchTimeout.current) clearTimeout(switchTimeout.current);
      switchTimeout.current = setTimeout(() => setSelectedAudience(newAudience), 80);
    }
  });

  // Scroll-driven background image reveal: left-to-right with soft gradient edge
  // revealPct: how much of the image is visible (0% → 100%)
  const revealPct = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 33, 66, 100]);
  // Gradient mask: solid up to the reveal point, then a 20% feather to transparent
  const maskImage = useTransform(revealPct, (v) => {
    const solidEnd = Math.max(0, v - 20);
    return `linear-gradient(to right, black ${solidEnd}%, transparent ${v}%)`;
  });
  // Materialise: opacity fades in alongside the reveal
  const imageOpacity = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0.02, 0.08, 0.14, 0.2]);

  const currentValues = statsValues[selectedAudience] || statsValues.startups;
  const audienceKey = selectedAudience || "startups";
  // Shorter scroll distance on mobile for easier navigation
  const scrollHeightPerSegment = isMobile ? SCROLL_HEIGHT_MOBILE : SCROLL_HEIGHT_DESKTOP;
  const containerHeight = `${audienceIds.length * scrollHeightPerSegment}vh`;

  const handleAudienceClick = (audienceId: string) => {
    setSelectedAudience(audienceId);
  };

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: containerHeight, backgroundColor: '#2E2930' }}
    >
      {/* Invisible snap targets - variable height per audience segment */}
      {audienceIds.map((_, index) => (
        <div
          key={`snap-${index}`}
          className="absolute snap-section pointer-events-none"
          style={{ top: `${index * scrollHeightPerSegment}vh`, height: `${scrollHeightPerSegment}vh` }}
          aria-hidden="true"
        />
      ))}

      {/* Sticky content - fills full viewport, extends behind header */}
      <div
        ref={stickyRef}
        className="sticky top-[72px] relative h-[calc(100vh-72px)] flex flex-col justify-center overflow-hidden"
        style={{ backgroundColor: '#2E2930' }}
        data-dark-section="true"
      >
        {/* Background image with scroll-driven left-to-right reveal */}
        <motion.div
          className="absolute inset-0"
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
            opacity: imageOpacity,
          }}
        >
          <Image
            src="/images/strategic-partnerships.webp"
            alt="Strategic partnerships — construction blueprint at dawn"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Audience Selector Bar */}
        <div className="py-4 lg:py-6 relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-22">
              <h2 className="text-lg lg:text-xl font-semibold tracking-tight text-white whitespace-nowrap">
                {t("sectionTitle")}
              </h2>

              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                {AUDIENCE_SEGMENTS.map((segment) => {
                  const labelKey = segment.id === "startups" ? "emerging" : segment.id === "scaleups" ? "growth" : "established";
                  return (
                    <PillTab
                      key={segment.id}
                      active={selectedAudience === segment.id}
                      onClick={() => handleAudienceClick(segment.id)}
                    >
                      {t(`segments.${labelKey}`)}
                    </PillTab>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="py-8 lg:py-10 relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
              <StatCard
                value={currentValues.marketCap}
                label={t("labels.avgMarketCapLift")}
                prefix="$"
                suffix="M+"
                index={0}
              />
              <StatCard
                value={currentValues.clients}
                label={t("labels.clientsServed")}
                prefix=""
                suffix="+"
                index={1}
              />
              <StatCard
                value={currentValues.volume}
                label={t("labels.avgVolumeIncrease")}
                prefix=""
                suffix="x"
                decimals={1}
                index={2}
              />
              <StatCard
                value={currentValues.metric4}
                label={t(`labels.${metric4LabelKeys[audienceKey]}`)}
                prefix=""
                suffix={currentValues.metric4Suffix}
                index={3}
              />
            </div>
          </div>
        </div>

        {/* Transitional Copy Section - inside sticky */}
        <div className="py-6 lg:py-8 relative z-10">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <motion.h3
              key={`headline-${audienceKey}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl lg:text-3xl font-semibold text-white mb-3"
            >
              {t(`copy.${audienceKey}.headline`)}
            </motion.h3>
            <motion.p
              key={`desc-${audienceKey}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base lg:text-lg text-white/70 leading-relaxed"
            >
              {t(`copy.${audienceKey}.description`)}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
