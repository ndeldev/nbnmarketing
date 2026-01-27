"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/lib/hooks/useCountUp";

const stats = [
  { value: "$50M+", label: "Market Cap Generated" },
  { value: "200+", label: "Campaigns Executed" },
  { value: "3", label: "Continents Covered" },
  { value: "15+", label: "Years Experience" },
];

function StatCard({
  stat,
  index,
  inView,
}: {
  stat: { value: string; label: string };
  index: number;
  inView: boolean;
}) {
  const { formattedValue, start } = useCountUp(stat.value, {
    duration: 1500,
    delay: index * 150,
  });

  useEffect(() => {
    if (inView) {
      start();
    }
  }, [inView, start]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="text-center"
    >
      <div className="text-4xl font-bold tracking-tight lg:text-5xl">
        {formattedValue}
      </div>
      <div className="mt-3 text-sm text-muted-foreground">{stat.label}</div>
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="border-y border-border/50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              inView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
