import { SITE_URL, BRAND_NAME } from "./constants";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  readingTime: number;
  image?: string;
  content: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

// Blog categories mapped to service areas
export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "content-marketing",
    name: "Content Marketing",
    description: "Strategies and best practices for B2B content creation",
  },
  {
    slug: "seo",
    name: "SEO",
    description: "Search engine optimization tips and techniques",
  },
  {
    slug: "demand-generation",
    name: "Demand Generation",
    description: "Lead generation and pipeline building strategies",
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    description: "Newsletter and email campaign best practices",
  },
  {
    slug: "paid-advertising",
    name: "Paid Advertising",
    description: "LinkedIn, Google, and programmatic advertising insights",
  },
  {
    slug: "marketing-strategy",
    name: "Marketing Strategy",
    description: "High-level B2B marketing strategy and planning",
  },
];

// Placeholder blog posts - will be replaced with MDX or CMS in future
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "b2b-content-marketing-guide-2026",
    title: "The Complete B2B Content Marketing Guide for 2026",
    description:
      "Everything you need to know about creating content that generates leads and establishes thought leadership in the B2B space.",
    date: "2026-01-20",
    author: "Elena Rodriguez",
    authorRole: "Director of Content",
    category: "content-marketing",
    tags: ["content strategy", "thought leadership", "lead generation"],
    readingTime: 12,
    image: "/og-image.jpg",
    content: `
## Introduction

Content marketing remains one of the most effective strategies for B2B companies to attract, engage, and convert their target audience. In this comprehensive guide, we'll explore the latest trends and best practices for 2026.

## Why Content Marketing Matters for B2B

B2B buyers consume an average of 13 pieces of content before making a purchasing decision. Your content strategy directly impacts your pipeline.

## Key Strategies

1. **Audience-First Approach**: Understand your buyer personas deeply
2. **Topic Clusters**: Build topical authority through interconnected content
3. **Multi-Format Content**: Repurpose content across blogs, videos, and podcasts
4. **Distribution Strategy**: Don't just create, distribute strategically

## Measuring Success

Track these key metrics:
- Organic traffic growth
- Lead generation from content
- Content engagement rates
- Pipeline attribution

## Conclusion

A well-executed content marketing strategy is a competitive advantage in B2B marketing.
    `,
  },
  {
    slug: "technical-seo-checklist-b2b",
    title: "Technical SEO Checklist for B2B Websites",
    description:
      "A comprehensive checklist to audit and improve your B2B website's technical SEO foundation.",
    date: "2026-01-15",
    author: "David Park",
    authorRole: "Head of SEO",
    category: "seo",
    tags: ["technical seo", "site audit", "core web vitals"],
    readingTime: 8,
    image: "/og-services.jpg",
    content: `
## Why Technical SEO Matters

Before your content can rank, your site needs to be technically sound. Here's what to check.

## Core Web Vitals

- **LCP (Largest Contentful Paint)**: Target < 2.5s
- **INP (Interaction to Next Paint)**: Target < 200ms
- **CLS (Cumulative Layout Shift)**: Target < 0.1

## Crawlability Checklist

- [ ] Robots.txt properly configured
- [ ] XML sitemap submitted to GSC
- [ ] No orphan pages
- [ ] Proper internal linking structure

## Indexability

- [ ] No accidental noindex tags
- [ ] Canonical tags implemented correctly
- [ ] Duplicate content resolved

## Mobile Optimization

- [ ] Responsive design
- [ ] Touch targets appropriately sized
- [ ] No horizontal scrolling

## Conclusion

Regular technical audits ensure your content has the best chance to rank.
    `,
  },
  {
    slug: "linkedin-advertising-best-practices",
    title: "LinkedIn Advertising Best Practices for B2B in 2026",
    description:
      "How to create high-performing LinkedIn ad campaigns that generate qualified B2B leads.",
    date: "2026-01-10",
    author: "Marcus Williams",
    authorRole: "Head of Strategy",
    category: "paid-advertising",
    tags: ["linkedin ads", "paid media", "lead generation"],
    readingTime: 10,
    image: "/og-contact.jpg",
    content: `
## Why LinkedIn for B2B?

LinkedIn offers unparalleled professional targeting capabilities for B2B marketers.

## Campaign Objectives

Choose the right objective:
- **Brand Awareness**: For top-of-funnel
- **Consideration**: For mid-funnel engagement
- **Conversions**: For bottom-funnel lead gen

## Targeting Best Practices

- Layer targeting criteria carefully
- Use Matched Audiences for retargeting
- Exclude irrelevant audiences
- Test lookalike audiences

## Creative Best Practices

- Use native, authentic imagery
- Lead with value, not features
- Test multiple ad formats
- Refresh creative every 2-4 weeks

## Budget & Bidding

- Start with manual bidding for control
- Expect higher CPMs than other platforms
- Focus on cost per qualified lead, not just CPL

## Measuring Success

Track beyond platform metrics:
- Pipeline generated
- Revenue attributed
- Customer acquisition cost

## Conclusion

LinkedIn ads are expensive but effective when executed properly.
    `,
  },
];

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === categorySlug);
}

/**
 * Get related posts (same category, excluding current)
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return getAllPosts()
    .filter(
      (post) =>
        post.slug !== currentSlug && post.category === currentPost.category
    )
    .slice(0, limit);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get blog post URL
 */
export function getPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}
