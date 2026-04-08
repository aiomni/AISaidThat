# AISaidThat

AISaidThat is a community-driven archive of phrases, response templates, and rhetorical habits that AI models keep repeating.

The project treats AI output as a cultural artifact rather than a documentation problem. It focuses on the way models actually sound: flattering openers, overused engineering caveats, pseudo-deep reframes, and personality differences across systems like ChatGPT, Claude, and Gemini.

The longer product brief lives in [docs/product-spec.md](/Users/bytedance/Workspace/demos/AISaidThat/docs/product-spec.md).

## What the site includes

- An archive of AI phrases and response patterns
- Model-specific voice profiles
- Phrase detail pages with source links and community notes
- X source cards for real user observations
- A contribution page designed around a GitHub PR workflow

## Tech stack

- `Rsbuild`
- `React`
- `React Router`
- `TypeScript`
- `Tailwind CSS`

## Project structure

```text
.
├── .github/workflows/
├── docs/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── app.tsx
│   ├── index.tsx
│   └── styles.css
├── rsbuild.config.ts
├── package.json
└── README.md
```

Key content files:

- `docs/product-spec.md`: product positioning, feature scope, and long-term vision
- `src/data/models.json`: model voice profiles
- `src/data/phrases.json`: phrase entries and launch ordering seed data
- `src/data/sources.ts`: X source links and phrase-to-source associations
- `src/data/site.ts`: derived site data, sorting, rankings, and helper functions

## Local development

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Run type checks:

```bash
pnpm check
```

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Content model

Each phrase entry is currently stored as local seed data and includes:

- `phrase`
- `modelSlug`
- `bucket`
- `meaning`
- `vibe`
- `example`
- `tags`
- `communityNotes`
- optional source notes and linked X threads

The current site uses local JSON data for launch content. There is no backend database yet.

## Deployment

The repository includes a GitHub Actions workflow that builds the site and publishes `dist/` to the `gh-pages` branch:

- Workflow file: `.github/workflows/deploy-gh-pages.yml`
- Trigger: push to `main`
- Publish target: `gh-pages`

This project is configured for GitHub Pages deployment:

- `HashRouter` avoids server-side route rewrite issues on static hosting
- `output.assetPrefix = "auto"` in `rsbuild.config.ts` keeps asset URLs compatible with project pages

To enable deployment in GitHub:

1. Push the repository to GitHub.
2. Let the workflow create or update the `gh-pages` branch.
3. In repository settings, configure GitHub Pages to publish from the `gh-pages` branch root.

## Notes

- The UI copy is English-only.
- Ranking numbers are hidden in the UI for now.
- Launch ordering still uses local seed weights under the hood until real community signals exist.
- X embeds depend on the official X widget script and may fall back to a plain source link when the script is blocked by browser privacy settings or extensions.

## Future directions

- GitHub-based phrase submission validation
- Real voting or community ranking signals
- More scenario-specific archives for coding, writing, product, and emotional support prompts
- Richer source attribution and screenshot support
