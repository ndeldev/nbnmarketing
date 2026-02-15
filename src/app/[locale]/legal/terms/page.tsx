import { setRequestLocale } from "next-intl/server";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { BRAND_NAME, CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return genMeta({
    title: "Terms of Service",
    description: `${BRAND_NAME} terms of service. Read our terms and conditions for using our website and services.`,
    path: "/legal/terms",
    locale,
  });
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lastUpdated = "January 26, 2026";

  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-12 prose prose-gray max-w-none">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              1. Agreement to Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing and using the {BRAND_NAME} website at {SITE_URL}
              (&quot;Website&quot;), you agree to be bound by these Terms of Service
              (&quot;Terms&quot;). If you do not agree to these Terms, please do not use
              our Website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">2. Use of Website</h2>
            <p className="text-muted-foreground">
              You may use our Website only for lawful purposes and in accordance
              with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                Use the Website in any way that violates applicable laws or
                regulations
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the
                Website
              </li>
              <li>
                Use the Website to transmit any harmful code or malware
              </li>
              <li>
                Interfere with the proper functioning of the Website
              </li>
              <li>
                Collect or harvest any information from the Website without
                authorization
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              3. Intellectual Property
            </h2>
            <p className="text-muted-foreground">
              The Website and its entire contents, features, and functionality
              (including but not limited to all text, graphics, logos, images,
              and software) are owned by {BRAND_NAME} and are protected by
              copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-muted-foreground mt-4">
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, or otherwise use any content from our
              Website without our prior written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">4. User Content</h2>
            <p className="text-muted-foreground">
              When you submit content to us (such as through contact forms), you
              grant {BRAND_NAME} a non-exclusive, royalty-free license to use,
              reproduce, and display that content for the purpose of providing
              our services to you.
            </p>
            <p className="text-muted-foreground mt-4">
              You represent that you own or have the necessary rights to any
              content you submit and that such content does not infringe upon
              the rights of any third party.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">5. Services</h2>
            <p className="text-muted-foreground">
              {BRAND_NAME} provides B2B marketing services as described on our
              Website. Specific terms for individual services will be provided
              in separate service agreements. The descriptions of services on
              this Website are for informational purposes and do not constitute
              a binding offer.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground">
              THE WEBSITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS
              WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT
              WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, SECURE, OR
              ERROR-FREE.
            </p>
            <p className="text-muted-foreground mt-4">
              We do not guarantee any specific results from the use of our
              Website or services. Past performance is not indicative of future
              results.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              7. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              TO THE FULLEST EXTENT PERMITTED BY LAW, {BRAND_NAME.toUpperCase()}{" "}
              SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO
              YOUR USE OF THE WEBSITE.
            </p>
            <p className="text-muted-foreground mt-4">
              Our total liability for any claims arising from these Terms or
              your use of the Website shall not exceed the amount you paid to us
              (if any) in the twelve months preceding the claim.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">8. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless {BRAND_NAME}, its
              officers, directors, employees, and agents from any claims,
              damages, losses, or expenses (including attorneys&apos; fees) arising
              from your use of the Website or violation of these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">
              9. Third-Party Links
            </h2>
            <p className="text-muted-foreground">
              Our Website may contain links to third-party websites. We are not
              responsible for the content or practices of these external sites.
              Your use of third-party websites is at your own risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">10. Modifications</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting on this page. Your
              continued use of the Website after changes are posted constitutes
              acceptance of the modified Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">11. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with
              the laws of the State of California, without regard to its
              conflict of law provisions. Any disputes arising from these Terms
              shall be resolved in the courts of San Francisco County,
              California.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">12. Severability</h2>
            <p className="text-muted-foreground">
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions will continue in full
              force and effect.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mt-8">13. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-muted-foreground mt-4">
              <strong>{BRAND_NAME}</strong>
              <br />
              Email: {CONTACT_EMAIL}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
