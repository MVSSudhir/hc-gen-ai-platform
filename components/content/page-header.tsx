/** Standard header for content detail pages and section indexes. */
export function PageHeader({
  kicker,
  title,
  description,
  meta,
  definition,
}: {
  kicker?: string;
  title: string;
  description?: string;
  /** When true, description is rendered as a definition callout. */
  definition?: boolean;
  meta?: React.ReactNode;
}) {
  return (
    <header className="mb-12">
      {kicker && (
        <div className="mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <p className="eyebrow text-accent">{kicker}</p>
        </div>
      )}
      <h1 className="font-serif text-[2rem] font-medium leading-[1.1] tracking-tight break-words sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {description &&
        (definition ? (
          <p className="definition mt-6 max-w-2xl sm:mt-7">{description}</p>
        ) : (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
            {description}
          </p>
        ))}
      {meta && (
        <div className="mt-7 flex flex-wrap items-center gap-2">{meta}</div>
      )}
    </header>
  );
}
