"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useAudience } from "@/lib/hooks/useAudienceContext";
import { AUDIENCE_SEGMENTS } from "@/lib/constants";
import { StatCard } from "./stats/StatCard";
import { PillTab } from "./stats/PillTab";

// Audience IDs for scroll-based switching
const audienceIds = AUDIENCE_SEGMENTS.map((s) => s.id);

// Scroll height multiplier per segment (shorter on mobile for easier scrolling)
const SCROLL_HEIGHT_MOBILE = 60; // vh per segment on mobile
const SCROLL_HEIGHT_DESKTOP = 100; // vh per segment on desktop

// Stats values per audience segment
const statsValues: Record<string, {
  marketCap: number;
  clients: number;
  volume: number;
  metric4: number;
  metric4Label: string;
  metric4Suffix: string;
}> = {
  startups: { marketCap: 12, clients: 45, volume: 2.1, metric4: 90, metric4Label: "Days to First Results", metric4Suffix: "" },
  scaleups: { marketCap: 52, clients: 60, volume: 3.4, metric4: 85, metric4Label: "Client Retention Rate", metric4Suffix: "%" },
  enterprise: { marketCap: 115, clients: 25, volume: 4.2, metric4: 98, metric4Label: "Compliance Rate", metric4Suffix: "%" },
};

// Transitional copy for each audience segment
const audienceCopy: Record<string, { headline: string; description: string }> = {
  startups: {
    headline: "Breaking through the noise",
    description: "Small-cap visibility is hard-won. We help emerging companies cut through to the right investors with targeted campaigns that turn first milestones into real momentum.",
  },
  scaleups: {
    headline: "We scale with you",
    description: "As your company grows, so should your investor base. We expand your reach across North America and Europe, building the shareholder foundation for your next phase.",
  },
  enterprise: {
    headline: "Transform milestones into market cap",
    description: "At scale, every announcement matters. We optimize your communications strategy to maintain institutional confidence and maximize the impact of corporate catalysts.",
  },
};

export function Stats() {
  const { selectedAudience, setSelectedAudience } = useAudience();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track when the section becomes sticky
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const rect = stickyRef.current.getBoundingClientRect();
      setIsSticky(rect.top <= 73);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track scroll progress within the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update selected audience based on scroll position (bidirectional)
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const audienceIndex = Math.min(
      audienceIds.length - 1,
      Math.max(0, Math.floor(progress * audienceIds.length))
    );

    const newAudience = audienceIds[audienceIndex];
    if (newAudience && newAudience !== selectedAudience) {
      setSelectedAudience(newAudience);
    }
  });

  const currentValues = statsValues[selectedAudience] || statsValues.startups;
  const currentCopy = audienceCopy[selectedAudience] || audienceCopy.startups;
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

      {/* Sticky content - fills viewport minus header */}
      <div
        ref={stickyRef}
        className="sticky top-[72px] relative h-[calc(100vh-72px)] flex flex-col justify-center overflow-hidden"
        style={{ backgroundColor: '#2E2930' }}
        data-dark-section="true"
      >
        {isSticky && (
          <div className="absolute left-0 right-0 bottom-full h-[72px]" style={{ backgroundColor: '#2E2930' }} data-dark-section="true" />
        )}

        {/* Audience Selector Bar */}
        <div className="py-4 lg:py-6">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-22">
              <h2 className="text-lg lg:text-xl font-semibold tracking-tight text-white whitespace-nowrap">
                Strategic partnerships · Results-driven approach
              </h2>

              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                {AUDIENCE_SEGMENTS.map((segment) => (
                  <PillTab
                    key={segment.id}
                    active={selectedAudience === segment.id}
                    onClick={() => handleAudienceClick(segment.id)}
                  >
                    {segment.label}
                  </PillTab>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="py-8 lg:py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
              <StatCard
                value={currentValues.marketCap}
                label="Avg. Market Cap Lift"
                prefix="$"
                suffix="M+"
                index={0}
              />
              <StatCard
                value={currentValues.clients}
                label="Clients Served"
                prefix=""
                suffix="+"
                index={1}
              />
              <StatCard
                value={currentValues.volume}
                label="Avg. Volume Increase"
                prefix=""
                suffix="x"
                decimals={1}
                index={2}
              />
              <StatCard
                value={currentValues.metric4}
                label={currentValues.metric4Label}
                prefix=""
                suffix={currentValues.metric4Suffix}
                index={3}
              />
            </div>
          </div>
        </div>

        {/* Transitional Copy Section - inside sticky */}
        <div className="py-6 lg:py-8">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <motion.h3
              key={currentCopy.headline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl lg:text-3xl font-semibold text-white mb-3"
            >
              {currentCopy.headline}
            </motion.h3>
            <motion.p
              key={currentCopy.description}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base lg:text-lg text-white/70 leading-relaxed"
            >
              {currentCopy.description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
