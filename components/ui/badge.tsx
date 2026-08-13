import { labelize } from "@/lib/taxonomy";

/**
 * Small text badge for evidence strength, implementation stage and
 * content type. Deliberately restrained: neutral by default, accent
 * reserved for strong evidence only.
 */
export function Badge({
  value,
  kind,
}: {
  value: string;
  kind?: "evidence" | "stage" | "type";
}) {
  const emphasized = kind === "evidence" && value === "strong";
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${
        emphasized
          ? "border-accent/30 bg-accent-soft text-accent-hover"
          : "border-border bg-surface text-muted"
      }`}
    >
      {kind === "evidence" ? `Evidence: ${labelize(value)}` : labelize(value)}
    </span>
  );
}
