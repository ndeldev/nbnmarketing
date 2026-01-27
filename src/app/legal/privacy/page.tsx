import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { BRAND_NAME, CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = genMeta({
  title: "Privacy Policy",
  description: `${BRAND_NAME} privacy policy. Learn how we collect, use, and protect your personal information.`,
  path: "/legal/privacy",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 26, 2026";

  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-12 prose prose-gray max-w-none">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
            <p className="text-muted-foreground">
              {BRAND_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
              committed to protecting your personal data. This privacy policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website at {SITE_URL}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              2. Information We Collect
            </h2>
            <p className="text-muted-foreground">
              We may collect information about you in various ways:
            </p>
            <h3 className="text-lg font-medium mt-4">Personal Data</h3>
            <p className="text-muted-foreground">
              When you fill out forms on our website (such as contact forms or
              newsletter signups), we collect personally identifiable
              information including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Company name</li>
              <li>Phone number (if provided)</li>
              <li>Message content</li>
            </ul>

            <h3 className="text-lg font-medium mt-4">Automatically Collected Data</h3>
            <p className="text-muted-foreground">
              When you visit our website, we automatically collect certain
              information:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to track activity
              on our website and store certain information. You can instruct
              your browser to refuse all cookies or indicate when a cookie is
              being sent.
            </p>
            <p className="text-muted-foreground mt-4">
              We use Google Analytics to analyze website traffic. Google
              Analytics uses cookies to collect information about your use of
              our website. You can opt out of Google Analytics by installing the
              Google Analytics Opt-out Browser Add-on.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              5. Data Sharing and Disclosure
            </h2>
            <p className="text-muted-foreground">
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                Service providers who assist in operating our website and
                business
              </li>
              <li>
                Professional advisors (lawyers, accountants) as necessary
              </li>
              <li>
                Law enforcement when required by law or to protect our rights
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">6. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">7. Your Rights</h2>
            <p className="text-muted-foreground">
              Depending on your location, you may have certain rights regarding
              your personal data, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to delete your data</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us at {CONTACT_EMAIL}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              8. Third-Party Links
            </h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to read their privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              9. Changes to This Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">10. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this privacy policy or our data
              practices, please contact us at:
            </p>
            <p className="text-muted-foreground mt-4">
              <strong>{BRAND_NAME}</strong>
              <br />
              Email: {CONTACT_EMAIL}
              <br />
              123 Marketing Street
              <br />
              San Francisco, CA 94105
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
