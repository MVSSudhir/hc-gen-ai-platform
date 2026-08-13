import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";
import remarkGfm from "remark-gfm";

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-scroll">
      <table {...props} />
    </div>
  );
}

/** Renders a markdown/MDX body with the site's prose styling. */
export function Markdown({ source }: { source: string }) {
  if (!source.trim()) return null;
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={{ table: Table }}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
