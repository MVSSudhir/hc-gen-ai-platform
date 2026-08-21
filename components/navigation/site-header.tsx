"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const navItems = [
  { label: "GenAI", href: "/genai" },
  { label: "Human Capital AI", href: "/human-capital-ai" },
  { label: "People Analytics", href: "/people-analytics" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onInk = pathname === "/";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`site-header sticky top-0 z-40 border-b backdrop-blur-md ${
        onInk
          ? "border-ink-border/80 bg-ink/90 text-ink-foreground"
          : "border-border bg-background/85"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-8">
        <Link
          href="/"
          className={`min-w-0 font-serif text-[15px] font-medium leading-tight tracking-tight transition-colors sm:text-lg ${
            onInk ? "hover:text-white" : "hover:text-accent"
          }`}
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative text-sm transition-colors ${
                    isActive(item.href)
                      ? onInk
                        ? "font-medium text-ink-foreground"
                        : "font-medium text-foreground"
                      : onInk
                        ? "text-ink-muted hover:text-ink-foreground"
                        : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[1.35rem] left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/search"
                aria-label="Search"
                className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
                  onInk
                    ? "text-ink-muted hover:bg-ink-soft hover:text-ink-foreground"
                    : "text-muted hover:bg-surface hover:text-foreground"
                } ${isActive("/search") ? (onInk ? "text-ink-foreground" : "text-foreground") : ""}`}
              >
                <SearchIcon />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <Link
            href="/search"
            aria-label="Search"
            className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors ${
              onInk
                ? "text-ink-muted hover:bg-ink-soft hover:text-ink-foreground"
                : "text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            <SearchIcon />
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors ${
              onInk
                ? "text-ink-muted hover:bg-ink-soft hover:text-ink-foreground"
                : "text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className={`max-h-[min(70vh,28rem)] overflow-y-auto border-t md:hidden ${
            onInk
              ? "border-ink-border bg-ink"
              : "border-border bg-background"
          }`}
        >
          <ul className="mx-auto max-w-5xl px-4 py-2 sm:px-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block min-h-12 py-3.5 text-base ${
                    isActive(item.href)
                      ? onInk
                        ? "font-medium text-ink-foreground"
                        : "font-medium text-foreground"
                      : onInk
                        ? "text-ink-muted"
                        : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
