import { ArrowLeft, Quote } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { PhraseCard } from "@/components/phrase-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getModelBySlug, getPhrasesByModel } from "@/data/site";

export function ModelPage() {
  const { slug = "" } = useParams();
  const model = getModelBySlug(slug);

  if (!model) {
    return (
      <div className="page-grid gap-6 pb-8">
        <Card className="p-8">
          <h1 className="font-[var(--font-display)] text-4xl font-bold tracking-tight">
            Model not found
          </h1>
          <p className="mt-4 text-[color:var(--muted)]">
            That archive entry does not exist yet.
          </p>
          <Link
            className={buttonVariants({ variant: "secondary", className: "mt-6" })}
            to="/models"
          >
            Back to models
          </Link>
        </Card>
      </div>
    );
  }

  const phraseList = getPhrasesByModel(model.slug);

  return (
    <div className="page-grid gap-10 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <Link className={buttonVariants({ variant: "ghost" })} to="/models">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to models
        </Link>
        <Badge className={model.theme.chip}>{model.vendor}</Badge>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <Card className="noise-border overflow-hidden p-7 sm:p-8">
          <div
            className={`mb-8 h-28 rounded-[30px] bg-gradient-to-r ${model.theme.panel} opacity-95`}
          />
          <h1 className="font-[var(--font-display)] text-5xl font-bold tracking-tight">
            {model.name}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[color:var(--muted)]">
            {model.series}
          </p>
          <p className="mt-6 text-lg leading-8 text-[color:var(--muted)]">
            {model.tagline}
          </p>
          <p className="mt-6 text-sm leading-7 text-[color:var(--ink)]">{model.voice}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {model.biases.map((bias) => (
              <Badge key={bias}>#{bias}</Badge>
            ))}
          </div>
        </Card>

        <Card className="noise-border p-7 sm:p-8">
          <Badge className="mb-4">Signature phrases</Badge>
          <div className="space-y-4">
            {model.signaturePhrases.map((phrase) => (
              <div
                key={phrase}
                className="flex items-start gap-3 rounded-[22px] border border-[color:var(--line)] bg-black/[0.03] p-4"
              >
                <Quote className="mt-1 h-4 w-4 shrink-0 text-[color:var(--muted)]" />
                <div className="text-sm leading-6 text-[color:var(--ink)]">{phrase}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-[color:var(--line)] bg-white/70 p-5">
            <p className="font-[var(--font-display)] text-3xl font-bold tracking-tight">
              {phraseList.length}
            </p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              archived phrases in this voice profile
            </p>
          </div>
        </Card>
      </section>

      <section className="page-grid">
        <div>
          <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-tight">
            Phrase archive
          </h2>
          <p className="mt-3 text-[color:var(--muted)]">
            The lines that make {model.name} sound like {model.name}.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {phraseList.map((phrase) => (
            <PhraseCard key={phrase.slug} phrase={phrase} />
          ))}
        </div>
      </section>
    </div>
  );
}

