import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/blog";
import { formatDate, BLOG_CATEGORIES } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const category = BLOG_CATEGORIES.find((c) => c.slug === post.category);

  if (featured) {
    return (
      <Card className="group overflow-hidden card-hover">
        <Link href={`/blog/${post.slug}`}>
          <div className="grid md:grid-cols-2 gap-6">
            {post.image && (
              <div className="aspect-video bg-muted overflow-hidden relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <CardContent className="p-6 flex flex-col justify-center">
              {category && (
                <Badge variant="secondary" className="w-fit mb-4">
                  {category.name}
                </Badge>
              )}
              <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 text-muted-foreground line-clamp-2">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </span>
              </div>
              <div className="mt-4 flex items-center text-primary font-medium">
                Read article
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden card-hover">
      <Link href={`/blog/${post.slug}`}>
        {post.image && (
          <div className="aspect-video bg-muted overflow-hidden relative">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-6">
          {category && (
            <Badge variant="secondary" className="mb-3">
              {category.name}
            </Badge>
          )}
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-muted-foreground line-clamp-2">
            {post.description}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} min
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
