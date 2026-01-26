import { TrendingUp, Clock, Users, BarChart3, Sparkles, Shield } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoCard } from "@/components/ui/bento-card";

const features = [
  {
    icon: TrendingUp,
    title: "Data-Driven Results",
    description:
      "Every campaign is measured, analyzed, and optimized for maximum ROI. No vanity metrics—just results that impact your bottom line.",
    span: { col: 2, row: 1 } as const,
  },
  {
    icon: Clock,
    title: "Rapid Execution",
    description:
      "Move fast without breaking things. Our agile approach means campaigns launch in weeks, not months.",
    span: { col: 1, row: 1 } as const,
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description:
      "Work with senior strategists who understand B2B. No junior handoffs—the experts you meet are the ones who do the work.",
    span: { col: 1, row: 1 } as const,
  },
  {
    icon: BarChart3,
    title: "Full Transparency",
    description:
      "Real-time dashboards, weekly reporting, and complete visibility into what we're doing and why it matters.",
    span: { col: 1, row: 1 } as const,
  },
  {
    icon: Sparkles,
    title: "Creative Excellence",
    description:
      "Compelling content that stands out. Our creative team combines strategy with storytelling to engage your audience.",
    span: { col: 1, row: 1 } as const,
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Your data is safe with us. We follow industry-leading security practices and are SOC 2 compliant.",
    span: { col: 1, row: 1 } as const,
  },
];

export function Features() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Teams <em className="font-serif not-italic">Choose Us</em>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;re not just another agency. Here&apos;s what makes working with us
            different.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid columns={3}>
          {features.map((feature, index) => (
            <BentoCard
              key={feature.title}
              colSpan={feature.span.col}
              rowSpan={feature.span.row}
              className={index === 0 ? "gradient-featured border-0 shadow-lg" : ""}
            >
              <div className={index === 0 ? "h-full flex flex-col justify-between min-h-[180px]" : ""}>
                <div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    index === 0 ? "bg-white/40 backdrop-blur-sm" : "bg-primary/10"
                  }`}>
                    <feature.icon className={`h-6 w-6 ${
                      index === 0 ? "text-foreground" : "text-primary"
                    }`} />
                  </div>
                  <h3 className={`mt-6 font-semibold ${index === 0 ? "text-2xl" : "text-xl"}`}>{feature.title}</h3>
                  <p className={`mt-3 leading-relaxed ${index === 0 ? "text-foreground/80" : "text-muted-foreground"}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
