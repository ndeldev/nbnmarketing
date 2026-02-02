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

// Card with image header
interface BentoCardWithImageProps {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
  className?: string;
}

export function BentoCardWithImage({
  title,
  description,
  image,
  icon,
  className,
}: BentoCardWithImageProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 bg-card overflow-hidden shadow-soft card-hover",
        className
      )}
    >
      {/* Image area */}
      <div className="relative h-32 md:h-40">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        {icon && (
          <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-sm">
            {icon}
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
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
        "rounded-2xl border border-border/50 bg-card overflow-hidden shadow-soft flex flex-col",
        className
      )}
    >
      {/* Image area - flex-1 stretches to fill, min-h ensures minimum */}
      <div className="relative flex-1 min-h-[200px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        {/* Gradient overlay - darker at top for title readability, fades to card at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        {/* Badge in top-left of image */}
        {badge && (
          <span
            className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full text-white backdrop-blur-sm"
            style={{ backgroundColor: `${bgColorHex}cc` }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="p-4 md:p-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
