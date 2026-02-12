import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been
          moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/services">
              <ArrowLeft className="h-4 w-4" />
              View services
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
