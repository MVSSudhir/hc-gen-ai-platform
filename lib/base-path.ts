/**
 * Public path prefix. Empty on Cloudflare / local (site at domain root).
 * Set at build time for GitHub Pages project URLs:
 * https://<user>.github.io/<repo>/
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative URL so it works under GitHub Pages. */
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
