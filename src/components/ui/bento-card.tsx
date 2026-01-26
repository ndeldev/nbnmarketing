import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 bg-card p-6 md:p-8",
        "card-hover",
        colSpan === 2 && "md:col-span-2",
        rowSpan === 2 && "md:row-span-2",
        className
      )}
    >
      {children}
    </div>
  );
}

// Variant for featured/highlighted cards
interface BentoCardFeaturedProps extends BentoCardProps {
  gradient?: "warm" | "soft" | "dreamy";
}

export function BentoCardFeatured({
  children,
  className,
  colSpan = 2,
  rowSpan = 1,
  gradient = "warm",
}: BentoCardFeaturedProps) {
  return (
    <div
      className={cn(
        "rounded-3xl overflow-hidden",
        colSpan === 2 && "md:col-span-2",
        rowSpan === 2 && "md:row-span-2",
        className
      )}
    >
      <div
        className={cn(
          "h-full p-8 md:p-10",
          gradient === "warm" && "gradient-warm",
          gradient === "soft" && "gradient-soft",
          gradient === "dreamy" && "gradient-dreamy"
        )}
      >
        {children}
      </div>
    </div>
  );
}
