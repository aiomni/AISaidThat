import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { bucketLabels, type PhraseEntry } from "@/data/site";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function PhraseCard({ phrase }: { phrase: PhraseEntry }) {
  return (
    <Link className="group block h-full" to={`/phrases/${phrase.slug}`}>
      <Card className="noise-border relative h-full overflow-hidden p-6 transition duration-200 group-hover:-translate-y-1">
        <div
          className={`absolute -right-10 top-4 h-28 w-28 rounded-full ${phrase.model.theme.glow} blur-3xl`}
        />
        <div className="relative flex h-full flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={phrase.model.theme.chip}>{phrase.model.name}</Badge>
            <Badge>{bucketLabels[phrase.bucket]}</Badge>
            {phrase.tags.slice(0, 1).map((tag) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </div>

          <h3 className="mt-5 font-[var(--font-display)] text-2xl font-bold tracking-tight text-[color:var(--ink)]">
            “{phrase.phrase}”
          </h3>

          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
            {phrase.meaning}
          </p>

          <div className="mt-6 rounded-[24px] border border-[color:var(--line)] bg-black/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
              Vibe
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--ink)]">{phrase.vibe}</p>
          </div>

          <div className="mt-auto flex items-center justify-between pt-6 text-sm font-medium text-[color:var(--ink)]">
            <span>Read the entry</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
