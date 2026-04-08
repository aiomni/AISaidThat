import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { TweetLinkCard } from "@/components/tweet-source-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTweetSourcesForPhrase } from "@/data/sources";
import {
  bucketLabels,
  getPhraseBySlug,
} from "@/data/site";

export function PhrasePage() {
  const { slug = "" } = useParams();
  const phrase = getPhraseBySlug(slug);
  const relatedSources = getTweetSourcesForPhrase(slug);

  if (!phrase) {
    return (
      <div className="page-grid gap-6 pb-8">
        <Card className="p-8">
          <h1 className="font-[var(--font-display)] text-4xl font-bold tracking-tight">
            Phrase not found
          </h1>
          <p className="mt-4 text-[color:var(--muted)]">
            That phrase entry is missing from the archive.
          </p>
          <Link
            className={buttonVariants({ variant: "secondary", className: "mt-6" })}
            to="/"
          >
            Back to archive
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-grid gap-10 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <Link className={buttonVariants({ variant: "ghost" })} to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to archive
        </Link>
        <Link to={`/models/${phrase.model.slug}`}>
          <Badge className={phrase.model.theme.chip}>{phrase.model.name}</Badge>
        </Link>
        <Badge>{bucketLabels[phrase.bucket]}</Badge>
        <Badge>{formatDate(phrase.createdAt)}</Badge>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="noise-border p-7 sm:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Phrase entry
          </p>
          <h1 className="mt-3 font-[var(--font-display)] text-5xl font-bold tracking-tight text-[color:var(--ink)]">
            “{phrase.phrase}”
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
            {phrase.meaning}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {phrase.tags.map((tag) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] border border-[color:var(--line)] bg-black/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
              Example
            </p>
            <p className="mt-3 font-[var(--font-mono)] text-sm leading-7 text-[color:var(--ink)]">
              {phrase.example}
            </p>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="noise-border p-7">
            <Badge className="mb-4">Vibe</Badge>
            <p className="text-sm leading-7 text-[color:var(--ink)]">{phrase.vibe}</p>
          </Card>

          <Card className="noise-border p-7">
            <Badge className="mb-4">Community notes</Badge>
            <div className="space-y-3">
              {phrase.communityNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-[22px] border border-[color:var(--line)] bg-black/[0.03] p-4 text-sm leading-6 text-[color:var(--ink)]"
                >
                  {note}
                </div>
              ))}
            </div>
          </Card>

          {phrase.sourceNote ? (
            <Card className="noise-border p-7">
              <Badge className="mb-4">Source signal</Badge>
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                {phrase.sourceNote}
              </p>
            </Card>
          ) : null}

          {relatedSources.length > 0 ? (
            <Card className="noise-border p-7">
              <Badge className="mb-4">Original threads</Badge>
              <div className="space-y-4">
                {relatedSources.map((source) => (
                  <TweetLinkCard key={source.id} source={source} />
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
