"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { DURATION, EASING } from "@/lib/animations";

const CONSENT_KEY = "cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(granted: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;
  const state = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

export function ConsentBanner() {
  const t = useTranslations("common.consent");
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
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/95 backdrop-blur-sm shadow-crisp"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
            <p className="text-sm text-muted-foreground">
              {t("message")}{" "}
              <Link
                href="/legal/privacy"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                {t("privacyPolicy")}
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <Button size="sm" onClick={handleAccept}>
                {t("accept")}
              </Button>
              <Button size="sm" variant="outline" onClick={handleDecline}>
                {t("decline")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
