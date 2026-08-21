export const learningResourceKinds = [
  "video",
  "article",
  "docs",
  "paper",
] as const;

export type LearningResourceKind = (typeof learningResourceKinds)[number];

export type LearningResource = {
  title: string;
  url: string;
  publisher: string;
  kind: LearningResourceKind;
};

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

/** Extracts an 11-character YouTube video id from common watch/embed URLs. */
export function youtubeIdFromUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (!YOUTUBE_HOSTS.has(host)) return undefined;

    if (host === "youtu.be" || host === "www.youtu.be") {
      return videoId(parsed.pathname.split("/").filter(Boolean)[0]);
    }

    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") {
      return videoId(parts[1]);
    }

    return videoId(parsed.searchParams.get("v") ?? undefined);
  } catch {
    return undefined;
  }
}

export function uniqueResources(
  resources: LearningResource[],
): LearningResource[] {
  const seen = new Set<string>();
  return resources.filter((resource) => {
    if (seen.has(resource.url)) return false;
    seen.add(resource.url);
    return true;
  });
}

function videoId(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return /^[a-zA-Z0-9_-]{11}$/.test(value) ? value : undefined;
}
