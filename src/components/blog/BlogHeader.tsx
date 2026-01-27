import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/blog";
import { formatDate, BLOG_CATEGORIES } from "@/lib/blog";

interface BlogHeaderProps {
  post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  const category = BLOG_CATEGORIES.find((c) => c.slug === post.category);

  return (
    <header className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to blog
        </Link>

        {category && (
          <Badge variant="secondary" className="mb-4">
            {category.name}
          </Badge>
        )}

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-6 text-xl text-muted-foreground">{post.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div>
              <p className="font-medium">{post.author}</p>
              {post.authorRole && (
                <p className="text-sm text-muted-foreground">
                  {post.authorRole}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
