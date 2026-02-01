/**
 * Shared animation constants for Framer Motion
 * Use these throughout the codebase for consistent animations
 */

// Standard easing curves
export const EASING = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  inOut: "easeInOut" as const,
} as const;

// Standard durations in seconds
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  ambient: 1.5,
} as const;

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
} as const;

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
} as const;

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
} as const;

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
} as const;

// Stagger container for child animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

// Card animation variant (for use with stagger container)
export const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING.smooth,
    },
  },
} as const;

// Standard transition with smooth easing
export const smoothTransition = {
  duration: DURATION.normal,
  ease: EASING.smooth,
} as const;

// Delayed transition helper
export const delayedTransition = (delay: number) => ({
  duration: DURATION.normal,
  delay,
  ease: EASING.smooth,
});
