"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DURATION, EASING } from "@/lib/animations";

const CONSENT_KEY = "cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(granted: boolean) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
  }
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === "granted") {
      updateConsent(true);
    }
  }, []);

  useEffect(() => {
    function handleReset() {
      localStorage.removeItem(CONSENT_KEY);
      setVisible(true);
    }
    window.addEventListener("reset-cookie-consent", handleReset);
    return () => window.removeEventListener("reset-cookie-consent", handleReset);
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    updateConsent(true);
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: DURATION.normal, ease: EASING.smooth }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg"
        >
          <div className="rounded-xl bg-white p-5 shadow-crisp border border-border">
            <p className="text-sm text-muted-foreground">
              We use cookies to analyze site traffic and improve your experience.
              See our{" "}
              <Link
                href="/legal/privacy"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="mt-4 flex gap-3">
              <Button size="sm" onClick={handleAccept}>
                Accept
              </Button>
              <Button size="sm" variant="outline" onClick={handleDecline}>
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
