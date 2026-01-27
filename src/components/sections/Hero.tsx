"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Stats for the floating metrics card
const metrics = [
  { value: "$50M+", label: "Market cap generated" },
  { value: "200+", label: "Campaigns executed" },
  { value: "3", label: "Continents covered" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dark gradient background with Ken Burns effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {/* Atmospheric gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(166, 165, 196, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 100%, rgba(228, 210, 216, 0.1) 0%, transparent 40%),
              linear-gradient(180deg, #1a1a2e 0%, #2E2930 40%, #1f1f2e 100%)
            `,
          }}
        />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-gradient-to-br from-fuji-nezu/10 via-transparent to-toki-nezu/10" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen py-12 lg:py-0">
          {/* Left content - takes 6 columns */}
          <div className="lg:col-span-6 max-w-xl">
            {/* Eyebrow text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-medium uppercase tracking-[0.25em] text-fuji-nezu mb-6"
            >
              Capital Markets Communications
            </motion.p>

            {/* Headline - single line per phrase */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white"
            >
              <span className="whitespace-nowrap">Build awareness.</span>
              <br />
              <span className="whitespace-nowrap text-fuji-nezu">Build value.</span>
            </motion.h1>

            {/* Subtitle with label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-3">
                Full-Stack Investor Relations
              </p>
              <p className="max-w-md text-base leading-relaxed text-white/60">
                We help public companies build shareholder bases across North America
                and Europe. Turn corporate milestones into market cap.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
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
                className="rounded-full px-8 text-white/70 hover:text-white hover:bg-white/5"
                asChild
              >
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </motion.div>

            {/* Small disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 text-[11px] text-white/30"
            >
              No long-term contracts · Results-driven approach
            </motion.p>
          </div>

          {/* Right side - Floating metrics card - takes 4 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-4 lg:col-start-9 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[240px]">
              {/* Glassmorphism card */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-5">
                {/* Card header */}
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">
                  Performance Data
                </p>
                <h3 className="mt-0.5 text-sm font-semibold text-white/90">
                  Client Results
                </h3>

                {/* Metrics */}
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
                      <p className="text-[11px] text-white/40">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Footnote */}
                <p className="mt-5 pt-4 border-t border-white/[0.06] text-[9px] leading-relaxed text-white/25">
                  *Median results across active client campaigns comparing
                  pre-engagement to post-engagement metrics.
                </p>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-8 -z-10 rounded-3xl bg-fuji-nezu/10 blur-3xl" />
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
