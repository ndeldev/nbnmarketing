"use client";

import { useEffect, useState } from "react";
import { useSpring } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/**
 * Animated number component that smoothly transitions between values
 * using Framer Motion spring physics
 */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedNumberProps) {
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
