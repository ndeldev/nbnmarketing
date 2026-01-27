"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
    setLangMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white">{BRAND_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link-underline text-sm font-medium text-white/70 transition-colors hover:text-white"
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
              className="flex items-center gap-1 px-2 py-1 text-sm text-white/70 hover:text-white transition-colors"
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
          <Button className="rounded-full px-6 bg-white text-shikoku hover:bg-white/90" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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

      {/* Mobile Navigation - Full screen overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[73px] z-40 lg:hidden transition-all duration-200",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div className="relative bg-background border-b border-border">
          <div className="px-6 py-8 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-lg font-medium rounded-xl transition-colors hover:bg-muted"
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
                  language === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("de")}
                className={cn(
                  "px-3 py-1 text-sm rounded-full transition-colors",
                  language === "de" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                DE
              </button>
            </div>

            <div className="pt-6">
              <Button className="w-full rounded-full" size="lg" asChild>
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
