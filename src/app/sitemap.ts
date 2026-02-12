import { MetadataRoute } from "next";
import { SITE_URL, SERVICES } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

const locales = ["en", "de"] as const;

function createAlternates(path: string) {
  return {
    languages: {
      en: `${SITE_URL}${path}`,
      de: `${SITE_URL}/de${path}`,
      "x-default": `${SITE_URL}${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/services",
    "/case-studies",
    "/about",
    "/contact",
    "/blog",
    "/legal/privacy",
    "/legal/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const path of staticPages) {
      const url = locale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/de${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.8,
        alternates: createAlternates(path),
      });
    }
  }

  // Service pages for each locale
  for (const locale of locales) {
    for (const service of SERVICES) {
      const path = `/services/${service.id}`;
      const url = locale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/de${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: createAlternates(path),
      });
    }
  }

  // Blog posts for each locale
  const blogPosts = getAllPosts();
  for (const locale of locales) {
    for (const post of blogPosts) {
      const path = `/blog/${post.slug}`;
      const url = locale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/de${path}`;
      entries.push({
        url,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: createAlternates(path),
      });
    }
  }

  return entries;
}
