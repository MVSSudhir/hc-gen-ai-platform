import Link from "next/link";

export function Chip({ label, href }: { label: string; href?: string }) {
  const className =
    "inline-flex items-center rounded-full border border-border bg-background px-3.5 py-1.5 text-[13px] font-medium text-muted transition-all";
  if (href) {
    return (
      <Link
        href={href}
        className={`${className} hover:border-accent hover:bg-accent-soft hover:text-accent-hover`}
      >
        {label}
      </Link>
    );
  }
  return <span className={className}>{label}</span>;
}

export function ChipRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}
