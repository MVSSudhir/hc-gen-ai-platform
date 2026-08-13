"use client";

import { labelize } from "@/lib/taxonomy";

/**
 * A single row of toggleable filter chips.
 * Selected values are managed by the parent explorer.
 */
export function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline">
      <span className="w-28 shrink-0 eyebrow text-muted">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option)}
              className={`min-h-10 rounded-full border px-3.5 py-2 text-[13px] transition-colors ${
                active
                  ? "border-accent bg-accent-soft text-accent-hover"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground"
              }`}
            >
              {labelize(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
