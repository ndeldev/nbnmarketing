import type { Metadata } from "next";
import { BRAND_NAME, SITE_URL, SITE_DESCRIPTION } from "./constants";

type GenerateMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

/**
 * Generate consistent metadata for all pages
 * SEO best practices:
 * - Title: keyword first, <60 chars
 * - Description: 155-160 chars, CTA at end
 */
export function generateMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image = "/og-image.jpg",
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "" ? `${BRAND_NAME} | ${title}` : `${title} | ${BRAND_NAME}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: BRAND_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    sameAs: [
      "https://linkedin.com/company/meridian-agency",
      "https://twitter.com/meridianagency",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@meridian.agency",
      contactType: "sales",
    },
  };
}

/**
 * Generate JSON-LD structured data for a Service
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    url: service.url,
  };
}

/**
 * Generate JSON-LD structured data for a WebPage
 */
export function generateWebPageSchema(page: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: page.url,
    isPartOf: {
      "@type": "WebSite",
      name: BRAND_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
