"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Stats for the floating metrics card
const metrics = [
  { value: "$50M+", label: "Market cap generated" },
  { value: "200+", label: "Campaigns executed" },
  { value: "3", label: "Continents covered" },
];

// Video duration in seconds
const VIDEO_DURATION = 8;

// Progress keypoints (as 0-1 values based on 8s video)
const PROGRESS_KEYPOINTS = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];

// Glow intensity values at each keypoint
const GLOW_BLUR = [0, 0, 20, 40, 50, 35, 15, 0, 0];
const GLOW_OPACITY = [0, 0, 0.15, 0.3, 0.35, 0.25, 0.1, 0, 0];
const TEXT_GLOW_BLUR = [0, 0, 10, 20, 25, 18, 8, 0, 0];
const TEXT_GLOW_OPACITY = [0, 0, 0.5, 0.8, 0.9, 0.6, 0.3, 0, 0];
const BG_GLOW_OPACITY = [0.3, 0.3, 0.5, 0.8, 0.9, 0.7, 0.4, 0.3, 0.3];
const BG_GLOW_SCALE = [1, 1, 1.02, 1.05, 1.06, 1.03, 1.01, 1, 1];

// Interpolate value from keypoints
function interpolate(progress: number, keypoints: number[], values: number[]): number {
  if (progress <= 0) return values[0];
  if (progress >= 1) return values[values.length - 1];

  for (let i = 0; i < keypoints.length - 1; i++) {
    if (progress >= keypoints[i] && progress <= keypoints[i + 1]) {
      const t = (progress - keypoints[i]) / (keypoints[i + 1] - keypoints[i]);
      return values[i] + t * (values[i + 1] - values[i]);
    }
  }
  return values[0];
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [glowState, setGlowState] = useState({
    blur: 0,
    opacity: 0,
    textBlur: 0,
    textOpacity: 0,
    bgOpacity: 0.3,
    bgScale: 1,
  });

  // Mark as mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync animation progress to video currentTime
  useEffect(() => {
    if (!mounted) return;

    const video = videoRef.current;
    if (!video) return;

    let animationId: number;
    const updateGlow = () => {
      if (video && !video.paused) {
        const progress = video.currentTime / VIDEO_DURATION;
        setGlowState({
          blur: interpolate(progress, PROGRESS_KEYPOINTS, GLOW_BLUR),
          opacity: interpolate(progress, PROGRESS_KEYPOINTS, GLOW_OPACITY),
          textBlur: interpolate(progress, PROGRESS_KEYPOINTS, TEXT_GLOW_BLUR),
          textOpacity: interpolate(progress, PROGRESS_KEYPOINTS, TEXT_GLOW_OPACITY),
          bgOpacity: interpolate(progress, PROGRESS_KEYPOINTS, BG_GLOW_OPACITY),
          bgScale: interpolate(progress, PROGRESS_KEYPOINTS, BG_GLOW_SCALE),
        });
      }
      animationId = requestAnimationFrame(updateGlow);
    };
    animationId = requestAnimationFrame(updateGlow);

    return () => cancelAnimationFrame(animationId);
  }, [mounted]);

  // Generate style strings (only apply on client after mount)
  const cardBoxShadow = mounted
    ? `0 0 ${glowState.blur}px rgba(255,200,100,${glowState.opacity}), inset 0 0 ${glowState.blur * 2}px rgba(255,200,100,${glowState.opacity * 0.5})`
    : undefined;

  const textShadow = mounted
    ? `0 0 ${glowState.textBlur}px rgba(255,200,100,${glowState.textOpacity})`
    : undefined;

  return (
    <section className="relative h-screen overflow-hidden" data-dark-section="true">
      {/* Background video - looping */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/meridian-hero-v3-loop.mp4" type="video/mp4" />
        </video>
        {/* Dark opacity overlay - 60% for good text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-gradient-to-br from-fuji-nezu/10 via-transparent to-toki-nezu/10" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen py-12 lg:py-0">
          {/* Left content - takes 6 columns */}
          <div className="lg:col-span-6 max-w-xl">
            {/* Eyebrow text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-medium uppercase tracking-[0.25em] text-fuji-nezu mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            >
              Capital Markets Communications
            </motion.p>

            {/* Headline - single line per phrase */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <span className="whitespace-nowrap">Build awareness.</span>
              <br />
              <span className="whitespace-nowrap text-fuji-nezu drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Build value.</span>
            </motion.h1>

            {/* Subtitle with label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
                Full-Stack Investor Relations
              </p>
              <p className="max-w-sm text-base leading-relaxed text-white/80">
                We help public companies build shareholder bases across North America
                and Europe. Turn corporate milestones into market cap.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-4"
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

          {/* Right side - Floating metrics card - takes 4 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-4 lg:col-start-9 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[240px]">
              {/* Glassmorphism card with video-synced glow */}
              <motion.div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-5"
                style={{ boxShadow: cardBoxShadow }}
              >
                {/* Card header with glow */}
                <motion.p
                  className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/70"
                  style={{ textShadow }}
                >
                  Performance Data
                </motion.p>
                <motion.h3
                  className="mt-0.5 text-sm font-semibold text-white/90"
                  style={{ textShadow }}
                >
                  Client Results
                </motion.h3>

                {/* Metrics with text glow synced to video */}
                <div className="mt-5 space-y-4">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    >
                      <motion.p
                        className="text-2xl font-bold text-white"
                        style={{ textShadow }}
                      >
                        {metric.value}
                      </motion.p>
                      <motion.p
                        className="text-[11px] text-white/80"
                        style={{ textShadow }}
                      >
                        {metric.label}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>

                {/* Footnote */}
                <p className="mt-5 pt-4 border-t border-white/[0.06] text-[9px] leading-relaxed text-white/60">
                  *Median results across active client campaigns comparing
                  pre-engagement to post-engagement metrics.
                </p>
              </motion.div>

              {/* Decorative glow - video synced */}
              <div
                className="absolute -inset-8 -z-10 rounded-3xl bg-fuji-nezu/10 blur-3xl"
                style={mounted ? {
                  opacity: glowState.bgOpacity,
                  transform: `scale(${glowState.bgScale})`,
                } : undefined}
              />
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
