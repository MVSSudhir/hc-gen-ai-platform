/**
 * Shown on any content item with `demo: true` in its frontmatter.
 * Demo records illustrate the platform structure; they contain no real
 * company implementations, statistics or outcomes.
 */
export function DemoNotice() {
  return (
    <p className="mb-8 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-border bg-surface-elevated px-3.5 py-2 text-xs text-muted shadow-soft">
      <span className="font-semibold uppercase tracking-wide text-foreground">
        Demo content
      </span>
      <span className="text-faint">
        Illustrative record — no real organizations, statistics or outcomes.
      </span>
    </p>
  );
}
