import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  description: string;
  children?: ReactNode;
  /** Additional classes for the section */
  className?: string;
}

/**
 * Reusable page hero section for internal pages
 * Provides consistent styling for page headers across the site
 */
export function PageHero({
  title,
  description,
  children,
  className = "",
}: PageHeroProps) {
  return (
    <section className={`bg-muted/30 py-24 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {description}
          </p>
          {children && (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
