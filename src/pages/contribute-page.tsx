import type { ReactNode } from "react";

import { Copy, FolderGit2, GitPullRequest, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const jsonExample = `{
  "phrase": "this can be further optimized",
  "model": "chatgpt",
  "meaning": "A polite TODO disguised as a conclusion.",
  "vibe": "Technically correct, emotionally unfinished.",
  "example": "The current implementation is correct, though this can be further optimized.",
  "tags": ["engineering", "vague", "classic"]
}`;

export function ContributePage() {
  return (
    <div className="page-grid gap-10 pb-8">
      <SectionHeading
        eyebrow="Contribute"
        title="The archive grows through GitHub pull requests."
        description="AISaidThat is designed for open contribution. Add a phrase in a structured format, submit it through GitHub, and keep the review process visible."
      />

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="noise-border p-7 sm:p-8">
          <Badge className="mb-4">Workflow</Badge>
          <div className="space-y-4">
            <Step
              icon={<FolderGit2 className="h-5 w-5" />}
              title="1. Fork or clone the repository"
              description="Work in plain data files so phrase submissions stay easy to review and easy to trace."
            />
            <Step
              icon={<Copy className="h-5 w-5" />}
              title="2. Add a phrase entry"
              description="Use the standard JSON or Markdown shape with a phrase, source model, vibe, meaning, example, and tags."
            />
            <Step
              icon={<GitPullRequest className="h-5 w-5" />}
              title="3. Open a pull request"
              description="Let maintainers review the phrasing, metadata quality, and whether the entry fits the archive."
            />
            <Step
              icon={<ShieldCheck className="h-5 w-5" />}
              title="4. Pass checks and publish"
              description="Validation passes, the phrase merges, and the archive updates automatically."
            />
          </div>
        </Card>

        <Card className="noise-border overflow-hidden p-7 sm:p-8">
          <Badge className="mb-4">Example payload</Badge>
          <div className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--ink)] p-6 text-[color:var(--surface)]">
            <pre className="overflow-x-auto font-[var(--font-mono)] text-sm leading-7">
              <code>{jsonExample}</code>
            </pre>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <ContributionNote
              title="Keep it real"
              description="Entries should reflect phrases people actually encounter in model output, not invented parody."
            />
            <ContributionNote
              title="Keep it light"
              description="The best entries are compact, funny, and easy to scan without needing a long article."
            />
            <ContributionNote
              title="Keep it structured"
              description="Meaning, vibe, example, and tags should be consistent so the archive stays filterable."
            />
            <ContributionNote
              title="Keep it legible"
              description="Users should be able to understand the joke and the pattern in a few seconds."
            />
          </div>
        </Card>
      </section>
    </div>
  );
}

function Step({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-[color:var(--line)] bg-black/[0.03] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/80">
        {icon}
      </div>
      <h3 className="mt-4 font-medium text-[color:var(--ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{description}</p>
    </div>
  );
}

function ContributionNote({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-[color:var(--line)] bg-white/70 p-5">
      <h3 className="font-medium text-[color:var(--ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{description}</p>
    </div>
  );
}
