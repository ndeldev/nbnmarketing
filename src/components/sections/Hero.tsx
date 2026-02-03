"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

// Stats for the floating metrics card
const metrics = [
  { value: "$50M+", label: "Market cap generated" },
  { value: "200+", label: "Campaigns executed" },
  { value: "3", label: "Continents covered" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves slower than scroll (0.3x speed)
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Optional: scale up slightly as user scrolls for depth effect
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden" data-dark-section="true">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          y: imageY,
          scale: imageScale,
        }}
      >
        <Image
          src="/images/explorer-milky-way-canyon.webp"
          alt="Explorer surveying vast canyon beneath the Milky Way"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        {/* Dark opacity overlay - reduced to 30% for lighter image */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-gradient-to-br from-fuji-nezu/10 via-transparent to-toki-nezu/10" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen pt-24 pb-12 lg:py-0">
          {/* Left content - takes 6 columns */}
          <div className="lg:col-span-6 max-w-xl">
            {/* Eyebrow text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-medium uppercase tracking-[0.25em] text-fuji-nezu mb-6"
              style={{ textShadow: '0 0 2px rgba(255,255,255,0.8), 0 0 16px rgba(166, 165, 196, 1), 0 0 32px rgba(166, 165, 196, 0.8), 0 0 48px rgba(166, 165, 196, 0.5), 0 1px 4px rgba(0,0,0,0.8)' }}
            >
              Capital Markets Communications
            </motion.p>

            {/* Headline - single line per phrase - NO animation delay for LCP */}
            <h1
              className="text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <span className="whitespace-nowrap">Build awareness.</span>
              <br />
              <span className="whitespace-nowrap text-fuji-nezu drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Build value.</span>
            </h1>

            {/* Subtitle with label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-4"
                style={{ textShadow: '0 0 2px rgba(255,255,255,0.8), 0 0 16px rgba(166, 165, 196, 1), 0 0 32px rgba(166, 165, 196, 0.8), 0 0 48px rgba(166, 165, 196, 0.5), 0 1px 4px rgba(0,0,0,0.8)' }}
              >
                Full-Stack Investor Relations
              </p>
              <p className="max-w-sm text-base leading-relaxed text-white/80">
                We help public companies build shareholder bases across North America
                and Europe. Turn corporate milestones into market cap.
              </p>
            </motion.div>

            {/* Mobile metrics card - between subtitle and CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 lg:hidden"
            >
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-5 max-w-[280px]">
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">
                  Performance Data
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white/90">
                  Client Results
                </p>
                <div className="mt-4 flex gap-6">
                  {metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-xl font-bold text-white">
                        {metric.value}
                      </p>
                      <p className="text-[10px] text-white/80">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 lg:mt-10 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="rounded-full bg-white px-8 text-shikoku hover:bg-white/90 group"
                asChild
              >
                <Link href="/contact">
                  Launch Your Campaign
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full px-8 text-white/80 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </motion.div>

          </div>

          {/* Right side - Floating metrics card - desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex lg:col-span-4 lg:col-start-9 justify-end"
          >
            <div className="relative w-full max-w-[240px]">
              {/* Glassmorphism card with video-synced glow */}
              <motion.div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-5"
              >
                {/* Card header */}
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">
                  Performance Data
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white/90">
                  Client Results
                </p>

                {/* Metrics with text glow synced to video */}
                <div className="mt-5 space-y-4">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    >
                      <p className="text-2xl font-bold text-white">
                        {metric.value}
                      </p>
                      <p className="text-[11px] text-white/80">
                        {metric.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Footnote */}
                <p className="mt-5 pt-4 border-t border-white/[0.06] text-[9px] leading-relaxed text-white/60">
                  *Median results across active client campaigns comparing
                  pre-engagement to post-engagement metrics.
                </p>
              </motion.div>

              {/* Decorative glow */}
              <div className="absolute -inset-8 -z-10 rounded-3xl bg-fuji-nezu/10 blur-3xl opacity-50" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto h-8 w-5 rounded-full border border-white/10"
        >
          <motion.div
            animate={{ y: [2, 12, 2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-1.5 h-1.5 w-1 rounded-full bg-white/30"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
