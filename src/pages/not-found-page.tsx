import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pb-8">
      <Card className="noise-border max-w-xl p-8 text-center sm:p-10">
        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
          404
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl font-bold tracking-tight">
          That phrase is not in the archive.
        </h1>
        <p className="mt-4 text-[color:var(--muted)]">
          The page you requested does not exist, or the route has not been wired into the site yet.
        </p>
        <Link className={buttonVariants({ className: "mt-6" })} to="/">
          Return to the archive
        </Link>
      </Card>
    </div>
  );
}
