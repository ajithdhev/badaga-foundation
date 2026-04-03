"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const RATINGS_KEY = "badaga_song_ratings_v1";

// { songId: { email: starValue } }
type RatingsStore = Record<string, Record<string, number>>;

interface RatingContextValue {
  ratings: RatingsStore;
  rate: (songId: string, email: string, stars: number) => void;
  getUserRating: (songId: string, email: string) => number;
  getAverage: (songId: string) => number;
  getRatingCount: (songId: string) => number;
  getScore: (songId: string) => number;
}

const RatingContext = createContext<RatingContextValue | null>(null);

function loadRatings(): RatingsStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(RATINGS_KEY);
    return raw ? (JSON.parse(raw) as RatingsStore) : {};
  } catch {
    return {};
  }
}

/** Wilson-inspired weighted score, dampens single-rating bias */
function weightedScore(avg: number, count: number): number {
  if (count === 0) return 0;
  return avg * Math.log10(count + 1);
}

export function RatingProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings] = useState<RatingsStore>(() => loadRatings());

  const rate = useCallback((songId: string, email: string, stars: number) => {
    setRatings((prev) => {
      const next: RatingsStore = {
        ...prev,
        [songId]: { ...(prev[songId] ?? {}), [email]: stars },
      };
      localStorage.setItem(RATINGS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getUserRating = useCallback(
    (songId: string, email: string) => ratings[songId]?.[email] ?? 0,
    [ratings]
  );

  const getAverage = useCallback(
    (songId: string) => {
      const vals = Object.values(ratings[songId] ?? {});
      if (vals.length === 0) return 0;
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    },
    [ratings]
  );

  const getRatingCount = useCallback(
    (songId: string) => Object.keys(ratings[songId] ?? {}).length,
    [ratings]
  );

  const getScore = useCallback(
    (songId: string) => weightedScore(getAverage(songId), getRatingCount(songId)),
    [getAverage, getRatingCount]
  );

  return (
    <RatingContext.Provider value={{ ratings, rate, getUserRating, getAverage, getRatingCount, getScore }}>
      {children}
    </RatingContext.Provider>
  );
}

export function useRating() {
  const ctx = useContext(RatingContext);
  if (!ctx) throw new Error("useRating must be used inside RatingProvider");
  return ctx;
}
