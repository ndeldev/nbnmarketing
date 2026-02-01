export default function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <header className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="h-6 w-24 bg-muted rounded mb-4" />
          <div className="h-12 w-full bg-muted rounded" />
          <div className="h-12 w-3/4 bg-muted rounded mt-2" />
          <div className="mt-6 flex items-center gap-4">
            <div className="h-10 w-10 bg-muted rounded-full" />
            <div>
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-32 bg-muted rounded mt-1" />
            </div>
          </div>
        </div>
      </header>

      {/* Content skeleton */}
      <article className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-4/5 bg-muted rounded" />
          </div>
          <div className="mt-8 h-64 w-full bg-muted rounded-xl" />
          <div className="mt-8 space-y-4">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
        </div>
      </article>
    </div>
  );
}
