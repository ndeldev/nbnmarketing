"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface UseCountUpOptions {
  duration?: number;
  delay?: number;
  startOnMount?: boolean;
}

interface UseCountUpReturn {
  value: number;
  formattedValue: string;
  start: () => void;
  reset: () => void;
  isAnimating: boolean;
}

/**
 * Parse a value string to extract numeric part and suffix
 * Examples: "50+" → { number: 50, suffix: "+" }
 *           "3x" → { number: 3, suffix: "x" }
 *           "95%" → { number: 95, suffix: "%" }
 *           "10M+" → { number: 10, suffix: "M+" }
 */
function parseValue(value: string): { number: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) {
    return { number: 0, prefix: "", suffix: "" };
  }
  return {
    prefix: match[1] || "",
    number: parseFloat(match[2]) || 0,
    suffix: match[3] || "",
  };
}

/**
 * Easing function for smooth animation (ease-out)
 */
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Custom hook for animated number counting
 * Respects prefers-reduced-motion preference
 */
export function useCountUp(
  target: string | number,
  options: UseCountUpOptions = {}
): UseCountUpReturn {
  const { duration = 1500, delay = 0, startOnMount = false } = options;

  const targetString = String(target);
  const { number: targetNumber, prefix, suffix } = parseValue(targetString);

  const [value, setValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const prefersReducedMotion = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setValue(easedProgress * targetNumber);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setValue(targetNumber);
        setIsAnimating(false);
      }
    },
    [duration, targetNumber]
  );

  const start = useCallback(() => {
    // If reduced motion is preferred, skip animation
    if (prefersReducedMotion.current) {
      setValue(targetNumber);
      return;
    }

    // Reset for new animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = null;
    setValue(0);
    setIsAnimating(true);

    // Start animation after delay
    if (delay > 0) {
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, delay);
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animate, delay, targetNumber]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setValue(0);
    setIsAnimating(false);
    startTimeRef.current = null;
  }, []);

  // Start on mount if requested
  useEffect(() => {
    if (startOnMount) {
      start();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [startOnMount, start]);

  // Format value with appropriate decimal places
  const formattedValue = (() => {
    // Determine decimal places based on target
    const decimalPlaces = targetNumber % 1 === 0 ? 0 : 1;
    const rounded =
      decimalPlaces === 0 ? Math.round(value) : Number(value.toFixed(decimalPlaces));
    return `${prefix}${rounded}${suffix}`;
  })();

  return {
    value,
    formattedValue,
    start,
    reset,
    isAnimating,
  };
}
