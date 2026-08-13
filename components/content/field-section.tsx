/**
 * A labeled section rendering a structured frontmatter field.
 * Editorial two-column layout on desktop: label rail left, content right.
 */
export function FieldSection({
  label,
  text,
  items,
}: {
  label: string;
  text?: string | null;
  items?: string[];
}) {
  const hasText = Boolean(text?.trim());
  const hasItems = Boolean(items?.length);
  if (!hasText && !hasItems) return null;

  return (
    <section className="grid gap-2 border-t border-border py-8 sm:grid-cols-[11rem_1fr] sm:gap-10">
      <h2 className="eyebrow pt-1 text-muted">{label}</h2>
      <div>
        {hasText && (
          <p className="max-w-2xl text-[1.0625rem] leading-[1.75]">{text}</p>
        )}
        {hasItems && (
          <ul className="max-w-2xl space-y-2.5 text-[1.0625rem] leading-[1.75]">
            {items!.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[12px] h-px w-3.5 shrink-0 bg-accent/55"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
