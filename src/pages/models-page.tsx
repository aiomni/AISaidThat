import { ModelCard } from "@/components/model-card";
import { SectionHeading } from "@/components/section-heading";
import { phrases, models } from "@/data/site";

export function ModelsPage() {
  return (
    <div className="page-grid gap-10 pb-8">
      <SectionHeading
        eyebrow="Model archive"
        title="Every model gets its own verbal fingerprint."
        description="AISaidThat tracks the language habits that emerge once a model has answered enough product questions, code questions, and vague requests from humans."
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
    </div>
  );
}

