import Link from "next/link";

/**
 * Compact scannable row used on index pages.
 * Soft surface hover and arrow motion — no decorative card chrome.
 */
export function ItemCard({
  href,
  title,
  description,
  eyebrow,
  footer,
}: {
  href: string;
  title: string;
  description: string;
  eyebrow?: string;
  footer?: React.ReactNode;
}) {
  return (
    <article className="group relative grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-6 last:border-b-0 transition-colors sm:rounded-lg sm:border-transparent sm:px-4 sm:hover:bg-surface sm:hover:shadow-soft">
      <div>
        {eyebrow && <p className="eyebrow mb-2 text-muted">{eyebrow}</p>}
        <h3 className="text-lg font-medium tracking-tight">
          <Link
            href={href}
            className="transition-colors group-hover:text-accent focus-visible:text-accent"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>
        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">
          {description}
        </p>
        {footer && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-faint">
            {footer}
          </div>
        )}
      </div>
      <span
        aria-hidden="true"
        className="hidden text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:block"
      >
        →
      </span>
    </article>
  );
}
