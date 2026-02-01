export default function ServiceLoading() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-muted rounded" />
          <div className="h-4 w-2 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-4 w-2 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>

      {/* Hero skeleton */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-muted" />
            <div className="mx-auto h-12 w-3/4 bg-muted rounded" />
            <div className="mx-auto mt-6 h-6 w-full bg-muted rounded" />
            <div className="mx-auto mt-2 h-6 w-2/3 bg-muted rounded" />
            <div className="mt-10 flex justify-center gap-4">
              <div className="h-12 w-32 bg-muted rounded-full" />
              <div className="h-12 w-32 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mx-auto h-10 w-48 bg-muted rounded" />
            <div className="mx-auto mt-4 h-6 w-64 bg-muted rounded" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl border p-6">
                <div className="h-12 w-12 bg-muted rounded-xl" />
                <div className="mt-4 h-6 w-32 bg-muted rounded" />
                <div className="mt-2 h-4 w-full bg-muted rounded" />
                <div className="mt-1 h-4 w-2/3 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
