import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-28 text-center sm:px-8">
      <p className="eyebrow text-muted">404</p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
        <Link href="/" className="text-accent hover:text-accent-hover">
          Home
        </Link>
        <Link href="/search" className="text-accent hover:text-accent-hover">
          Search the knowledge base
        </Link>
        <Link href="/genai" className="text-accent hover:text-accent-hover">
          GenAI
        </Link>
        <Link
          href="/human-capital-ai"
          className="text-accent hover:text-accent-hover"
        >
          Human Capital AI
        </Link>
        <Link
          href="/people-analytics"
          className="text-accent hover:text-accent-hover"
        >
          People Analytics
        </Link>
      </div>
    </div>
  );
}
