import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ArrowRight, Boxes, FolderKanban, Newspaper } from "lucide-react";
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
  bucketLabels,
  getTopPhrases,
  models,
  type PhraseBucket,
  phrases,
  rankingMeta,
  sortPhrases,
} from "@/data/site";
import { cn } from "@/lib/cn";

type SortMode = "trending" | "latest";

const homeSections = [
  { id: "hot", label: "Hot" },
  { id: "latest", label: "Latest" },
  { id: "sources", label: "Sources" },
  { id: "archive", label: "Archive" },
  { id: "rankings", label: "Rankings" },
  { id: "models", label: "Models" },
];

export function HomePage() {
  const [sortMode, setSortMode] = useState<SortMode>("trending");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedBucket, setSelectedBucket] = useState<PhraseBucket | "all">("all");

  const hotPhrases = useMemo(() => sortPhrases("trending").slice(0, 5), []);
  const latestPhrases = useMemo(() => sortPhrases("latest").slice(0, 5), []);
  const bucketCards = useMemo(() => {
    const trending = sortPhrases("trending");

    return archiveBuckets.map((bucket) => ({
      ...bucket,
      count: phrases.filter((phrase) => phrase.bucket === bucket.key).length,
      sample: trending.find((phrase) => phrase.bucket === bucket.key),
    }));
  }, []);

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

  const sourceCount = featuredTweetSources.length + supportingTweetSources.length;
  const hasCustomView =
    sortMode !== "trending" ||
    selectedModel !== "all" ||
    selectedBucket !== "all";

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const resetView = () => {
    setSortMode("trending");
    setSelectedModel("all");
    setSelectedBucket("all");
  };

  return (
    <div className="page-grid gap-14 pb-8">
      <section className="grid gap-6 xl:grid-cols-[1.16fr_0.84fr]">
        <Card
          className="noise-border overflow-hidden p-7 sm:p-8"
          id="hot"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Archive index</Badge>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              hot phrases, latest drops, rankings, model pages, source threads
            </p>
          </div>

          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-4xl font-bold tracking-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Hot phrases first.
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)] sm:text-lg sm:leading-8">
            Browse the phrases AI models keep repeating, see the newest additions,
            compare model habits, and trace entries back to the posts that noticed
            them first.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {homeSections.map((section) => (
              <button
                key={section.id}
                className="rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:bg-white"
                onClick={() => scrollToSection(section.id)}
                type="button"
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {hotPhrases.map((phrase, index) => (
              <Link
                key={phrase.slug}
                className="group rounded-[24px] border border-[color:var(--line)] bg-black/[0.03] p-5 transition hover:-translate-y-0.5 hover:bg-black/[0.05]"
                to={`/phrases/${phrase.slug}`}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  #{index + 1} trending
                </p>

                <h2 className="mt-3 font-[var(--font-display)] text-2xl font-bold tracking-tight text-[color:var(--ink)]">
                  “{phrase.phrase}”
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className={phrase.model.theme.chip}>
                    {phrase.model.name}
                  </Badge>
                  <Badge>{bucketLabels[phrase.bucket]}</Badge>
                </div>

                <div className="mt-5 flex items-center justify-between text-sm font-medium text-[color:var(--ink)]">
                  <span>Read the entry</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="noise-border p-7" id="latest">
            <div className="flex items-center justify-between gap-3">
              <Badge>Latest additions</Badge>
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                most recent archive drops
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {latestPhrases.map((phrase) => (
                <Link
                  key={phrase.slug}
                  className="block rounded-[22px] border border-[color:var(--line)] bg-black/[0.03] px-4 py-4 transition hover:bg-black/[0.05]"
                  to={`/phrases/${phrase.slug}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium text-[color:var(--ink)]">
                        “{phrase.phrase}”
                      </div>
                      <div className="mt-1 text-sm text-[color:var(--muted)]">
                        {phrase.model.name}
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      {formatDate(phrase.createdAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="noise-border p-7">
            <div className="flex items-center justify-between gap-3">
              <Badge>Archive snapshot</Badge>
              <Link
                className="text-sm font-medium text-[color:var(--ink)] transition hover:text-[color:var(--muted)]"
                to="/contribute"
              >
                Contribute
              </Link>
            </div>

            <div className="mt-5 grid gap-3">
              <MetricTile
                icon={<Boxes className="h-5 w-5" />}
                label="phrases archived"
                value={`${phrases.length}`}
              />
              <MetricTile
                icon={<FolderKanban className="h-5 w-5" />}
                label="model archives"
                value={`${models.length}`}
              />
              <MetricTile
                icon={<Newspaper className="h-5 w-5" />}
                label="source threads"
                value={`${sourceCount}`}
              />
            </div>

            <Link
              className={buttonVariants({
                variant: "secondary",
                className: "mt-5 w-full justify-center",
              })}
              to="/contribute"
            >
              Open contribution guide
            </Link>
          </Card>
        </div>
      </section>

      <section className="page-grid" id="sources">
        <SectionHeading
          eyebrow="Source threads"
          title="See the posts that made these phrases recognizable."
          description="Public comparison threads, screenshots, and user field notes that feed the archive."
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

      <section className="page-grid" id="archive">
        <SectionHeading
          eyebrow="Archive"
          title="Filter by model, category, and freshness."
          description="Use the category cards as shortcuts, then narrow the full list by model and by trending or latest."
        />

        <div className="grid gap-4 xl:grid-cols-3">
          {bucketCards.map((bucket) => {
            const active = selectedBucket === bucket.key;

            return (
              <button
                key={bucket.key}
                className="group text-left"
                onClick={() =>
                  setSelectedBucket(active ? "all" : bucket.key)
                }
                type="button"
              >
                <Card
                  className={cn(
                    "noise-border h-full p-6 transition duration-200 group-hover:-translate-y-0.5",
                    active && "border-[color:var(--ink)] bg-white",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Badge
                      className={cn(
                        active && "bg-[var(--ink)] text-white",
                      )}
                    >
                      {bucket.shortLabel}
                    </Badge>

                    <div className="text-right">
                      <div className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--ink)]">
                        {bucket.count}
                      </div>
                      <div className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
                        entries
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-4 font-[var(--font-display)] text-2xl font-bold tracking-tight text-[color:var(--ink)]">
                    {bucket.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                    {bucket.description}
                  </p>

                  {bucket.sample ? (
                    <div className="mt-5 rounded-[24px] border border-[color:var(--line)] bg-black/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
                        Top sample
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--ink)]">
                        “{bucket.sample.phrase}”
                      </p>
                    </div>
                  ) : null}
                </Card>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-5 rounded-[30px] border border-[color:var(--line)] bg-white/60 p-4 backdrop-blur sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Sort archive
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
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
                    type="button"
                  >
                    {mode === "trending" ? "Trending" : "Latest"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm text-[color:var(--muted)]">
                {visiblePhrases.length} entries showing
              </div>
              {hasCustomView ? (
                <button
                  className={buttonVariants({ variant: "ghost", size: "md" })}
                  onClick={resetView}
                  type="button"
                >
                  Reset view
                </button>
              ) : null}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Filter by model
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
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
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Filter by category
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
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
        </div>

        {visiblePhrases.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visiblePhrases.map((phrase) => (
              <PhraseCard key={phrase.slug} phrase={phrase} />
            ))}
          </div>
        ) : (
          <Card className="noise-border p-8">
            <h3 className="font-[var(--font-display)] text-2xl font-bold tracking-tight text-[color:var(--ink)]">
              No entries match this view yet.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              Try a different model or category, or reset the archive filters.
            </p>
            <button
              className={buttonVariants({
                variant: "secondary",
                className: "mt-5",
              })}
              onClick={resetView}
              type="button"
            >
              Reset archive view
            </button>
          </Card>
        )}
      </section>

      <section className="page-grid" id="rankings">
        <SectionHeading
          eyebrow="Rankings"
          title="See the archive through different leaderboards."
          description="The same phrases surface differently when you sort by overuse, humor, or how synthetic they sound."
        />

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

      <section className="page-grid" id="models">
        <SectionHeading
          eyebrow="Models"
          title="Open the archive by model voice."
          description="Each model page collects the phrases and tendencies that make its output recognizable at a glance."
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

      <section>
        <Card className="noise-border p-7 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <Badge className="mb-4">Contribute</Badge>
              <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--ink)]">
                Seen a phrase that belongs in the archive?
              </h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                Submit it through GitHub, keep the source visible, and help extend
                the archive with one more recognizable AI line.
              </p>
            </div>

            <Link className={buttonVariants({ size: "lg" })} to="/contribute">
              Open contribution guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}

function MetricTile({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[24px] border border-[color:var(--line)] bg-black/[0.03] p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/80 text-[color:var(--ink)]">
        {icon}
      </div>
      <div>
        <div className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--ink)]">
          {value}
        </div>
        <div className="text-sm text-[color:var(--muted)]">{label}</div>
      </div>
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
      type="button"
    >
      {label}
    </button>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
