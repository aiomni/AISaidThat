import { ArrowUpRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";

import type { ModelProfile } from "@/data/site";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ModelCard({
  model,
  phraseCount,
}: {
  model: ModelProfile;
  phraseCount: number;
}) {
  return (
    <Link className="group block h-full" to={`/models/${model.slug}`}>
      <Card className="noise-border relative h-full overflow-hidden p-6">
        <div
          className={`absolute inset-x-6 top-0 h-24 rounded-b-[28px] bg-gradient-to-r ${model.theme.panel} opacity-80 blur-2xl transition duration-300 group-hover:opacity-100`}
        />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge className={model.theme.chip}>{model.vendor}</Badge>
              <h3 className="mt-4 font-[var(--font-display)] text-2xl font-bold tracking-tight">
                {model.name}
              </h3>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {model.series}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[color:var(--muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--ink)]" />
          </div>

          <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">
            {model.tagline}
          </p>

          <div className="mt-6 rounded-[24px] border border-[color:var(--line)] bg-black/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
              Signature phrases
            </p>
            <div className="mt-3 space-y-2">
              {model.signaturePhrases.map((phrase) => (
                <div
                  key={phrase}
                  className="flex items-start gap-2 text-sm text-[color:var(--ink)]"
                >
                  <Quote className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--muted)]" />
                  <span>{phrase}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-6 text-sm">
            <div className="text-[color:var(--muted)]">{phraseCount} archived phrases</div>
            <div className="font-medium text-[color:var(--ink)]">Open archive</div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

