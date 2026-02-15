import type { Metadata } from "next";
import {
  BRAND_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  IMAGE_PATHS,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "./constants";

type GenerateMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  locale?: string;
  image?: string;
  noIndex?: boolean;
};

/**
 * Generate consistent metadata for all pages
 * SEO best practices:
 * - Title: keyword first, <60 chars
 * - Description: 155-160 chars, CTA at end
 * - Canonical: self-referencing per locale
 * - Alternates: hreflang for all supported locales
 */
export function generateMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  locale = "en",
  image = IMAGE_PATHS.ogDefault,
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const canonicalUrl = locale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;
  const fullTitle = path === "" ? `${BRAND_NAME} | ${title}` : `${title} | ${BRAND_NAME}`;
  const ogLocale = locale === "de" ? "de_DE" : "en_US";

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}${path}`,
        de: `${SITE_URL}/de${path}`,
        "x-default": `${SITE_URL}${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: ogLocale,
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
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.twitter].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
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
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    serviceType: service.serviceType || "Marketing Services",
    provider: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${BRAND_NAME} ${service.name}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
          },
        },
      ],
    },
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

/**
 * Generate JSON-LD structured data for FAQPage
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD structured data for ProfessionalService
 * Uses ProfessionalService (not LocalBusiness) since there's no physical office
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    image: `${SITE_URL}${IMAGE_PATHS.ogDefault}`,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION,
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.twitter].filter(Boolean),
  };
}

/**
 * Generate JSON-LD structured data for Article (blog posts)
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: article.image || `${SITE_URL}/og-image.jpg`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}
