import { Link } from "@/i18n/navigation";
import { Linkedin, Twitter } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { BRAND_NAME, SOCIAL_LINKS, CONTACT_EMAIL, SERVICES } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("common.footer");
  const tCards = await getTranslations("services.cards");
  const tNav = await getTranslations("common.nav");

  const footerLinks = {
    services: SERVICES.map((s) => ({
      label: tCards(`${s.id}.title`),
      href: `/services/${s.id}` as const,
    })),
    company: [
      { label: tNav("about"), href: "/about" as const },
      { label: tNav("caseStudies"), href: "/case-studies" as const },
      { label: tNav("blog"), href: "/blog" as const },
      { label: tNav("contact"), href: "/contact" as const },
    ],
    legal: [
      { label: t("privacyPolicy"), href: "/legal/privacy" as const },
      { label: t("termsOfService"), href: "/legal/terms" as const },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30" style={{ minHeight: '280px' }}>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight">
              {BRAND_NAME}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("tagline")}
            </p>
            {(SOCIAL_LINKS.linkedin || SOCIAL_LINKS.twitter) && (
              <div className="mt-4 flex gap-4">
                {SOCIAL_LINKS.linkedin && (
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {SOCIAL_LINKS.twitter && (
                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold">{t("services")}</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold">{t("company")}</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold">{t("contact")}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mt-4 mb-2" />

        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} {BRAND_NAME}. {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
