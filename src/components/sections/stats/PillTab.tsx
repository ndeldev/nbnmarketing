"use client";

import { cn } from "@/lib/utils";

interface PillTabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

/**
 * Pill-shaped tab button for audience segment selection
 */
export function PillTab({
  active,
  onClick,
  children,
}: PillTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
        active
          ? "bg-white shadow-sm text-shikoku"
          : "text-white/60 hover:text-white"
      )}
    >
      {children}
      {active && <span className="indicator-dot" />}
    </button>
  );
}
