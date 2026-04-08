import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ArrowRight, Flame, GitPullRequest, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { ModelCard } from "@/components/model-card";
import { PhraseCard } from "@/components/phrase-card";
import { RankingBoard } from "@/components/ranking-board";
import { SectionHeading } from "@/components/section-heading";
import {
  TweetEmbedCard,
  TweetLinkCard,
} from "@/components/tweet-source-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  featuredTweetSources,
  supportingTweetSources,
} from "@/data/sources";
import {
  archiveBuckets,
  getTopPhrases,
  homeTicker,
  models,
  type PhraseBucket,
  phrases,
  rankingMeta,
  scoreMethodology,
  sortPhrases,
} from "@/data/site";
import { cn } from "@/lib/cn";

type SortMode = "trending" | "latest";

export function HomePage() {
  const [sortMode, setSortMode] = useState<SortMode>("trending");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedBucket, setSelectedBucket] = useState<PhraseBucket | "all">("all");

  const visiblePhrases = useMemo(() => {
    const sorted = sortPhrases(sortMode);
    return sorted.filter((phrase) => {
      const matchesModel =
        selectedModel === "all" || phrase.model.slug === selectedModel;
      const matchesBucket =
        selectedBucket === "all" || phrase.bucket === selectedBucket;

      return matchesModel && matchesBucket;
    });
  }, [selectedBucket, selectedModel, sortMode]);

  return (
    <div className="page-grid gap-16 pb-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="noise-border overflow-hidden p-7 sm:p-10">
          <div className="flex flex-wrap gap-2">
            {homeTicker.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>

          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl font-bold tracking-tight text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
            A community archive for the things AI models keep saying.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            AISaidThat documents overused AI phrases, signature wording patterns,
            and the strange little habits that make model output instantly recognizable.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
            This first archive drop is seeded from recurring AI output patterns and
            X user observations gathered across 2025-2026 discussions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className={buttonVariants({ size: "lg" })} href="#archive">
              Explore the archive
            </a>
            <Link
              className={buttonVariants({ variant: "secondary", size: "lg" })}
              to="/contribute"
            >
              How submissions work
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <StatTile
              value={`${phrases.length}`}
              label="phrases archived"
              icon={<Flame className="h-5 w-5" />}
            />
            <StatTile
              value={`${models.length}`}
              label="model voices tracked"
              icon={<Sparkles className="h-5 w-5" />}
            />
            <StatTile
              value="GitHub PR"
              label="community contribution flow"
              icon={<GitPullRequest className="h-5 w-5" />}
            />
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="noise-border overflow-hidden p-7">
            <Badge className="mb-4">Core idea</Badge>
            <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-tight">
              AI does not just answer. It develops habits.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              Phrase patterns, style bias, repeated softeners, roadmap language,
              fake certainty, polite disclaimers. Once you see them, you start hearing
              the same rhythms everywhere.
            </p>
            <div className="mt-6 rounded-[26px] border border-[color:var(--line)] bg-black/[0.03] p-5">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
                Positioning
              </p>
              <p className="mt-3 text-lg leading-8 text-[color:var(--ink)]">
                Not a tutorial site. Not technical docs. An AI language culture archive.
              </p>
            </div>
          </Card>

          <Card className="noise-border p-7">
            <Badge className="mb-4">Why it works</Badge>
            <div className="space-y-4 text-sm leading-7 text-[color:var(--muted)]">
              <p>High-recognition content that almost every heavy AI user has seen.</p>
              <p>Strong meme energy that naturally turns into screenshots and shares.</p>
              <p>Open contribution workflow so the archive can evolve with new model habits.</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="page-grid">
        <SectionHeading
          eyebrow="Taxonomy"
          title="The archive starts with three buckets people keep noticing."
          description="Your X research maps cleanly to three recurring content types: model personas, rhetorical patterns, and stock response templates."
        />

        <div className="grid gap-6 xl:grid-cols-3">
          {archiveBuckets.map((bucket) => {
            const samples = sortPhrases("trending")
              .filter((phrase) => phrase.bucket === bucket.key)
              .slice(0, 2);

            return (
              <Card key={bucket.key} className="noise-border p-6">
                <Badge className="mb-4">{bucket.shortLabel}</Badge>
                <h3 className="font-[var(--font-display)] text-2xl font-bold tracking-tight">
                  {bucket.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {bucket.description}
                </p>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="font-[var(--font-display)] text-4xl font-bold tracking-tight">
                      {phrases.filter((phrase) => phrase.bucket === bucket.key).length}
                    </div>
                    <div className="text-sm text-[color:var(--muted)]">seed entries</div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {samples.map((phrase) => (
                    <Link
                      key={phrase.slug}
                      className="block rounded-[22px] border border-[color:var(--line)] bg-black/[0.03] px-4 py-4 text-sm transition hover:bg-black/[0.05]"
                      to={`/phrases/${phrase.slug}`}
                    >
                      <div className="font-medium text-[color:var(--ink)]">
                        "{phrase.phrase}"
                      </div>
                      <div className="mt-1 text-[color:var(--muted)]">
                        {phrase.model.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="page-grid">
        <SectionHeading
          eyebrow="X source threads"
          title="Real user observations, attached to the archive."
          description="The site is seeded with recurring phrases, but it should also show the live threads where people notice the pattern in public."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {featuredTweetSources.map((source) => (
            <TweetEmbedCard key={source.id} source={source} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {supportingTweetSources.map((source) => (
            <TweetLinkCard key={source.id} source={source} />
          ))}
        </div>
      </section>

      <section className="page-grid">
        <SectionHeading
          eyebrow="Models"
          title="Different models, different verbal tics."
          description="ChatGPT sounds like it wants to ship. Claude sounds like it wants to qualify the claim. Gemini sounds like it wants to turn the answer into a roadmap."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {models.map((model) => (
            <ModelCard
              key={model.slug}
              model={model}
              phraseCount={phrases.filter((phrase) => phrase.model.slug === model.slug).length}
            />
          ))}
        </div>
      </section>

      <section id="archive" className="page-grid">
        <SectionHeading
          eyebrow="Phrase archive"
          title="Browse the lines that keep showing up."
          description="Sort by what is hottest, switch to the latest additions, or narrow the archive down to one model voice."
        />

        <div className="flex flex-col gap-4 rounded-[30px] border border-[color:var(--line)] bg-white/60 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["trending", "latest"] as const).map((mode) => (
              <button
                key={mode}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  sortMode === mode
                    ? "bg-[var(--ink)] text-white"
                    : "bg-white/70 text-[color:var(--muted)] hover:text-[color:var(--ink)]",
                )}
                onClick={() => setSortMode(mode)}
              >
                {mode === "trending" ? "Trending" : "Latest"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[30px] border border-[color:var(--line)] bg-white/60 p-4 backdrop-blur">
          <div className="flex flex-wrap gap-2">
            <FilterPill
              active={selectedModel === "all"}
              label="All models"
              onClick={() => setSelectedModel("all")}
            />
            {models.map((model) => (
              <FilterPill
                key={model.slug}
                active={selectedModel === model.slug}
                label={model.name}
                onClick={() => setSelectedModel(model.slug)}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterPill
              active={selectedBucket === "all"}
              label="All categories"
              onClick={() => setSelectedBucket("all")}
            />
            {archiveBuckets.map((bucket) => (
              <FilterPill
                key={bucket.key}
                active={selectedBucket === bucket.key}
                label={bucket.shortLabel}
                onClick={() => setSelectedBucket(bucket.key)}
              />
            ))}
          </div>
        </div>

        {visiblePhrases.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visiblePhrases.map((phrase) => (
              <PhraseCard key={phrase.slug} phrase={phrase} />
            ))}
          </div>
        ) : (
          <Card className="p-8">
            <h3 className="font-[var(--font-display)] text-2xl font-bold tracking-tight">
              No entries match this filter yet.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              Try switching the model or category filter, or add the missing phrase as a contribution.
            </p>
          </Card>
        )}
      </section>

      <section className="page-grid">
        <SectionHeading
          eyebrow="Rankings"
          title="Three ways to judge an AI catchphrase."
          description="For the launch version, these rankings are editorial seed data used for curation and browsing, not live vote counts."
        />

        <Card className="p-5">
          <p className="text-sm leading-6 text-[color:var(--muted)]">
            {scoreMethodology}
          </p>
        </Card>

        <div className="grid gap-6 xl:grid-cols-3">
          {rankingMeta.map((entry) => (
            <RankingBoard
              key={entry.key}
              description={entry.description}
              kicker={entry.kicker}
              phrases={getTopPhrases(entry.key)}
              title={entry.title}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="noise-border overflow-hidden p-7 sm:p-8">
          <Badge className="mb-4">Community workflow</Badge>
          <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-tight">
            Contribute by pull request.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            The archive is designed to be open, transparent, and traceable. Add a phrase,
            commit structured data, open a PR, pass validation, and let the site update.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              "Submit a phrase in a standard JSON or Markdown shape",
              "Get a transparent review history through GitHub",
              "Keep the content grounded in real model output",
            ].map((step) => (
              <div
                key={step}
                className="rounded-[22px] border border-[color:var(--line)] bg-black/[0.03] px-4 py-4 text-sm text-[color:var(--ink)]"
              >
                {step}
              </div>
            ))}
          </div>
        </Card>

        <Card className="noise-border p-7 sm:p-8">
          <Badge className="mb-4">Shareability</Badge>
          <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-tight">
            Built for recognition, screenshots, and comparison.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            The best entries are fast to read, instantly familiar, and easy to send to someone
            with the caption: “AI really said that.”
          </p>

          <div className="mt-8 rounded-[28px] border border-[color:var(--line)] bg-[color:var(--ink)] px-6 py-6 text-[color:var(--surface)]">
            <p className="font-[var(--font-display)] text-2xl font-bold tracking-tight">
              “A collection of phrases AI can’t stop saying.”
            </p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              That is the product in one sentence.
            </p>

            <Link
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white"
              to="/contribute"
            >
              Read the contribution guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}

function StatTile({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-[color:var(--line)] bg-black/[0.03] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/80 text-[color:var(--ink)]">
        {icon}
      </div>
      <div className="mt-4 font-[var(--font-display)] text-3xl font-bold tracking-tight">
        {value}
      </div>
      <div className="mt-1 text-sm text-[color:var(--muted)]">{label}</div>
    </div>
  );
}

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-[var(--ink)] text-white"
          : "bg-white/70 text-[color:var(--muted)] hover:text-[color:var(--ink)]",
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
