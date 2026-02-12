"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { BentoCardWave, BentoCardWithImage } from "@/components/ui/bento-card";
import { Globe, Pickaxe, BarChart3, Sparkles } from "lucide-react";

export function Features() {
  const t = useTranslations("home.features");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Full-Stack card transforms (0-50% of scroll) - disabled on mobile
  const waveCardWidth = useTransform(smoothProgress, [0, 0.5], isMobile ? ["100%", "100%"] : ["100%", "66.67%"]);
  const waveCardScale = useTransform(smoothProgress, [0, 0.3], isMobile ? [1, 1] : [1.02, 1]);

  // Right column cards - staggered appearance (30-55% of scroll) - visible on mobile
  const rightCard1Opacity = useTransform(smoothProgress, [0.3, 0.45], isMobile ? [1, 1] : [0, 1]);
  const rightCard1Y = useTransform(smoothProgress, [0.3, 0.45], isMobile ? [0, 0] : [30, 0]);
  const rightCard2Opacity = useTransform(smoothProgress, [0.4, 0.55], isMobile ? [1, 1] : [0, 1]);
  const rightCard2Y = useTransform(smoothProgress, [0.4, 0.55], isMobile ? [0, 0] : [30, 0]);

  // Bottom row cards - slide from sides (70-93% of scroll) - visible on mobile
  const bottomCard1Opacity = useTransform(smoothProgress, [0.70, 0.85], isMobile ? [1, 1] : [0, 1]);
  const bottomCard1X = useTransform(smoothProgress, [0.70, 0.85], isMobile ? [0, 0] : [-50, 0]);
  const bottomCard2Opacity = useTransform(smoothProgress, [0.78, 0.93], isMobile ? [1, 1] : [0, 1]);
  const bottomCard2X = useTransform(smoothProgress, [0.78, 0.93], isMobile ? [0, 0] : [50, 0]);

  // Title overlay - scrolls up and fades out (hidden on mobile, shown normally)
  const titleY = useTransform(smoothProgress, [0, 0.25], isMobile ? [0, 0] : [0, -120]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.2], isMobile ? [1, 1] : [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-fuji-nezu/60 md:[height:300vh]"
    >
      {/* Mobile: static, Desktop: sticky with scroll animations */}
      <div className="md:sticky md:top-20 md:min-h-screen flex flex-col justify-center py-12 md:py-8 lg:py-12 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          {/* Bento Layout */}
          <div className="flex flex-col gap-4 md:gap-6 relative">
            {/* Section Header - static on mobile, animated overlay on desktop */}
            <motion.div
              className="md:absolute md:top-8 md:left-0 md:right-0 z-10 text-center md:pointer-events-none will-change-[opacity,transform] mb-6 md:mb-0"
              style={{
                y: titleY,
                opacity: titleOpacity,
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight sm:text-4xl text-shikoku md:text-white md:drop-shadow-lg">
                {t("title")} <em className="font-serif not-italic">{t("brandName")}</em>
              </h2>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground md:text-white/90 md:drop-shadow-md max-w-2xl mx-auto">
                {t("subtitle")}
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
                  title={t("fullStack.title")}
                  description={t("fullStack.description")}
                  badge={t("fullStack.badge")}
                  image="/images/features/data-driven.webp"
                  bgColorHex="#A6A5C4"
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
                    title={t("globalReach.title")}
                    description={t("globalReach.description")}
                    image="/images/features/dedicated-teams.webp"
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
                    title={t("sectorExpertise.title")}
                    description={t("sectorExpertise.description")}
                    image="/images/features/creative.webp"
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
                  title={t("measurableResults.title")}
                  description={t("measurableResults.description")}
                  image="/images/features/transparency.webp"
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
                  title={t("complianceAware.title")}
                  description={t("complianceAware.description")}
                  image="/images/features/security.webp"
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
