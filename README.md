# Personal Knowledge & Human Capital Intelligence Platform

A personal professional knowledge platform with three parallel verticals:

- **A — GenAI** (`/genai`): my Generative AI learning journey — short, curated
  concept pages.
- **B — Human Capital AI** (`/human-capital-ai`): a practitioner reference of
  AI/GenAI use cases in Human Capital, with evidence ratings and sources.
- **C — People Analytics** (`/people-analytics`): metrics, analytical methods,
  dashboard patterns and practical use cases.

The verticals are parallel — none is a subset of another — and cross-reference
each other through typed relationships. The public website is a **static
presentation layer over a structured knowledge base**: no login, no database,
no user data collection.

## Stack

- Next.js (App Router) + TypeScript, `output: "export"` — fully static HTML
- Tailwind CSS
- Content: MDX files with YAML frontmatter, validated by zod schemas
- Search: static JSON index + client-side Fuse.js
- Hosting: Cloudflare Workers static assets (wrangler)
- CI/CD: GitHub Actions

## Local development

Requires Node.js 24+.

```bash
npm install
npm run dev          # http://localhost:3000
```

Quality gates:

```bash
npm run lint              # ESLint
npm run typecheck         # TypeScript (generates route types, then tsc)
npm run validate:content  # schema, taxonomy, cross-reference validation
npm run validate:links    # internal link validation
npm run build             # runs all validation via prebuild, then static build
npm run preview           # serve the production export via Wrangler (after build)
```

A failed content validation **blocks the build** — invalid content can never
deploy.

## Content model

Content lives in `content/<vertical>/<slug>.mdx`. Frontmatter is the
structured record (validated by [lib/validation.ts](lib/validation.ts) against
the controlled taxonomy in [lib/taxonomy.ts](lib/taxonomy.ts)); the markdown
body is optional narrative.

Every item has: `id`, `slug`, `title`, `description`, `vertical`,
`contentType`, `tags`, `status`, `createdAt`, `updatedAt`, plus typed
cross-reference arrays (`relatedConcepts`, `relatedMetrics`, …). Only items
with `status: published` appear on the site. Items with `demo: true` show a
"Demo content" notice — demo records never contain real organizations,
statistics or outcomes.

To add content: copy an existing file in the same vertical, edit the
frontmatter, run `npm run validate:content`.

## Personalization

Replace the placeholders in [lib/site.ts](lib/site.ts) (name, email, LinkedIn,
GitHub) and set `SITE_URL` / `CONTACT_EMAIL` (see `.env.example`). In GitHub,
configure repository **variables** `SITE_URL` and `CONTACT_EMAIL` for CI
builds.

## Deployment

The site is static HTML. For now it publishes to **GitHub Pages** so you can
open it on any phone or computer:

**https://mvssudhir.github.io/hc-gen-ai-platform/**

Pushing to `main` (or this workflow on the current branch) runs
`.github/workflows/pages.yml`. If the first deploy 404s, set
**Settings → Pages → Source** to **GitHub Actions**.

Optional later: Cloudflare Workers via `.github/workflows/deploy.yml` (needs
secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`). Manual:

```bash
npm run build
npx wrangler deploy
```

## Research system (scaffolded, inactive)

`research/` and `lib/research/` contain the future AI-assisted research
pipeline for verticals B and C: query libraries, versioned extraction prompts,
provider interfaces and the candidate-record schema. See
[research/README.md](research/README.md). Design principles:

- AI discovers, classifies, extracts and scores evidence; **a human approves
  everything** before publication.
- Research output goes only to `research/candidates/`.
- Credentials exist only in GitHub Actions secrets / local `.env`.
- The public website never invokes the research engine.

## Repository layout

```
app/                 # routes (App Router, static export)
components/          # navigation, cards, content, filters, search, related, ui
content/             # the knowledge base (MDX + frontmatter)
lib/                 # content loader, schemas, taxonomy, search, SEO, research interfaces
scripts/             # validation + search-index build scripts
research/            # private research pipeline (queries, prompts, candidate queue)
.github/workflows/   # validate, deploy, research (stub)
```
