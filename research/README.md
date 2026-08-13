# Research system (private knowledge-ingestion layer)

This folder holds the research pipeline that will feed the Human Capital AI
(B) and People Analytics (C) verticals. It is **separate from the public
website** — the site never invokes anything here, and nothing here becomes
public without explicit human approval.

## Status

Scaffolded but **not active**. The structure, schemas, prompts and provider
interfaces exist so Phase 7 (automated research) can be implemented without
redesigning the system.

## Layout

- `queries/` — search query libraries per pipeline (YAML, configurable
  frequency). Never hard-code queries in application logic.
- `prompts/` — versioned extraction/classification prompts. All prompts
  forbid invented facts, statistics and organizations, and require
  `reportedImpact: null` when a source states no outcome.
- `candidates/` — structured candidate records awaiting human review
  (output of research runs).
- `approved/` — candidates approved for content generation.
- `rejected/` — rejected candidates (kept so sources are not re-proposed).
- `sources/` — record of processed source URLs for deduplication.

## Pipeline (intended, Phase 7)

Scheduled trigger → load query config → search → normalize/deduplicate URLs →
skip previously processed sources → extract content → AI classification →
AI extraction → evidence evaluation → duplicate detection → candidate record →
`candidates/` review queue.

Provider interfaces live in `lib/research/providers.ts`; the candidate schema
in `lib/research/candidate.ts`. Credentials exist only in GitHub Actions
secrets, Cloudflare secrets, or a local `.env` (never committed, never in
browser code).
