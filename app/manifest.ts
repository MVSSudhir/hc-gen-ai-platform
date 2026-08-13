import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Sudhir",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f7f5f1",
    theme_color: "#121210",
  };
}
