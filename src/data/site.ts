import modelsData from "@/data/models.json";
import phrasesData from "@/data/phrases.json";

type AccentName = "sunset" | "mint" | "signal";
export type PhraseBucket = "model-voice" | "rhetorical-pattern" | "response-template";

type RawModel = {
  slug: string;
  name: string;
  series: string;
  vendor: string;
  tagline: string;
  voice: string;
  biases: string[];
  signaturePhrases: string[];
  accent: AccentName;
};

type RawPhrase = {
  slug: string;
  phrase: string;
  modelSlug: string;
  bucket: PhraseBucket;
  meaning: string;
  vibe: string;
  example: string;
  tags: string[];
  createdAt: string;
  scores: {
    overused: number;
    funny: number;
    aiLike: number;
  };
  communityNotes: string[];
  sourceNote?: string;
};

const accentThemes: Record<
  AccentName,
  {
    panel: string;
    softPanel: string;
    chip: string;
    glow: string;
  }
> = {
  sunset: {
    panel: "from-orange-200/90 via-amber-100 to-rose-100",
    softPanel: "border-orange-300/70 bg-orange-50/80",
    chip: "border-orange-300/80 bg-orange-100/90 text-orange-950",
    glow: "bg-orange-400/20",
  },
  mint: {
    panel: "from-emerald-200/90 via-teal-100 to-cyan-100",
    softPanel: "border-emerald-300/70 bg-emerald-50/80",
    chip: "border-emerald-300/80 bg-emerald-100/90 text-emerald-950",
    glow: "bg-emerald-400/20",
  },
  signal: {
    panel: "from-sky-200/90 via-cyan-100 to-teal-100",
    softPanel: "border-sky-300/70 bg-sky-50/80",
    chip: "border-sky-300/80 bg-sky-100/90 text-sky-950",
    glow: "bg-sky-400/20",
  },
};

export type ScoreKey = "overused" | "funny" | "aiLike";

export type ModelProfile = Omit<RawModel, "accent"> & {
  accent: AccentName;
  theme: (typeof accentThemes)[AccentName];
};

export type PhraseEntry = RawPhrase & {
  model: ModelProfile;
  trendScore: number;
};

export const archiveBuckets: Array<{
  key: PhraseBucket;
  title: string;
  shortLabel: string;
  description: string;
}> = [
  {
    key: "model-voice",
    title: "Model voice archive",
    shortLabel: "Model voice",
    description: "Signature wording that feels tied to a specific model persona.",
  },
  {
    key: "rhetorical-pattern",
    title: "Classic rhetorical patterns",
    shortLabel: "Rhetorical pattern",
    description: "Reusable sentence shapes that make AI writing feel instantly synthetic.",
  },
  {
    key: "response-template",
    title: "High-frequency response templates",
    shortLabel: "Response template",
    description: "Openers, softeners, and stock replies users keep seeing in the wild.",
  },
];

export const bucketLabels: Record<PhraseBucket, string> = Object.fromEntries(
  archiveBuckets.map((bucket) => [bucket.key, bucket.shortLabel]),
) as Record<PhraseBucket, string>;

export const models: ModelProfile[] = (modelsData as RawModel[]).map((model) => ({
  ...model,
  theme: accentThemes[model.accent],
}));

export const phrases: PhraseEntry[] = (phrasesData as RawPhrase[]).map((phrase) => {
  const model = models.find((item) => item.slug === phrase.modelSlug);

  if (!model) {
    throw new Error(`Unknown model slug: ${phrase.modelSlug}`);
  }

  return {
    ...phrase,
    model,
    trendScore:
      phrase.scores.overused * 0.45 +
      phrase.scores.funny * 0.2 +
      phrase.scores.aiLike * 0.35,
  };
});

export const rankingMeta: Array<{
  key: ScoreKey;
  title: string;
  kicker: string;
  description: string;
}> = [
  {
    key: "overused",
    title: "Most Overused",
    kicker: "Hot",
    description: "The phrases AI models reach for again and again.",
  },
  {
    key: "funny",
    title: "Funniest",
    kicker: "Loud",
    description: "The lines most likely to get screenshotted and shared.",
  },
  {
    key: "aiLike",
    title: "Most AI-like",
    kicker: "Synthetic",
    description: "The phrases that sound unmistakably machine-generated.",
  },
];

export const scoreMethodology =
  "Launch ordering currently uses internal seed weights stored in local JSON. Numeric values are hidden from the UI until real community signals exist.";

export function sortPhrases(mode: "trending" | "latest") {
  return [...phrases].sort((left, right) => {
    if (mode === "latest") {
      return (
        new Date(right.createdAt).valueOf() - new Date(left.createdAt).valueOf()
      );
    }

    return right.trendScore - left.trendScore;
  });
}

export function getModelBySlug(slug: string) {
  return models.find((model) => model.slug === slug);
}

export function getPhraseBySlug(slug: string) {
  return phrases.find((phrase) => phrase.slug === slug);
}

export function getPhrasesByModel(slug: string) {
  return phrases
    .filter((phrase) => phrase.model.slug === slug)
    .sort((left, right) => right.trendScore - left.trendScore);
}

export function getTopPhrases(metric: ScoreKey, count = 5) {
  return [...phrases]
    .sort((left, right) => right.scores[metric] - left.scores[metric])
    .slice(0, count);
}

export const homeTicker = [
  "AI really said that.",
  "A collection of phrases AI can’t stop saying.",
  "The way AI actually talks.",
];
