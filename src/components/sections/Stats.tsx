const stats = [
  { value: "50+", label: "B2B Clients" },
  { value: "3x", label: "Avg. Pipeline Growth" },
  { value: "10M+", label: "Leads Generated" },
  { value: "95%", label: "Client Retention" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-muted/30 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold tracking-tight lg:text-5xl">
                {stat.value}
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
