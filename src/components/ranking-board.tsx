import { Link } from "react-router-dom";

import type { PhraseEntry } from "@/data/site";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function RankingBoard({
  title,
  kicker,
  description,
  phrases,
}: {
  title: string;
  kicker: string;
  description: string;
  phrases: PhraseEntry[];
}) {
  return (
    <Card className="noise-border p-6">
      <Badge className="mb-4">{kicker}</Badge>
      <h3 className="font-[var(--font-display)] text-2xl font-bold tracking-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{description}</p>

      <div className="mt-6 space-y-3">
        {phrases.map((phrase) => (
          <Link
            key={phrase.slug}
            className="block rounded-[22px] border border-[color:var(--line)] bg-black/[0.03] px-4 py-4 transition hover:bg-black/[0.05]"
            to={`/phrases/${phrase.slug}`}
          >
            <div className="min-w-0">
              <div className="truncate font-medium text-[color:var(--ink)]">
                “{phrase.phrase}”
              </div>
              <div className="mt-1 text-sm text-[color:var(--muted)]">
                {phrase.model.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
