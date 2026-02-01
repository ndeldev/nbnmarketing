"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICES, SERVICE_IMAGES, SERVICE_CONTENT } from "@/lib/constants";
import { useAudience } from "@/lib/hooks/useAudienceContext";
import { getIcon } from "@/lib/icons";

// Simplified service list for cleaner sidebar
const servicesList = SERVICES.map((s) => ({
  id: s.id,
  label: s.title,
  icon: s.icon,
}));

// Service IDs in order for scroll-based switching
const serviceIds: string[] = servicesList.map((s) => s.id);

export function Services() {
  const { selectedAudience } = useAudience();
  const [selectedService, setSelectedService] = useState("advertising");

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stickyRef, { once: true, amount: 0.2 });

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

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerTop = containerRef.current.offsetTop;
    const scrollPerService = (containerRef.current.offsetHeight - window.innerHeight) / serviceIds.length;
    const targetScroll = containerTop + (index * scrollPerService);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const currentContent =
    SERVICE_CONTENT[selectedAudience]?.[selectedService] ||
    SERVICE_CONTENT.startups.advertising;

  const currentService = SERVICES.find((s) => s.id === selectedService);

  // Calculate container height: 100vh per service
  const containerHeight = `${serviceIds.length * 100}vh`;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: containerHeight }}
    >
      {/* Invisible snap targets - one per service for subtle scroll pausing */}
      {serviceIds.map((_, index) => (
        <div
          key={`snap-${index}`}
          className="absolute snap-section pointer-events-none"
          style={{ top: `${index * 100}vh`, height: '100vh' }}
          aria-hidden="true"
        />
      ))}

      {/* Sticky container that stays in viewport while scrolling */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center overflow-hidden bg-toki-nezu/60"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          {/* Main Content Area - Use explicit height to fill viewport */}
          <div className="grid gap-6 md:grid-cols-12" style={{ height: 'calc(90vh - 120px)' }}>
            {/* Left Column - Header + Service Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-4 xl:col-span-3 order-2 md:order-1 flex flex-col h-full"
            >
              {/* Section Header - Constrained to left column */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Full-Stack Investor Relations
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Integrated campaigns that build shareholder bases across North America and Europe.
                </p>
              </div>

              <div className="rounded-2xl bg-card border border-border/50 p-4 shadow-soft flex-1 flex flex-col min-h-0">
                {/* Mobile: Horizontal scroll, Desktop: Vertical list */}
                <nav className="flex md:flex-col gap-2 md:gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0 flex-1 md:justify-center">
                  {servicesList.map((service) => {
                    const ServiceIcon = getIcon(service.icon);
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleServiceClick(service.id)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap md:whitespace-normal md:w-full flex-shrink-0 md:flex-shrink",
                          selectedService === service.id
                            ? "bg-muted font-medium"
                            : "hover:bg-muted/50 text-muted-foreground"
                        )}
                      >
                        <ServiceIcon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{service.label}</span>
                        {selectedService === service.id && (
                          <span className="indicator-dot ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>

            {/* Service Details - Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-8 xl:col-span-9 order-1 md:order-2 h-full"
            >
              <div className="rounded-3xl bg-card border border-border/50 overflow-hidden shadow-soft h-full flex flex-col">
                {/* Visual Area - Stock Image */}
                <div className="flex-1 min-h-[200px] relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedService}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={SERVICE_IMAGES[selectedService] || SERVICE_IMAGES.advertising}
                        alt={currentService?.title || "Service"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                        priority
                      />
                      {/* Subtle overlay for better text contrast below */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Content Area */}
                <div className="p-6 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedAudience}-${selectedService}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Headline with italic emphasis */}
                      <h3 className="text-lg md:text-xl font-bold">
                        {currentContent.headline}{" "}
                        <em className="font-serif text-fuji-nezu">{currentContent.emphasis}</em>
                      </h3>

                      <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
                        {currentContent.description}
                      </p>

                      {/* CTAs matching reference design */}
                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" className="rounded-full px-6 text-sm" asChild>
                          <Link href={`/services/${selectedService}`}>
                            Learn more
                          </Link>
                        </Button>
                        <Button className="rounded-full px-6 text-sm" asChild>
                          <Link href="/contact">Schedule a call</Link>
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
