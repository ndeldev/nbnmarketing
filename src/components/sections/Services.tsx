"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICES, SERVICE_IMAGES } from "@/lib/constants";
import { useAudience } from "@/lib/hooks/useAudienceContext";
import { getIcon } from "@/lib/icons";

// Service IDs from constants (structural, not translated)
const servicesList = SERVICES.map((s) => ({
  id: s.id,
  icon: s.icon,
}));

// Service IDs in order for scroll-based switching
const serviceIds: string[] = servicesList.map((s) => s.id);

// Scroll height per service (shorter on mobile for easier scrolling)
const SCROLL_HEIGHT_MOBILE = 35; // vh per service on mobile
const SCROLL_HEIGHT_DESKTOP = 100; // vh per service on desktop

export function Services() {
  const t = useTranslations("services");
  const tCta = useTranslations("common.cta");
  const { selectedAudience } = useAudience();
  const [selectedService, setSelectedService] = useState("advertising");
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const isInView = useInView(stickyRef, { once: true, amount: 0.2 });

  // Auto-scroll the pill nav to show the active service on mobile
  useEffect(() => {
    if (!navRef.current || !isMobile) return;
    const nav = navRef.current;
    const activeButton = nav.querySelector(`[data-service="${selectedService}"]`) as HTMLElement;
    if (activeButton) {
      // Calculate scroll position to center the active button
      const navRect = nav.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      const scrollLeft = activeButton.offsetLeft - (navRect.width / 2) + (buttonRect.width / 2);
      nav.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [selectedService, isMobile]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress within the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update selected service based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Map scroll progress to service index
    const serviceIndex = Math.min(
      serviceIds.length - 1,
      Math.max(0, Math.floor(progress * serviceIds.length))
    );

    const newService = serviceIds[serviceIndex];
    if (newService && newService !== selectedService) {
      setSelectedService(newService);
    }
  });

  // Handle manual service selection - scroll to that position
  const handleServiceClick = (serviceId: string) => {
    const index = serviceIds.indexOf(serviceId);
    if (index === -1 || !containerRef.current) return;

    const containerTop = containerRef.current.offsetTop;
    const scrollPerService = (containerRef.current.offsetHeight - window.innerHeight) / serviceIds.length;
    const targetScroll = containerTop + (index * scrollPerService);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // Fallback to "startups" if selectedAudience is undefined (initial render)
  const audience = selectedAudience || "startups";
  const currentContent = {
    headline: t(`audienceContent.${audience}.${selectedService}.headline`),
    emphasis: t(`audienceContent.${audience}.${selectedService}.emphasis`),
    description: t(`audienceContent.${audience}.${selectedService}.description`),
  };

  const currentServiceTitle = t(`cards.${selectedService}.title`);

  // Calculate container height - shorter on mobile for easier scrolling
  const scrollHeightPerService = isMobile ? SCROLL_HEIGHT_MOBILE : SCROLL_HEIGHT_DESKTOP;
  const containerHeight = `${serviceIds.length * scrollHeightPerService}vh`;

  return (
    <section
      ref={containerRef}
      className="relative bg-toki-nezu/60"
      style={{ height: containerHeight }}
    >
      {/* Invisible snap targets */}
      {serviceIds.map((_, index) => (
        <div
          key={`snap-${index}`}
          className="absolute snap-section pointer-events-none"
          style={{
            top: `${index * scrollHeightPerService}vh`,
            height: `${scrollHeightPerService}vh`
          }}
          aria-hidden="true"
        />
      ))}

      {/* Sticky container - fills viewport minus header */}
      <div
        ref={stickyRef}
        className="sticky top-[72px] h-[calc(100vh-72px)] flex items-center overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center py-4 md:py-0">
          {/* Main Content Area - stacked on mobile, grid on desktop */}
          <div className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-6 md:h-[calc(90vh-120px)]">
            {/* Section Header + Service Selector - appears SECOND on mobile (below card) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-4 xl:col-span-3 order-2 md:order-1 flex flex-col"
            >
              {/* Section Header */}
              <div className="mb-2 md:mb-6">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight md:text-4xl">
                  {t("page.title")}
                </h2>
                <p className="mt-1 md:mt-3 text-sm md:text-base text-muted-foreground">
                  {t("page.description")}
                </p>
              </div>

              {/* Service Selector - horizontal scroll on mobile */}
              <div className="rounded-2xl bg-card border border-border/50 p-2 md:p-4 shadow-soft md:flex-1 md:flex md:flex-col md:min-h-0 relative overflow-hidden">
                {/* Fade hint for scroll - mobile only */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none z-10 md:hidden" />
                <nav ref={navRef} className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 pr-8 md:pr-0 md:flex-1 md:justify-center scrollbar-hide">
                  {servicesList.map((service) => {
                    const ServiceIcon = getIcon(service.icon);
                    return (
                      <button
                        key={service.id}
                        data-service={service.id}
                        onClick={() => handleServiceClick(service.id)}
                        className={cn(
                          "flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-full md:rounded-xl text-left transition-all whitespace-nowrap md:whitespace-normal md:w-full flex-shrink-0 md:flex-shrink text-sm",
                          selectedService === service.id
                            ? "bg-shikoku text-white md:bg-muted md:text-foreground font-medium"
                            : "bg-muted/50 md:bg-transparent hover:bg-muted/80 md:hover:bg-muted/50 text-muted-foreground"
                        )}
                      >
                        <ServiceIcon className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                        <span>{t(`cards.${service.id}.title`)}</span>
                        {selectedService === service.id && (
                          <span className="indicator-dot ml-auto hidden md:block" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>

            {/* Service Details Card - appears FIRST on mobile (above header) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-8 xl:col-span-9 order-1 md:order-2 md:h-full flex-1 md:flex-none"
            >
              <div className="rounded-2xl md:rounded-3xl bg-card border border-border/50 overflow-hidden shadow-soft md:h-full h-full flex flex-col">
                {/* Image area — flex-1 fills available space */}
                <div className="flex-1 min-h-[200px] md:min-h-[200px] relative overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={selectedService}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={SERVICE_IMAGES[selectedService] || SERVICE_IMAGES.advertising}
                        alt={currentServiceTitle}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>
                  {/* Bottom fade — image gradually dissolves into card background */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 md:h-28 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Content Area */}
                <div className="relative z-10 p-4 sm:p-5 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedAudience}-${selectedService}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Headline with italic emphasis */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold">
                        {currentContent.headline}{" "}
                        <em className="font-serif text-fuji-nezu">{currentContent.emphasis}</em>
                      </h3>

                      <p className="mt-2 md:mt-3 text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                        {currentContent.description}
                      </p>

                      {/* CTAs - stacked on mobile */}
                      <div className="mt-4 md:mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <Button variant="outline" className="rounded-full px-4 sm:px-6 text-sm" asChild>
                          <Link href={`/services/${selectedService}`}>
                            {tCta("learnMore")} {currentServiceTitle}
                          </Link>
                        </Button>
                        <Button className="rounded-full px-4 sm:px-6 text-sm" asChild>
                          <Link href="/contact">{tCta("scheduleCall")}</Link>
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
