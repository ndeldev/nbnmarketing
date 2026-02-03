"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(false); // Start false, detect on mount

  useEffect(() => {
    const handleScroll = () => {
      // Trigger pill form as soon as user starts scrolling
      const scrollThreshold = 20;
      setScrolled(window.scrollY > scrollThreshold);

      // Detect if header is over a dark section
      const headerY = scrolled ? 40 : 60; // Approximate header center position

      // Get all dark sections (marked with data attribute)
      const darkSections = document.querySelectorAll('[data-dark-section="true"]');
      let isOverDark = false;

      // Check each dark section to see if header overlaps
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerY && rect.bottom >= headerY) {
          isOverDark = true;
        }
      });

      setOnDarkSection(isOverDark);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
    setLangMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed z-50 w-full transition-all duration-300",
        scrolled ? "top-4 px-6 lg:px-8" : "top-0"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-300",
          scrolled
            ? "max-w-4xl px-8 py-2.5 rounded-full bg-white/20 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/20"
            : "max-w-7xl px-6 py-5 lg:px-8"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              "text-xl font-bold tracking-tight transition-colors duration-300",
              onDarkSection ? "text-white" : "text-foreground"
            )}
          >
            {BRAND_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className={cn(
          "hidden lg:flex lg:items-center transition-all duration-300",
          scrolled ? "lg:gap-x-6" : "lg:gap-x-10"
        )}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link-underline text-sm font-medium transition-colors",
                onDarkSection
                  ? "text-white/90 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Section - Language + CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 text-sm transition-colors",
                onDarkSection
                  ? "text-white/90 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {language.toUpperCase()}
              <ChevronDown className={cn("h-3 w-3 transition-transform", langMenuOpen && "rotate-180")} />
            </button>

            {/* Dropdown */}
            {langMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[60px]">
                  <button
                    onClick={() => { setLanguage("en"); setLangMenuOpen(false); }}
                    className={cn(
                      "w-full px-3 py-1.5 text-sm text-left hover:bg-muted transition-colors",
                      language === "en" && "font-medium text-foreground"
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => { setLanguage("de"); setLangMenuOpen(false); }}
                    className={cn(
                      "w-full px-3 py-1.5 text-sm text-left hover:bg-muted transition-colors",
                      language === "de" && "font-medium text-foreground"
                    )}
                  >
                    DE
                  </button>
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          <Button
            className={cn(
              "rounded-full px-6 transition-colors duration-300",
              onDarkSection
                ? "bg-white text-shikoku hover:bg-white/90"
                : "bg-shikoku text-white hover:bg-shikoku/90"
            )}
            asChild
          >
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={cn(
            "lg:hidden p-2 -mr-2 rounded-lg transition-colors",
            onDarkSection
              ? "text-white hover:bg-white/10"
              : "text-foreground hover:bg-muted"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation - Glass UI dropdown */}
      <div
        className={cn(
          "absolute left-4 right-4 z-40 lg:hidden transition-all duration-300 ease-out",
          scrolled ? "top-[60px]" : "top-[73px]",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        {/* Glass menu content */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/10 overflow-hidden">
          <div className="px-4 py-5 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-base font-medium rounded-xl transition-colors text-shikoku hover:bg-black/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Toggle in Mobile */}
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="text-sm text-muted-foreground">Language:</span>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-3 py-1 text-sm rounded-full transition-colors",
                  language === "en" ? "bg-shikoku text-white" : "text-muted-foreground hover:bg-black/5"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("de")}
                className={cn(
                  "px-3 py-1 text-sm rounded-full transition-colors",
                  language === "de" ? "bg-shikoku text-white" : "text-muted-foreground hover:bg-black/5"
                )}
              >
                DE
              </button>
            </div>

            <div className="pt-4 px-4">
              <Button className="w-full rounded-full bg-shikoku hover:bg-shikoku/90" size="lg" asChild>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
