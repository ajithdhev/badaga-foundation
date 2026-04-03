"use client";

import { useEffect, useState, useRef } from "react";
import type { TeaRatesPayload } from "@/app/api/tea-rates/route";
import { Leaf, RefreshCw, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

function buildTickerItems(data: TeaRatesPayload): string[] {
  const items: string[] = [];

  items.push(`📍 CTC Leaf & All Dust, Week Ending ${data.weekEnding}`);

  for (const c of data.ctcCenters) {
    if (c.ctcPrice === null) continue;
    items.push(`${c.center}: ₹${c.ctcPrice}/kg`);
  }

  if (data.totalCenters.length > 0) {
    items.push("◆");
    items.push(`📍 Total Tea, Week Ending ${data.weekEnding}`);
    for (const c of data.totalCenters) {
      if (c.ctcPrice === null) continue;
      items.push(`${c.center}: ₹${c.ctcPrice}/kg`);
    }
  }

  return items;
}

export default function TeaTicker() {
  const [data, setData] = useState<TeaRatesPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tea-rates", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const json: TeaRatesPayload = await res.json();
      setData(json);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const id = setInterval(fetchRates, 6 * 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (error) return null;

  const items = data ? buildTickerItems(data) : [];
  const tickerText = [...items, ...items].join("    •    ");

  return (
    <div className="bg-badaga-bark border-b border-badaga-gold/20 sticky top-16 z-40 shadow-sm">
      <div className="flex items-stretch">
        {/* Label pill */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 bg-badaga-gold text-badaga-bark font-semibold text-xs whitespace-nowrap">
          <Leaf className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">TEA AUCTION RATES</span>
          <span className="sm:hidden">TEA RATES</span>
          <span className={cn(
            "ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold",
            data?.live ? "bg-green-700 text-white" : "bg-badaga-bark/20 text-badaga-bark/70"
          )}>
            {data?.live ? "LIVE" : "WKL"}
          </span>
        </div>

        {/* Scrolling track */}
        <div
          className="flex-1 overflow-hidden relative cursor-pointer"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          title="Hover to pause, Tea Board of India auction data"
        >
          {loading ? (
            <div className="flex items-center gap-2 h-9 px-4 text-badaga-gold/60 text-xs">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Loading Coonoor auction rates…</span>
            </div>
          ) : (
            <div
              ref={trackRef}
              className="flex items-center h-9 whitespace-nowrap text-xs text-badaga-gold/90 font-mono animate-ticker"
              style={{
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              <span className="px-4">{tickerText}</span>
            </div>
          )}
        </div>

        {/* Source link */}
        <a
          href="https://www.teaboard.gov.in/WEEKLYPRICES/2026"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1 px-3 text-badaga-gold/50 hover:text-badaga-gold transition-colors text-xs border-l border-badaga-gold/10"
          title="Tea Board of India, Weekly Prices 2026"
        >
          <ExternalLink className="w-3 h-3" />
          <span className="hidden md:inline">Tea Board</span>
        </a>
      </div>
    </div>
  );
}
