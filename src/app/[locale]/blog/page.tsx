import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog";
import { JsonLd } from "@/components/seo";
import { CTA, PageHero } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { getAllPosts, getPostUrl, BLOG_CATEGORIES } from "@/lib/blog";
import { BRAND_NAME, SITE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return genMeta({
    title: t("blog.title"),
    description: t("blog.description", { brandName: BRAND_NAME }),
    path: "/blog",
    locale,
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common.blog");
  const tCta = await getTranslations("common.cta");

  const posts = getAllPosts();
  const [featuredPost, ...otherPosts] = posts;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${BRAND_NAME} Blog`,
    description: `Marketing insights and best practices from the ${BRAND_NAME} team.`,
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getPostUrl(post.slug),
        name: post.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <PageHero
        title="Marketing Insights"
        description="Practical B2B marketing strategies, insights, and best practices from our team of experts."
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">{t("featuredArticle")}</h2>
            <BlogCard post={featuredPost} featured />
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/blog">{t("allPosts")}</Link>
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
          <h2 className="text-2xl font-bold mb-8">{t("latestArticles")}</h2>
          {otherPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              {t("moreArticlesComing")}
            </p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("stayUpdated")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("stayUpdatedDescription")}
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/contact">{tCta("subscribe")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
