import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import site from "./src/_data/site.json" with { type: "json" };

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date)
  );

  eleventyConfig.addFilter("isoDate", (date) => date.toISOString().slice(0, 10));

  // Sitemaps, canonical links and share tags need full URLs.
  eleventyConfig.addFilter("fullUrl", (path) => new URL(path, site.url).href);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: `${site.title} — ${site.game} dev log`,
      subtitle: site.description,
      base: site.url,
      author: { name: site.title },
    },
  });
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
  },
};
