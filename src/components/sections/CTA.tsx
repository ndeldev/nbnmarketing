import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3">
          <div className="h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3">
          <div className="h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80">
            Let&apos;s discuss how we can help you reach your marketing goals. Book a
            free strategy call with our team.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="group rounded-full px-8"
            >
              <Link href="/contact">
                Book a Strategy Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-primary-foreground/50"
            >
              <Link href="/case-studies">See Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
