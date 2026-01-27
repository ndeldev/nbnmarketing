"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BentoCard, BentoCardWave } from "@/components/ui/bento-card";
import { Globe, Pickaxe, BarChart3, Sparkles } from "lucide-react";

const waveFeature = {
  title: "Full-Stack Coverage",
  description:
    "From digital advertising to investor outreach, we handle every aspect of your IR campaign. One team, one strategy, seamless execution across all channels.",
  badge: "Integrated",
  image: "/images/features/data-driven.jpg",
  bgColorHex: "#A6A5C4", // Fuji Nezu
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose <em className="font-serif not-italic">Meridian</em>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We understand the unique challenges of junior capital markets and
            tailor our approach accordingly.
          </p>
        </motion.div>

        {/* Bento Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-4 md:gap-6"
        >
          {/* Top row: Large card + 2 stacked cards */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Large wave card - 2/3 width */}
            <motion.div variants={cardVariants} className="md:w-2/3">
              <BentoCardWave
                title={waveFeature.title}
                description={waveFeature.description}
                badge={waveFeature.badge}
                image={waveFeature.image}
                bgColorHex={waveFeature.bgColorHex}
                className="h-full min-h-[300px] md:min-h-[340px]"
              />
            </motion.div>

            {/* Right column - 2 stacked cards */}
            <div className="md:w-1/3 flex flex-col gap-4 md:gap-6">
              <motion.div variants={cardVariants} className="flex-1">
                <BentoCard className="h-full">
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10"
                    >
                      <Globe className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="mt-5 text-xl font-semibold">Global Reach</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed text-sm">
                      Active investor networks across North America and Europe.
                      We reach shareholders where they are.
                    </p>
                  </div>
                </BentoCard>
              </motion.div>

              <motion.div variants={cardVariants} className="flex-1">
                <BentoCard className="h-full">
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10"
                    >
                      <Pickaxe className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="mt-5 text-xl font-semibold">Sector Expertise</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed text-sm">
                      Deep experience with mining, tech, and life sciences. We
                      speak your industry&apos;s language.
                    </p>
                  </div>
                </BentoCard>
              </motion.div>
            </div>
          </div>

          {/* Bottom row: 2 equal cards */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <motion.div variants={cardVariants} className="md:w-1/2">
              <BentoCard className="h-full">
                <div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10"
                  >
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="mt-6 text-xl font-semibold">Measurable Results</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    We track what matters: shareholder growth, trading volume, and
                    market cap movement. Real-time dashboards show campaign impact.
                  </p>
                </div>
              </BentoCard>
            </motion.div>

            <motion.div variants={cardVariants} className="md:w-1/2">
              <BentoCard className="h-full">
                <div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10"
                  >
                    <Sparkles className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="mt-6 text-xl font-semibold">Compliance Aware</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    We understand regulatory requirements for TSX-V, CSE, and Frankfurt.
                    All campaigns are structured for compliance.
                  </p>
                </div>
              </BentoCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
