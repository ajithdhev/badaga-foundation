import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/villages", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/culture", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/songs", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/famous-people", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/food", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/dress", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/dance", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/weddings", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/economy", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/submit", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
