import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/case-studies",
  "/contact",
  "/mechanics",
  "/privacy",
  "/security",
  "/services",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-06");

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
