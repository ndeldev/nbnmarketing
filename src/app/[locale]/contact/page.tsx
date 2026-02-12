import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { JsonLd } from "@/components/seo";
import { PageHero } from "@/components/sections";
import { generateMetadata as genMeta, generateLocalBusinessSchema } from "@/lib/metadata";
import { BRAND_NAME, CONTACT_EMAIL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return genMeta({
    title: t("contact.title"),
    description: t("contact.description", { brandName: BRAND_NAME }),
    path: "/contact",
    image: "/og-contact.jpg",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <JsonLd data={generateLocalBusinessSchema()} />

      <PageHero
        title={t("page.title")}
        description={t("page.description")}
      />

      {/* Contact Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold">{t("form.getInTouch")}</h2>
              <p className="mt-4 text-muted-foreground">
                {t("form.getInTouchDescription")}
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t("form.email")}</h3>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t("form.firstName")}</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t("form.lastName")}</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Smith"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("form.workEmail")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">{t("form.company")}</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Company Inc."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("form.howCanWeHelp")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t("form.messagePlaceholder")}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {t("form.sendMessage")}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {t("form.responseTime")}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
