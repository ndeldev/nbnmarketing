import Image from "next/image";
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
        "rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-soft",
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

// Wave card with image and animated wave effect
interface BentoCardWaveProps {
  title: string;
  description: string;
  badge?: string;
  image: string;
  bgColorHex?: string;
  className?: string;
}

export function BentoCardWave({
  title,
  description,
  badge,
  image,
  bgColorHex = "#A6A5C4",
  className,
}: BentoCardWaveProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden shadow-crisp",
        className
      )}
      style={{ backgroundColor: bgColorHex }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-60"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Wave SVG decoration */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-24 text-white/10"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,64 C288,96 576,32 864,64 C1152,96 1440,64 1440,64 L1440,120 L0,120 Z"
        />
      </svg>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        {badge && (
          <span className="inline-flex self-start mb-3 px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">
            {badge}
          </span>
        )}
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-white/80 leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}
