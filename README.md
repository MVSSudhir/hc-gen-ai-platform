# Human Capital Sense — Human Capital Knowledge

A knowledge site for others to check learning and ideas, with three parallel
verticals. M V S Sudhir is a contributor.

- **A — GenAI** (`/genai`): a Generative AI learning path — short, curated
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

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Content: MDX files with YAML frontmatter, validated by zod schemas
- Search: static JSON index + client-side Fuse.js
- Hosting: Vercel
- DNS: Cloudflare (`hcsense.org`)
- CI: GitHub Actions (validate on pull requests)

## Local development

Requires Node.js 24+.

```bash
npm install
npm run dev          # http://localhost:3000
```

Quality gates:

```bash
npm run lint              # ESLint
npm run typecheck         # TypeScript (run `npx next typegen` once first)
npm run validate:content  # schema, taxonomy, cross-reference validation
npm run validate:links    # internal link validation
npm run build             # runs all validation via prebuild, then static build
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

## Site identity

Brand, tagline and contributor live in [lib/site.ts](lib/site.ts). Replace the
LinkedIn/GitHub placeholders there and set `SITE_URL` / `CONTACT_EMAIL` (see
`.env.example`). Canonical URL is `https://hcsense.org`. Set the same values as
Vercel **Environment Variables** and as GitHub Actions **variables** for CI
builds.

## Deployment (Vercel + Cloudflare DNS)

The site runs on Vercel with native Next.js (App Router). Cloudflare holds DNS
for `hcsense.org` only — it is not the origin.

### Connect the GitHub repo

1. Import [MVSSudhir/hc-gen-ai-platform](https://github.com/MVSSudhir/hc-gen-ai-platform) at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js**. Build command `npm run build` (prebuild already validates content and builds the search index).
3. Environment variables:
   - `SITE_URL` = `https://hcsense.org`
   - `CONTACT_EMAIL` = `sudsakblack@gmail.com`
4. Add domains `hcsense.org` and `www.hcsense.org` in the Vercel project.

Pushes to `main` deploy automatically. Vercel Analytics (if you enable it in the project) is the native visitor count — no extra site code.

### Cloudflare DNS (DNS only / grey cloud)

Do **not** proxy these records (grey-cloud / DNS only). Orange-cloud proxy conflicts with Vercel TLS.

| Type | Name | Content |
|------|------|---------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

`www.hcsense.org` redirects to `https://hcsense.org`.

### Manual deploy

```bash
npx vercel login
npx vercel --prod
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
app/                 # routes (App Router)
components/          # navigation, cards, content, filters, search, related, ui
content/             # the knowledge base (MDX + frontmatter)
lib/                 # content loader, schemas, taxonomy, search, SEO, research interfaces
scripts/             # validation + search-index build scripts
research/            # private research pipeline (queries, prompts, candidate queue)
.github/workflows/   # validate + research (stub)
```
