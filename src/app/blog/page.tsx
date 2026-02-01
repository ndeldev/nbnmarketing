import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog";
import { CTA, PageHero } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { getAllPosts, BLOG_CATEGORIES } from "@/lib/blog";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = genMeta({
  title: "Blog",
  description: `B2B marketing insights and best practices from the ${BRAND_NAME} team. Learn about content marketing, SEO, demand generation, and more.`,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const [featuredPost, ...otherPosts] = posts;

  return (
    <>
      <PageHero
        title="Marketing Insights"
        description="Practical B2B marketing strategies, insights, and best practices from our team of experts."
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <BlogCard post={featuredPost} featured />
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/blog">All Posts</Link>
            </Button>
            {BLOG_CATEGORIES.map((category) => (
              <Button key={category.slug} variant="ghost" size="sm" asChild>
                <Link href={`/blog?category=${category.slug}`}>
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          {otherPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              More articles coming soon. Subscribe to our newsletter to be
              notified.
            </p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Stay Updated
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get the latest B2B marketing insights delivered to your inbox.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/contact">Subscribe to Newsletter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
