"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterGroup } from "@/components/filters/filter-group";
import { Badge } from "@/components/ui/badge";
import {
  aiPatterns,
  evidenceStrengths,
  hcaiCategories,
  impactTypes,
  implementationStages,
  labelize,
} from "@/lib/taxonomy";

export interface HcaiSummary {
  slug: string;
  url: string;
  title: string;
  description: string;
  category: string;
  technologyPatterns: string[];
  implementationStage: string;
  evidenceStrength: string;
  impactType: string[];
  organizations: string[];
  demo: boolean;
}

interface Filters {
  category: string[];
  pattern: string[];
  stage: string[];
  evidence: string[];
  impact: string[];
}

const emptyFilters: Filters = {
  category: [],
  pattern: [],
  stage: [],
  evidence: [],
  impact: [],
};

export function HcaiExplorer({ items }: { items: HcaiSummary[] }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (key: keyof Filters) => (value: string) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));

  const activeCount = Object.values(filters).reduce(
    (n, values) => n + values.length,
    0,
  );

  const visible = useMemo(
    () =>
      items.filter((item) => {
        if (
          filters.category.length &&
          !filters.category.includes(item.category)
        )
          return false;
        if (
          filters.pattern.length &&
          !filters.pattern.some((p) => item.technologyPatterns.includes(p))
        )
          return false;
        if (
          filters.stage.length &&
          !filters.stage.includes(item.implementationStage)
        )
          return false;
        if (
          filters.evidence.length &&
          !filters.evidence.includes(item.evidenceStrength)
        )
          return false;
        if (
          filters.impact.length &&
          !filters.impact.some((i) => item.impactType.includes(i))
        )
          return false;
        return true;
      }),
    [items, filters],
  );

  // Only offer filter values that exist in the current content.
  const present = useMemo(() => {
    const collect = (fn: (item: HcaiSummary) => string[]) => {
      const set = new Set(items.flatMap(fn));
      return (all: readonly string[]) => all.filter((v) => set.has(v));
    };
    return {
      category: collect((i) => [i.category])(hcaiCategories),
      pattern: collect((i) => i.technologyPatterns)(aiPatterns),
      stage: collect((i) => [i.implementationStage])(implementationStages),
      evidence: collect((i) => [i.evidenceStrength])(evidenceStrengths),
      impact: collect((i) => i.impactType)(impactTypes),
    };
  }, [items]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <button
          type="button"
          aria-expanded={showFilters}
          aria-controls="hcai-filters"
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-foreground"
        >
          {showFilters ? "Hide filters" : "Filter"}
          {activeCount > 0 && (
            <span className="ml-1.5 text-accent">({activeCount})</span>
          )}
        </button>
        <p className="text-sm text-faint">
          {visible.length} of {items.length}
        </p>
      </div>

      {showFilters && (
        <div id="hcai-filters" className="mb-8 space-y-4 border-b border-border pb-8">
          <FilterGroup
            label="Function"
            options={present.category}
            selected={filters.category}
            onToggle={toggle("category")}
          />
          <FilterGroup
            label="AI pattern"
            options={present.pattern}
            selected={filters.pattern}
            onToggle={toggle("pattern")}
          />
          <FilterGroup
            label="Stage"
            options={present.stage}
            selected={filters.stage}
            onToggle={toggle("stage")}
          />
          <FilterGroup
            label="Evidence"
            options={present.evidence}
            selected={filters.evidence}
            onToggle={toggle("evidence")}
          />
          <FilterGroup
            label="Impact"
            options={present.impact}
            selected={filters.impact}
            onToggle={toggle("impact")}
          />
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="text-sm text-accent hover:text-accent-hover"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="py-12 text-center text-muted">
          No use cases match the selected filters.{" "}
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="text-accent hover:text-accent-hover"
            >
              Clear filters
            </button>
          )}
        </p>
      ) : (
        <div className="panel overflow-hidden px-2 sm:px-3">
          {visible.map((item) => (
            <article
              key={item.slug}
              className="group relative grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-6 last:border-b-0 sm:rounded-lg sm:border-transparent sm:px-4 sm:hover:bg-surface sm:hover:shadow-soft"
            >
              <div>
                <p className="eyebrow mb-2 text-muted">
                  {labelize(item.category)}
                </p>
                <h3 className="text-lg font-medium tracking-tight">
                  <Link
                    href={item.url}
                    className="transition-colors group-hover:text-accent"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-faint">
                  <span>
                    {item.technologyPatterns.map(labelize).join(" · ")}
                  </span>
                  <Badge value={item.implementationStage} kind="stage" />
                  <Badge value={item.evidenceStrength} kind="evidence" />
                </div>
              </div>
              <span
                aria-hidden="true"
                className="hidden text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:block"
              >
                →
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
