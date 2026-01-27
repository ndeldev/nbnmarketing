import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = genMeta({
  title: "About Us",
  description: `${BRAND_NAME} is a B2B marketing agency built by marketers who understand the unique challenges of selling to businesses. Learn about our team and approach.`,
  path: "/about",
  image: "/og-about.jpg",
});

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former VP Marketing at a Series C startup. 15+ years in B2B marketing.",
  },
  {
    name: "Marcus Williams",
    role: "Head of Strategy",
    bio: "Ex-McKinsey consultant specializing in go-to-market strategy.",
  },
  {
    name: "Elena Rodriguez",
    role: "Director of Content",
    bio: "Award-winning content strategist with experience at Fortune 500 brands.",
  },
  {
    name: "David Park",
    role: "Head of SEO",
    bio: "Former Google search quality analyst. Technical SEO expert.",
  },
];

const values = [
  {
    title: "Results Over Activity",
    description:
      "We measure success by business outcomes, not vanity metrics. Every campaign is designed with ROI in mind.",
  },
  {
    title: "Radical Transparency",
    description:
      "No black boxes. We share our strategies, data, and learnings openly so you always know what we're doing and why.",
  },
  {
    title: "Partnership Mindset",
    description:
      "We're an extension of your team, not just a vendor. Your success is our success.",
  },
  {
    title: "Continuous Learning",
    description:
      "B2B marketing evolves constantly. We stay ahead by testing, learning, and adapting.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Built by B2B Marketers, for B2B Marketers
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We&apos;ve been in your shoes. We know the pressure to hit pipeline
              targets, prove ROI, and do more with less. That&apos;s why we built{" "}
              {BRAND_NAME}.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground">
              <p>
                {BRAND_NAME} was founded with a simple premise: B2B marketing
                doesn&apos;t have to be complicated, but it does have to be
                strategic.
              </p>
              <p>
                After years of working in-house at fast-growing startups and
                enterprise companies, our founders saw the same problems
                repeated: agencies that didn&apos;t understand B2B, strategies built
                on vanity metrics, and a disconnect between marketing activities
                and business outcomes.
              </p>
              <p>
                We built {BRAND_NAME} to be different. Every strategy we
                develop, every campaign we run, and every piece of content we
                create is designed with one goal: driving measurable business
                growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide how we work with clients.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-card p-8">
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="mt-4 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Leadership Team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Experienced marketers who&apos;ve been where you are.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-muted" />
                <h3 className="mt-6 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
