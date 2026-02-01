import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string | ReactNode;
  subtitle?: string;
  /** Center the header (default: true) */
  centered?: boolean;
  /** Additional classes for the container */
  className?: string;
}

/**
 * Reusable section header for consistent styling across sections
 */
export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`
        ${centered ? "mx-auto max-w-2xl text-center" : ""}
        mb-16
        ${className}
      `}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
