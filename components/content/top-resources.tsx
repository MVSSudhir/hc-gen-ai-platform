import { YouTubeEmbed } from "@/components/content/youtube-embed";
import {
  youtubeIdFromUrl,
  type LearningResource,
} from "@/lib/learning-resource";

const kindLabel: Record<LearningResource["kind"], string> = {
  video: "Video",
  article: "Article",
  docs: "Docs",
  paper: "Paper",
};

function ResourceLink({ resource }: { resource: LearningResource }) {
  return (
    <a
      href={resource.url}
      rel="noopener noreferrer"
      target="_blank"
      className="group inline-flex min-h-10 max-w-full items-baseline gap-2 text-[15px] leading-snug text-muted transition-colors hover:text-accent"
    >
      <span className="eyebrow shrink-0 text-faint group-hover:text-accent">
        {kindLabel[resource.kind]}
      </span>
      <span className="min-w-0">{resource.title}</span>
      <span className="hidden shrink-0 text-faint sm:inline">
        · {resource.publisher}
      </span>
    </a>
  );
}

export function TopResources({
  resources,
  heading = "Top resources",
  layout = "section",
  embedVideos = true,
}: {
  resources: LearningResource[];
  heading?: string;
  layout?: "section" | "panel" | "inline";
  embedVideos?: boolean;
}) {
  if (!resources.length) return null;

  const allVideos = embedVideos
    ? resources.flatMap((resource) => {
        const id = youtubeIdFromUrl(resource.url);
        return id ? [{ resource, id }] : [];
      })
    : [];
  const videos = layout === "panel" ? allVideos.slice(0, 1) : allVideos;

  if (layout === "inline") {
    return (
      <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
        {resources.slice(0, 2).map((resource) => (
          <li key={resource.url}>
            <a
              href={resource.url}
              rel="noopener noreferrer"
              target="_blank"
              className="text-[13px] text-faint transition-colors hover:text-accent"
            >
              {kindLabel[resource.kind]} · {resource.publisher}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  const body = (
    <div className="space-y-5">
      {videos.length > 0 ? (
        <div
          className={
            videos.length > 1 ? "grid gap-4 sm:grid-cols-2" : "max-w-xl"
          }
        >
          {videos.map(({ resource, id }) => (
            <YouTubeEmbed
              key={resource.url}
              videoId={id}
              title={resource.title}
            />
          ))}
        </div>
      ) : null}
      <ul className="space-y-1.5">
        {resources.map((resource) => (
          <li key={resource.url}>
            <ResourceLink resource={resource} />
          </li>
        ))}
      </ul>
    </div>
  );

  if (layout === "panel") {
    return (
      <div className="panel mt-6 p-5 sm:p-6">
        <h3 className="eyebrow text-muted">{heading}</h3>
        <div className="mt-4">{body}</div>
      </div>
    );
  }

  return (
    <section
      id="resources"
      className="grid gap-2 border-t border-border py-8 sm:grid-cols-[11rem_1fr] sm:gap-10"
    >
      <h2 className="eyebrow pt-1 text-muted">{heading}</h2>
      {body}
    </section>
  );
}
