import { Chip, ChipRow } from "@/components/ui/chip";
import type { RelatedGroup, RelatedRef } from "@/lib/relationships";

/**
 * "Related" section at the bottom of content pages: labeled groups of
 * lightweight chips linking across verticals.
 */
export function RelatedContent({
  groups,
  usedBy,
}: {
  groups: RelatedGroup[];
  usedBy?: RelatedRef[];
}) {
  if (!groups.length && !usedBy?.length) return null;

  return (
    <aside
      aria-label="Related content"
      className="mt-12 rounded-xl border border-border bg-surface/60 px-4 py-8 sm:mt-16 sm:px-8 sm:py-10"
    >
      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.label}>
            <h2 className="eyebrow mb-3 text-muted">{group.label}</h2>
            <ChipRow>
              {group.items.map((item) => (
                <Chip key={item.url} label={item.title} href={item.url} />
              ))}
            </ChipRow>
          </div>
        ))}
        {usedBy && usedBy.length > 0 && (
          <div>
            <h2 className="eyebrow mb-3 text-muted">Referenced by</h2>
            <ChipRow>
              {usedBy.map((item) => (
                <Chip key={item.url} label={item.title} href={item.url} />
              ))}
            </ChipRow>
          </div>
        )}
      </div>
    </aside>
  );
}
