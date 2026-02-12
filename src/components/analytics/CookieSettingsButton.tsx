"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("reset-cookie-consent"))}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      Cookie Settings
    </button>
  );
}
