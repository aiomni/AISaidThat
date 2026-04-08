import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

import type { TweetSource } from "@/data/sources";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        createTweet?: (
          tweetId: string,
          element: HTMLElement,
          options?: {
            align?: "left" | "center" | "right";
            conversation?: "all" | "none";
            dnt?: boolean;
            theme?: "light" | "dark";
          },
        ) => Promise<HTMLElement | undefined>;
        load: (element?: HTMLElement | null) => void;
      };
    };
  }
}

const TWITTER_WIDGET_ID = "twitter-wjs";
const TWITTER_WIDGET_SRC = "https://platform.twitter.com/widgets.js";

function loadTwitterWidgets() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.twttr?.widgets) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const existing = document.getElementById(TWITTER_WIDGET_ID) as
      | HTMLScriptElement
      | null;

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = TWITTER_WIDGET_ID;
    script.src = TWITTER_WIDGET_SRC;
    script.async = true;
    script.charset = "utf-8";
    script.addEventListener("load", () => resolve(), { once: true });
    document.body.appendChild(script);
  });
}

function getTweetId(url: string) {
  const match = url.match(/status\/(\d+)/);
  return match?.[1] ?? null;
}

export function TweetEmbedCard({ source }: { source: TweetSource }) {
  const embedRef = useRef<HTMLDivElement | null>(null);
  const [embedFailed, setEmbedFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const tweetId = getTweetId(source.url);

    if (!tweetId || !embedRef.current) {
      setEmbedFailed(true);
      return () => {
        active = false;
      };
    }

    setEmbedFailed(false);

    loadTwitterWidgets()
      .then(async () => {
        if (!active || !embedRef.current) {
          return;
        }

        embedRef.current.replaceChildren();

        const created = await window.twttr?.widgets?.createTweet?.(
          tweetId,
          embedRef.current,
          {
            align: "center",
            conversation: "none",
            dnt: true,
            theme: "light",
          },
        );

        if (!created && active) {
          setEmbedFailed(true);
        }
      })
      .catch(() => {
        if (active) {
          setEmbedFailed(true);
        }
      });

    return () => {
      active = false;
    };
  }, [source.url]);

  return (
    <Card className="noise-border overflow-hidden p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge>{source.category}</Badge>
        <a
          className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--muted)] transition hover:text-[color:var(--ink)]"
          href={source.url}
          rel="noreferrer"
          target="_blank"
        >
          Open on X
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <h3 className="font-[var(--font-display)] text-xl font-bold tracking-tight text-[color:var(--ink)]">
        {source.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
        {source.summary}
      </p>

      <div
        className="tweet-shell mt-5 min-h-[240px] overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-white/75 px-2 pt-4"
        ref={embedRef}
      >
        {embedFailed ? (
          <div className="flex min-h-[220px] flex-col items-start justify-center gap-3 px-5 pb-5">
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              The official X widget could not load in this browser context. This
              usually means `platform.twitter.com` is being blocked by a privacy
              setting, extension, or network policy.
            </p>
            <a
              className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--ink)]"
              href={source.url}
              rel="noreferrer"
              target="_blank"
            >
              Open the original post on X
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="flex min-h-[220px] items-center justify-center px-5 pb-5 text-sm text-[color:var(--muted)]">
            Loading official X embed...
          </div>
        )}
      </div>
    </Card>
  );
}

export function TweetLinkCard({ source }: { source: TweetSource }) {
  return (
    <Card className="noise-border p-5">
      <div className="flex items-center justify-between gap-3">
        <Badge>{source.category}</Badge>
        <a
          className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--ink)] transition hover:text-[color:var(--muted)]"
          href={source.url}
          rel="noreferrer"
          target="_blank"
        >
          Open source
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <h3 className="mt-4 font-[var(--font-display)] text-xl font-bold tracking-tight">
        {source.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
        {source.summary}
      </p>
    </Card>
  );
}
