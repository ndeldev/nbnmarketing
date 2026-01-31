"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { useAudience } from "@/lib/hooks/useAudienceContext";
import { AUDIENCE_SEGMENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Audience IDs for scroll-based switching
const audienceIds = AUDIENCE_SEGMENTS.map((s) => s.id);

// Stats data per audience segment (targeting $10M-$100M market cap companies)
// Using consistent stat types across audiences for smooth number transitions
const statsConfig = [
  { key: "marketCap", label: "Avg. Market Cap Lift", prefix: "$", suffix: "M+" },
  { key: "clients", label: "Clients Served", prefix: "", suffix: "+" },
  { key: "volume", label: "Avg. Volume Increase", prefix: "", suffix: "x" },
  { key: "metric4", label: "", prefix: "", suffix: "" }, // Dynamic label
];

const statsValues: Record<string, { marketCap: number; clients: number; volume: number; metric4: number; metric4Label: string; metric4Suffix: string }> = {
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

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const spring = useSpring(value, { stiffness: 100, damping: 30 });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [spring]);

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toString();

  return (
    <span>
      {prefix}{formatted}{suffix}
    </span>
  );
}

function StatCard({
  value,
  label,
  prefix,
  suffix,
  decimals = 0,
  index,
}: {
  value: number;
  label: string;
  prefix: string;
  suffix: string;
  decimals?: number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="text-center"
    >
      <div className="text-4xl font-bold tracking-tight lg:text-5xl text-white">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <motion.div
        key={label}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-3 text-sm text-white/60"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

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
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
        active
          ? "bg-white shadow-sm text-shikoku"
          : "text-white/60 hover:text-white"
      )}
    >
      {children}
      {active && <span className="indicator-dot" />}
    </button>
  );
}

export function Stats() {
  const { selectedAudience, setSelectedAudience } = useAudience();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  // Track when the section becomes sticky
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const rect = stickyRef.current.getBoundingClientRect();
      // Sticky when top is at or near 72px (header height)
      setIsSticky(rect.top <= 73);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track scroll progress within the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Track the highest audience index reached (only progress forward)
  const maxAudienceIndexRef = useRef(0);

  // Update selected audience based on scroll position (only moves forward)
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Map scroll progress to audience index (0 = Emerging, 1 = Growth, 2 = Established)
    const audienceIndex = Math.min(
      audienceIds.length - 1,
      Math.max(0, Math.floor(progress * audienceIds.length))
    );

    // Only update if we've progressed further (never go backwards)
    if (audienceIndex > maxAudienceIndexRef.current) {
      maxAudienceIndexRef.current = audienceIndex;
      const newAudience = audienceIds[audienceIndex];
      if (newAudience && newAudience !== selectedAudience) {
        setSelectedAudience(newAudience);
      }
    }
  });

  const currentValues = statsValues[selectedAudience] || statsValues.startups;
  const currentCopy = audienceCopy[selectedAudience] || audienceCopy.startups;

  // Calculate container height: 25vh per audience segment for proper scroll animation
  const containerHeight = `${audienceIds.length * 25}vh`;

  // Handle manual audience selection
  const handleAudienceClick = (audienceId: string) => {
    setSelectedAudience(audienceId);
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-shikoku"
      style={{ height: containerHeight }}
    >
      {/* Invisible snap targets - one per audience for subtle scroll pausing */}
      {audienceIds.map((_, index) => (
        <div
          key={`snap-${index}`}
          className="absolute snap-section pointer-events-none"
          style={{ top: `${index * 25}vh`, height: '25vh' }}
          aria-hidden="true"
        />
      ))}

      {/* Sticky content - includes audience selector and stats (below header) */}
      <div
        ref={stickyRef}
        className="sticky top-[72px] bg-shikoku relative"
        data-dark-section="true"
      >
        {/* Dark background extension that covers behind the header - only when sticky */}
        {isSticky && (
          <div className="absolute left-0 right-0 bottom-full h-[72px] bg-shikoku" data-dark-section="true" />
        )}

        {/* Audience Selector Bar */}
        <div className="py-6 lg:py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-22">
              {/* Section heading */}
              <h2 className="text-lg lg:text-xl font-semibold tracking-tight text-white whitespace-nowrap">
                Strategic partnerships · Results-driven approach
              </h2>

              {/* Pill selector */}
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
        <div className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12">
              {/* Market Cap */}
              <StatCard
                value={currentValues.marketCap}
                label="Avg. Market Cap Lift"
                prefix="$"
                suffix="M+"
                index={0}
              />
              {/* Clients */}
              <StatCard
                value={currentValues.clients}
                label="Clients Served"
                prefix=""
                suffix="+"
                index={1}
              />
              {/* Volume */}
              <StatCard
                value={currentValues.volume}
                label="Avg. Volume Increase"
                prefix=""
                suffix="x"
                decimals={1}
                index={2}
              />
              {/* Dynamic 4th metric */}
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
      </div>

      {/* Transitional Copy Section - Outside sticky container so it scrolls normally */}
      <div className="py-12 lg:py-16 bg-shikoku" data-dark-section="true">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.h3
            key={currentCopy.headline}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl lg:text-3xl font-semibold text-white mb-4"
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
    </section>
  );
}
