"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterGroup } from "@/components/filters/filter-group";
import { analyticalTypes, labelize, paDomains } from "@/lib/taxonomy";

export interface PaSummary {
  slug: string;
  url: string;
  title: string;
  description: string;
  contentType: string;
  domain?: string;
  analyticalTypes: string[];
  /** For metrics: the business question shown in the reference table. */
  businessQuestion?: string;
  demo: boolean;
}

const paContentTypes = [
  "metric",
  "analytical-method",
  "dashboard-pattern",
  "use-case",
  "case-study",
] as const;

const typeLabels: Record<string, string> = {
  metric: "Metrics",
  "analytical-method": "Analytical methods",
  "dashboard-pattern": "Dashboard patterns",
  "use-case": "Use cases",
  "case-study": "Case studies",
};

interface Filters {
  domain: string[];
  contentType: string[];
  analyticalType: string[];
}

const emptyFilters: Filters = { domain: [], contentType: [], analyticalType: [] };

export function PaExplorer({ items }: { items: PaSummary[] }) {
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
          filters.domain.length &&
          (!item.domain || !filters.domain.includes(item.domain))
        )
          return false;
        if (
          filters.contentType.length &&
          !filters.contentType.includes(item.contentType)
        )
          return false;
        if (
          filters.analyticalType.length &&
          !filters.analyticalType.some((t) => item.analyticalTypes.includes(t))
        )
          return false;
        return true;
      }),
    [items, filters],
  );

  const present = useMemo(() => {
    const domains = new Set(
      items.map((i) => i.domain).filter((d): d is string => Boolean(d)),
    );
    const types = new Set(items.map((i) => i.contentType));
    const analytical = new Set(items.flatMap((i) => i.analyticalTypes));
    return {
      domain: paDomains.filter((d) => domains.has(d)),
      contentType: paContentTypes.filter((t) => types.has(t)),
      analyticalType: analyticalTypes.filter((t) => analytical.has(t)),
    };
  }, [items]);

  const metrics = visible.filter((i) => i.contentType === "metric");
  const otherGroups = present.contentType
    .filter((t) => t !== "metric")
    .map((type) => ({
      type,
      label: typeLabels[type] ?? labelize(type),
      items: visible.filter((i) => i.contentType === type),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <button
          type="button"
          aria-expanded={showFilters}
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
        <div className="mb-8 space-y-4 border-b border-border pb-8">
          <FilterGroup
            label="Domain"
            options={present.domain}
            selected={filters.domain}
            onToggle={toggle("domain")}
          />
          <FilterGroup
            label="Type"
            options={present.contentType}
            selected={filters.contentType}
            onToggle={toggle("contentType")}
          />
          <FilterGroup
            label="Analysis"
            options={present.analyticalType}
            selected={filters.analyticalType}
            onToggle={toggle("analyticalType")}
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

      {visible.length === 0 && (
        <p className="py-12 text-center text-muted">
          Nothing matches the selected filters.
        </p>
      )}

      {metrics.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 eyebrow text-muted">Metrics</h2>
          <div className="panel overflow-hidden">
            <table className="hidden w-full border-collapse text-[15px] sm:table">
              <thead>
                <tr className="border-b border-border bg-surface/70 text-left">
                  <th className="w-56 px-6 py-3.5 eyebrow text-muted">Metric</th>
                  <th className="px-6 py-3.5 eyebrow text-muted">
                    What it answers
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => (
                  <tr
                    key={metric.slug}
                    className="border-b border-border last:border-b-0 transition-colors hover:bg-surface/60"
                  >
                    <td className="px-6 py-4 align-top font-medium">
                      <Link
                        href={metric.url}
                        className="transition-colors hover:text-accent"
                      >
                        {metric.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 align-top text-muted">
                      {metric.businessQuestion ?? metric.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="sm:hidden">
              {metrics.map((metric) => (
                <div
                  key={metric.slug}
                  className="border-b border-border px-5 py-4 last:border-b-0"
                >
                  <Link
                    href={metric.url}
                    className="font-medium transition-colors hover:text-accent"
                  >
                    {metric.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {metric.businessQuestion ?? metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {otherGroups.map((group) => (
        <section key={group.type} className="mb-12">
          <h2 className="mb-4 eyebrow text-muted">{group.label}</h2>
          <div className="panel overflow-hidden px-2 sm:px-3">
            {group.items.map((item) => (
              <article
                key={item.slug}
                className="group relative grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-5 last:border-b-0 sm:rounded-lg sm:border-transparent sm:px-4 sm:hover:bg-surface sm:hover:shadow-soft"
              >
                <div>
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
                  {item.domain && (
                    <p className="mt-2 text-xs text-faint">
                      {labelize(item.domain)}
                      {item.analyticalTypes.length > 0 &&
                        ` · ${item.analyticalTypes.map(labelize).join(" · ")}`}
                    </p>
                  )}
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
        </section>
      ))}
    </div>
  );
}
