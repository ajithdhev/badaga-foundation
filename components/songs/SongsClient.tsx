"use client";

import { useState, useMemo, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRating } from "@/contexts/RatingContext";
import SongCard from "./SongCard";
import LoginModal from "./LoginModal";
import type { Song, SongGenre } from "@/types/badaga";
import { LogIn, LogOut, User, Trophy, Music2, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const GENRES: { label: string; value: SongGenre | "All"; emoji: string; desc: string }[] = [
  { value: "All",        label: "All Songs",  emoji: "🎵", desc: "All 50 songs" },
  { value: "Hettai",     label: "Hettai",     emoji: "🙏", desc: "Sacred Hethai devotional songs" },
  { value: "Habba",      label: "Habba",      emoji: "🎉", desc: "Festival & celebration songs" },
  { value: "Melody",     label: "Melody",     emoji: "🎶", desc: "Folk melodies & nature songs" },
  { value: "Sad",        label: "Sad",        emoji: "💧", desc: "Songs of sorrow & longing" },
  { value: "Wedding",    label: "Wedding",    emoji: "💍", desc: "Marriage ceremony songs" },
  { value: "Lullaby",    label: "Lullaby",    emoji: "🌙", desc: "Lullabies for children" },
  { value: "Devotional", label: "Devotional", emoji: "🕯️", desc: "Prayer & worship songs" },
];

type SortMode = "rating" | "rank";

interface SongsClientProps {
  songs: Song[];
}

export default function SongsClient({ songs }: SongsClientProps) {
  const { user, logout } = useAuth();
  const { getScore, getAverage, getRatingCount } = useRating();
  const [activeGenre, setActiveGenre] = useState<SongGenre | "All">("All");
  const [showLogin, setShowLogin] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("rating");
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Called by StarRating when user is not logged in
  const handleLoginRequired = useCallback((afterLogin?: () => void) => {
    if (afterLogin) setPendingAction(() => afterLogin);
    setShowLogin(true);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    pendingAction?.();
    setPendingAction(null);
  }, [pendingAction]);

  // Sort + filter, recomputed whenever ratings change
  const sortedSongs = useMemo(() => {
    const filtered = activeGenre === "All"
      ? [...songs]
      : songs.filter((s) => s.genre === activeGenre);

    return filtered.sort((a, b) => {
      if (sortMode === "rating") {
        const sa = getScore(a.id);
        const sb = getScore(b.id);
        if (sa !== sb) return sb - sa;               // higher score first
        return a.initialRank - b.initialRank;         // fallback: curated rank
      }
      return a.initialRank - b.initialRank;
    });
  }, [songs, activeGenre, sortMode, getScore]);

  // Genre counts
  const genreCounts = useMemo(() => {
    const counts: Record<string, number> = { All: songs.length };
    songs.forEach((s) => {
      counts[s.genre] = (counts[s.genre] ?? 0) + 1;
    });
    return counts;
  }, [songs]);

  // Top rated song for the banner
  const topRated = useMemo(() => {
    return [...songs].sort((a, b) => getScore(b.id) - getScore(a.id))[0];
  }, [songs, getScore]);

  const topAvg = getAverage(topRated.id);
  const topCount = getRatingCount(topRated.id);

  return (
    <section className="py-10 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top bar: user + sort ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          {/* User status */}
          {user ? (
            <div className="flex items-center gap-3 bg-badaga-forest/8 border border-badaga-tea/20 px-4 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-badaga-tea/20 flex items-center justify-center">
                <User className="w-4 h-4 text-badaga-tea" />
              </div>
              <div>
                <p className="text-sm font-medium text-badaga-bark leading-none">{user.name}</p>
                <p className="text-xs text-badaga-earth/60">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="ml-2 flex items-center gap-1 text-xs text-badaga-earth/60 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-badaga-tea text-white rounded-xl text-sm font-semibold hover:bg-badaga-forest transition-colors shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              Sign In to Rate Songs
            </button>
          )}

          {/* Sort toggle */}
          <div className="flex items-center gap-1 bg-badaga-cream border border-badaga-earth/20 rounded-xl p-1">
            <button
              onClick={() => setSortMode("rating")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                sortMode === "rating"
                  ? "bg-badaga-tea text-white shadow-sm"
                  : "text-badaga-earth hover:text-badaga-bark"
              )}
            >
              <Trophy className="w-3.5 h-3.5" /> By Rating
            </button>
            <button
              onClick={() => setSortMode("rank")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                sortMode === "rank"
                  ? "bg-badaga-tea text-white shadow-sm"
                  : "text-badaga-earth hover:text-badaga-bark"
              )}
            >
              <Music2 className="w-3.5 h-3.5" /> Curated
            </button>
          </div>
        </div>

        {/* ── Top-rated banner (only if someone has rated) ── */}
        {topCount > 0 && topAvg > 0 && (
          <div className="mb-8 bg-gradient-to-r from-badaga-gold/20 via-badaga-gold/10 to-transparent border border-badaga-gold/30 rounded-2xl p-4 flex items-center gap-4">
            <div className="text-3xl">🏆</div>
            <div>
              <p className="text-xs text-badaga-gold font-semibold uppercase tracking-wide">Community Top Pick</p>
              <p className="font-serif font-bold text-badaga-bark">{topRated.title}</p>
              <p className="text-sm text-badaga-earth/70">
                ★ {topAvg.toFixed(1)} average · {topCount} {topCount === 1 ? "rating" : "ratings"}
              </p>
            </div>
          </div>
        )}

        {/* ── Genre tabs ── */}
        <div className="mb-6 -mx-4 sm:mx-0">
          <div className="flex gap-2 overflow-x-auto px-4 sm:px-0 pb-2 scrollbar-hide">
            {GENRES.map((g) => (
              <button
                key={g.value}
                onClick={() => setActiveGenre(g.value)}
                title={g.desc}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap",
                  activeGenre === g.value
                    ? "bg-badaga-bark text-badaga-cream border-transparent shadow-md"
                    : "bg-white text-badaga-earth border-badaga-earth/20 hover:border-badaga-tea/50 hover:text-badaga-bark"
                )}
              >
                <span>{g.emoji}</span>
                <span>{g.label}</span>
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  activeGenre === g.value ? "bg-white/20 text-badaga-cream/80" : "bg-badaga-earth/10 text-badaga-earth/60"
                )}>
                  {genreCounts[g.value] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Sort indicator ── */}
        <div className="flex items-center gap-2 mb-4 text-xs text-badaga-earth/60">
          <span>{sortedSongs.length} songs</span>
          <span>·</span>
          {sortMode === "rating" ? (
            <span className="flex items-center gap-1">
              <ChevronDown className="w-3 h-3" /> Ranked by community ratings
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <ChevronUp className="w-3 h-3" /> Curated editorial order
            </span>
          )}
          {!user && (
            <>
              <span>·</span>
              <button
                onClick={() => setShowLogin(true)}
                className="text-badaga-tea hover:underline font-medium"
              >
                Sign in to rate
              </button>
            </>
          )}
        </div>

        {/* ── Song list ── */}
        <div className="space-y-3">
          {sortedSongs.map((song, i) => (
            <SongCard
              key={song.id}
              song={song}
              rank={i + 1}
              onLoginRequired={() => handleLoginRequired()}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-10 p-6 bg-purple-50 rounded-2xl border border-purple-200 text-center">
          <Music2 className="w-10 h-10 text-purple-400 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-badaga-bark mb-2">Know a Badaga Song?</h3>
          <p className="text-sm text-badaga-earth mb-4">
            Help us grow to 100 songs, share lyrics, recordings, or the story behind a song you know.
          </p>
          <a
            href="/submit?category=song"
            className="inline-block px-6 py-2 bg-purple-700 text-white rounded-lg text-sm font-medium hover:bg-purple-800 transition-colors"
          >
            Submit a Song
          </a>
        </div>
      </div>

      {/* ── Login modal ── */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </section>
  );
}
