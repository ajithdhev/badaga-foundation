import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all crawlers and AI agents (Googlebot, GPTBot, Claude, Bing, etc.)
      { userAgent: "*",          allow: ["/"], disallow: ["/admin", "/api/admin"] },
      { userAgent: "Googlebot",  allow: "/" },
      { userAgent: "GPTBot",     allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "CCBot",      allow: "/" },
      { userAgent: "Bingbot",    allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
