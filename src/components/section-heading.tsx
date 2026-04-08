import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">{eyebrow}</Badge>
      <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--ink)] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[color:var(--muted)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}

