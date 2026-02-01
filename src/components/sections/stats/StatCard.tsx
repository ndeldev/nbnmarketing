"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "./AnimatedNumber";
import { EASING } from "@/lib/animations";

interface StatCardProps {
  value: number;
  label: string;
  prefix: string;
  suffix: string;
  decimals?: number;
  index: number;
}

/**
 * Individual stat card with animated number and label
 */
export function StatCard({
  value,
  label,
  prefix,
  suffix,
  decimals = 0,
  index,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: EASING.smooth,
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
