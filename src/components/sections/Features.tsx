"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { BentoCardWave, BentoCardWithImage } from "@/components/ui/bento-card";
import { Globe, Pickaxe, BarChart3, Sparkles } from "lucide-react";

const waveFeature = {
  title: "Full-Stack Coverage",
  description:
    "From digital advertising to investor outreach, we handle every aspect of your IR campaign. One team, one strategy, seamless execution across all channels.",
  badge: "Integrated",
  image: "/images/features/data-driven.jpg",
  bgColorHex: "#A6A5C4", // Fuji Nezu
};

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress with spring physics for buttery animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Full-Stack card transforms (0-50% of scroll)
  const waveCardWidth = useTransform(smoothProgress, [0, 0.5], ["100%", "66.67%"]);
  const waveCardScale = useTransform(smoothProgress, [0, 0.3], [1.02, 1]);

  // Right column cards - staggered appearance (30-55% of scroll)
  const rightCard1Opacity = useTransform(smoothProgress, [0.3, 0.45], [0, 1]);
  const rightCard1Y = useTransform(smoothProgress, [0.3, 0.45], [30, 0]);
  const rightCard2Opacity = useTransform(smoothProgress, [0.4, 0.55], [0, 1]);
  const rightCard2Y = useTransform(smoothProgress, [0.4, 0.55], [30, 0]);

  // Bottom row cards - slide from sides (70-93% of scroll)
  const bottomCard1Opacity = useTransform(smoothProgress, [0.70, 0.85], [0, 1]);
  const bottomCard1X = useTransform(smoothProgress, [0.70, 0.85], [-50, 0]);
  const bottomCard2Opacity = useTransform(smoothProgress, [0.78, 0.93], [0, 1]);
  const bottomCard2X = useTransform(smoothProgress, [0.78, 0.93], [50, 0]);

  // Title overlay - scrolls up and fades out
  const titleY = useTransform(smoothProgress, [0, 0.25], [0, -120]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-fuji-nezu/60"
      style={{ height: "300vh" }}
    >
      {/* Sticky content that stays in viewport during scroll - top-20 accounts for fixed header */}
      <div className="sticky top-20 min-h-screen flex flex-col justify-center py-8 lg:py-12 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          {/* Bento Layout */}
          <div className="flex flex-col gap-4 md:gap-6 relative">
            {/* Section Header - overlaid on card, scrolls up and fades */}
            <motion.div
              className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none will-change-[opacity,transform]"
              style={{
                y: titleY,
                opacity: titleOpacity,
              }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white drop-shadow-lg">
                Why Choose <em className="font-serif not-italic">Meridian</em>
              </h2>
              <p className="mt-4 text-lg text-white/90 drop-shadow-md max-w-2xl mx-auto">
                We understand the unique challenges of junior capital markets and
                tailor our approach accordingly.
              </p>
            </motion.div>
            {/* Top row: Large card + 2 stacked cards */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-stretch">
              {/* Large wave card - animated from full width to 2/3 width on scroll */}
              <motion.div
                className="md:flex-shrink-0 will-change-[width,transform]"
                style={{
                  width: waveCardWidth,
                  scale: waveCardScale,
                }}
              >
                <BentoCardWave
                  title={waveFeature.title}
                  description={waveFeature.description}
                  badge={waveFeature.badge}
                  image={waveFeature.image}
                  bgColorHex={waveFeature.bgColorHex}
                  className="h-full"
                />
              </motion.div>

              {/* Right column - 2 stacked cards (revealed as wave card shrinks) */}
              <div className="md:flex-1 flex flex-col gap-4 md:gap-6 min-w-0">
                <motion.div
                  className="flex-1 will-change-[opacity,transform]"
                  style={{
                    opacity: rightCard1Opacity,
                    y: rightCard1Y,
                  }}
                >
                  <BentoCardWithImage
                    title="Global Reach"
                    description="Active investor networks across North America and Europe. We reach shareholders where they are."
                    image="/images/features/dedicated-teams.jpg"
                    icon={<Globe className="h-5 w-5 text-primary" />}
                    className="h-full"
                  />
                </motion.div>

                <motion.div
                  className="flex-1 will-change-[opacity,transform]"
                  style={{
                    opacity: rightCard2Opacity,
                    y: rightCard2Y,
                  }}
                >
                  <BentoCardWithImage
                    title="Sector Expertise"
                    description="Deep experience with mining, tech, and life sciences. We speak your industry's language."
                    image="/images/features/creative.jpg"
                    icon={<Pickaxe className="h-5 w-5 text-primary" />}
                    className="h-full"
                  />
                </motion.div>
              </div>
            </div>

            {/* Bottom row: 2 equal cards */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <motion.div
                className="md:w-1/2 will-change-[opacity,transform]"
                style={{
                  opacity: bottomCard1Opacity,
                  x: bottomCard1X,
                }}
              >
                <BentoCardWithImage
                  title="Measurable Results"
                  description="We track what matters: shareholder growth, trading volume, and market cap movement. Real-time dashboards show campaign impact."
                  image="/images/features/transparency.jpg"
                  icon={<BarChart3 className="h-5 w-5 text-primary" />}
                  className="h-full"
                />
              </motion.div>

              <motion.div
                className="md:w-1/2 will-change-[opacity,transform]"
                style={{
                  opacity: bottomCard2Opacity,
                  x: bottomCard2X,
                }}
              >
                <BentoCardWithImage
                  title="Compliance Aware"
                  description="We understand regulatory requirements for TSX-V, CSE, and Frankfurt. All campaigns are structured for compliance."
                  image="/images/features/security.jpg"
                  icon={<Sparkles className="h-5 w-5 text-primary" />}
                  className="h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
