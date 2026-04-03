import { NextResponse } from "next/server";

export interface CenterData {
  center: string;
  ctcPrice: number | null;
  dustPrice: number | null;
}

export interface TeaRatesPayload {
  updatedAt: string;
  source: string;
  live: boolean;
  weekEnding: string;
  ctcCenters: CenterData[];
  totalCenters: CenterData[];
  latestCoonoorCTC: number | null;
  latestCoonoorDust: number | null;
}

// Column order matches the Tea Board table left-to-right
const CTC_CENTERS = [
  "Kolkata", "Guwahati", "Siliguri", "Jalpaiguri",
  "mjunction", "Cochin", "Coonoor", "Coimbatore", "Tea Serve",
];

// Actual Tea Board data, week ending 21/03/2026
// Format: ctcPrice (dustPrice) per centre
// Source: https://www.teaboard.gov.in/WEEKLYPRICES/2026
const KNOWN_DATA: TeaRatesPayload = {
  updatedAt: new Date().toISOString(),
  source: "Tea Board of India, Weekly Auction Prices 2026",
  live: false,
  weekEnding: "21/03/2026",
  latestCoonoorCTC: 114.92,
  latestCoonoorDust: 116.51,
  ctcCenters: [
    { center: "Kolkata",    ctcPrice: null,   dustPrice: 138.04 },
    { center: "Guwahati",   ctcPrice: null,   dustPrice: null   },
    { center: "Siliguri",   ctcPrice: 177.18, dustPrice: 160.86 },
    { center: "Jalpaiguri", ctcPrice: null,   dustPrice: null   },
    { center: "mjunction",  ctcPrice: null,   dustPrice: null   },
    { center: "Cochin",     ctcPrice: 169.74, dustPrice: 160.76 },
    { center: "Coonoor",    ctcPrice: 114.92, dustPrice: 116.51 },
    { center: "Coimbatore", ctcPrice: 143.70, dustPrice: 142.73 },
    { center: "Tea Serve",  ctcPrice: 110.77, dustPrice: 115.04 },
  ],
  totalCenters: [],
};

/**
 * Strips HTML tags and normalises whitespace to produce clean text.
 */
function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parse a single "ctcPrice (dustPrice)" cell string.
 * Returns { ctc, dust }, either may be null if "NS" or missing.
 */
function parseCell(raw: string): { ctc: number | null; dust: number | null } {
  const s = raw.trim();
  const match = s.match(/([\d.]+|NS)\s*\(\s*([\d.]+|NS)\s*\)/);
  if (match) {
    return {
      ctc:  match[1] === "NS" ? null : parseFloat(match[1]),
      dust: match[2] === "NS" ? null : parseFloat(match[2]),
    };
  }
  if (/^[\d.]+$/.test(s)) return { ctc: parseFloat(s), dust: null };
  return { ctc: null, dust: null };
}

/**
 * From plain text, find all rows that start with a DD/MM/YYYY date followed by
 * price cells. Return the chronologically LATEST row's data.
 *
 * Each "cell" looks like:  114.92 (116.51)  or  NS (NS)  or  NS (138.04)
 * There should be 9 cells after the date (one per CTC_CENTERS entry).
 */
function parseLatestWeek(text: string): { weekEnding: string; centers: CenterData[] } | null {
  const cellPattern = /(?:[\d.]+|NS)\s*\(\s*(?:[\d.]+|NS)\s*\)/g;
  const rowPattern  = /(\d{2}\/\d{2}\/\d{4})((?:\s+(?:[\d.]+|NS)\s*\(\s*(?:[\d.]+|NS)\s*\))+)/g;

  // Collect all matching rows
  const rows: { date: string; dateMs: number; cellStr: string }[] = [];

  let m: RegExpExecArray | null;
  while ((m = rowPattern.exec(text)) !== null) {
    const [dd, mm, yyyy] = m[1].split("/");
    const dateMs = new Date(`${yyyy}-${mm}-${dd}`).getTime();
    if (!isNaN(dateMs)) {
      rows.push({ date: m[1], dateMs, cellStr: m[2] });
    }
  }

  if (rows.length === 0) return null;

  // Sort descending and take the most recent
  rows.sort((a, b) => b.dateMs - a.dateMs);
  const { date, cellStr } = rows[0];

  const cells: CenterData[] = [];
  let cm: RegExpExecArray | null;
  let idx = 0;
  cellPattern.lastIndex = 0;

  while ((cm = cellPattern.exec(cellStr)) !== null && idx < CTC_CENTERS.length) {
    const { ctc, dust } = parseCell(cm[0]);
    cells.push({ center: CTC_CENTERS[idx], ctcPrice: ctc, dustPrice: dust });
    idx++;
  }

  if (cells.length === 0) return null;
  return { weekEnding: date, centers: cells };
}

async function fetchLiveRates(): Promise<TeaRatesPayload | null> {
  try {
    const res = await fetch("https://www.teaboard.gov.in/WEEKLYPRICES/2026", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      next: { revalidate: 21600 },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const text = stripHtml(html);

    // The page has two tables, CTC first, Total Tea second.
    // Both share the same date column. We split on the second table's heading
    // so that rowPattern picks the CTC rows, not the Total Tea rows.
    const ctcSplit = text.split(/TOTAL TEA/i);
    const ctcText  = ctcSplit[0] ?? text;

    const ctcResult = parseLatestWeek(ctcText);
    if (!ctcResult) return null;

    // Try to parse total tea table too
    const totalResult = ctcSplit[1] ? parseLatestWeek(ctcSplit[1]) : null;

    const coonoor = ctcResult.centers.find((c) => c.center === "Coonoor");

    return {
      updatedAt: new Date().toISOString(),
      source: "Tea Board of India, Weekly Auction Prices 2026",
      live: true,
      weekEnding: ctcResult.weekEnding,
      ctcCenters: ctcResult.centers,
      totalCenters: totalResult?.centers ?? [],
      latestCoonoorCTC: coonoor?.ctcPrice ?? null,
      latestCoonoorDust: coonoor?.dustPrice ?? null,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const live = await fetchLiveRates();
  const data = live ?? KNOWN_DATA;

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600",
    },
  });
}
