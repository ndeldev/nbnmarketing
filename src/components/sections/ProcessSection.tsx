interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
}

export function ProcessSection({
  title = "Our Process",
  subtitle,
  steps,
}: ProcessSectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection line - desktop only */}
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-border -translate-x-1/2 hidden lg:block" />

          <div className="grid gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Step Number */}
                <div className="flex-shrink-0 lg:w-1/2 flex lg:justify-center">
                  <div
                    className={`flex items-center gap-4 ${
                      index % 2 === 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                    <div
                      className={`lg:text-${index % 2 === 0 ? "right" : "left"}`}
                    >
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Step Description */}
                <div className="lg:w-1/2">
                  <div
                    className={`rounded-2xl bg-card border border-border/50 p-6 shadow-sm ${
                      index % 2 === 0 ? "lg:text-left" : "lg:text-left"
                    }`}
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
