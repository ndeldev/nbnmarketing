import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogHeader, BlogCard } from "@/components/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTA } from "@/components/sections";
import {
  generateMetadata as genMeta,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/metadata";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getPostUrl,
} from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

// Generate static params for all blog posts
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return genMeta({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      noIndex: true,
    });
  }

  return genMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.image || "/og-image.jpg",
  });
}

// Simple markdown to HTML converter for basic content
function renderContent(content: string): string {
  let html = content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 id="heading-$1" class="text-xl font-semibold mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 id="heading-$1" class="text-2xl font-bold mt-10 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    // Ordered lists with checkboxes
    .replace(/^- \[ \] (.+)$/gm, '<li class="ml-4 flex items-center gap-2"><input type="checkbox" disabled /> $1</li>')
    .replace(/^- \[x\] (.+)$/gm, '<li class="ml-4 flex items-center gap-2"><input type="checkbox" checked disabled /> $1</li>')
    // Paragraphs (double newlines)
    .replace(/\n\n/g, '</p><p class="text-muted-foreground mb-4">')
    // Single newlines in lists
    .replace(/(<\/li>)\n(<li)/g, "$1$2");

  // Wrap lists - use non-dotall regex for compatibility
  html = html.replace(
    /(<li[^>]*>[^<]*<\/li>)+/g,
    '<ul class="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">$&</ul>'
  );

  return `<p class="text-muted-foreground mb-4">${html}</p>`;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // Generate Article schema
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    url: getPostUrl(slug),
    datePublished: post.date,
    author: post.author,
    image: post.image,
  });

  // Generate Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: getPostUrl(slug) },
  ]);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <BlogHeader post={post} />

      <article className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Article Content */}
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h4 className="text-sm font-semibold mb-4">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex-shrink-0" />
              <div>
                <h4 className="font-semibold">{post.author}</h4>
                {post.authorRole && (
                  <p className="text-sm text-muted-foreground">
                    {post.authorRole}
                  </p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  Expert in B2B marketing strategy and execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Related Articles</h2>
              <Button variant="ghost" asChild>
                <Link href="/blog">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
