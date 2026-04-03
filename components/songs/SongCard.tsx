"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, Mic2, Clock } from "lucide-react";
import StarRating from "./StarRating";
import type { Song } from "@/types/badaga";
import { cn } from "@/lib/utils";

// Client-only audio player (SSR guard via ssr: false)
const AudioPlayer = dynamic(() => import("./AudioPlayer"), { ssr: false });

const GENRE_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  Hettai:    { bg: "bg-amber-100",  text: "text-amber-800",  dot: "bg-amber-500"  },
  Habba:     { bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-500"  },
  Melody:    { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-500"   },
  Sad:       { bg: "bg-slate-100",  text: "text-slate-700",  dot: "bg-slate-400"  },
  Wedding:   { bg: "bg-rose-100",   text: "text-rose-800",   dot: "bg-rose-500"   },
  Lullaby:   { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-400" },
  Devotional:{ bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-500" },
};

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

interface SongCardProps {
  song: Song;
  rank: number;
  onLoginRequired: () => void;
}

export default function SongCard({ song, rank, onLoginRequired }: SongCardProps) {
  const [expanded, setExpanded] = useState(false);
  const style = GENRE_STYLE[song.genre] ?? GENRE_STYLE.Melody;

  return (
    <article className={cn(
      "bg-white rounded-2xl border transition-all duration-200",
      rank <= 3
        ? "border-badaga-gold/40 shadow-md shadow-badaga-gold/10"
        : "border-badaga-earth/15 hover:border-badaga-tea/30 hover:shadow-sm"
    )}>
      {/* Main row */}
      <div className="flex items-start gap-4 p-4">
        {/* Rank badge */}
        <div className={cn(
          "flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center font-serif font-bold leading-none",
          rank === 1 ? "bg-badaga-gold/20 text-badaga-gold border border-badaga-gold/30" :
          rank === 2 ? "bg-slate-100 text-slate-500 border border-slate-200" :
          rank === 3 ? "bg-amber-50 text-amber-600 border border-amber-200" :
          "bg-badaga-cream text-badaga-earth/60 text-sm"
        )}>
          {rank <= 3 ? (
            <span className="text-xl leading-none">{RANK_MEDAL[rank]}</span>
          ) : (
            <span className="text-lg">#{rank}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-1">
            <h3 className="font-serif font-bold text-badaga-bark text-base leading-snug">{song.title}</h3>
            {song.titleBadaga && (
              <span className="text-xs text-badaga-earth/50">{song.titleBadaga}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            {/* Genre badge */}
            <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full", style.bg, style.text)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", style.dot)} />
              {song.genre}
            </span>

            {song.artist && (
              <span className="flex items-center gap-1 text-xs text-badaga-earth/50">
                <Mic2 className="w-3 h-3" />
                {song.artist}
              </span>
            )}

            {song.duration && (
              <span className="flex items-center gap-1 text-xs text-badaga-earth/50">
                <Clock className="w-3 h-3" />
                {song.duration}
              </span>
            )}
          </div>

          {/* Star rating */}
          <StarRating songId={song.id} onLoginRequired={onLoginRequired} />
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex-shrink-0 mt-1 text-badaga-earth/40 hover:text-badaga-tea transition-colors"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", expanded && "rotate-180")} />
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-badaga-earth/10 px-4 pb-5 pt-4 space-y-4">
          {/* Audio player */}
          <AudioPlayer audioUrl={song.audioUrl} title={song.title} duration={song.duration} />

          {/* Description */}
          <p className="text-sm text-badaga-earth leading-relaxed">{song.description}</p>

          {song.occasion && (
            <p className="text-xs text-badaga-tea/80 italic flex items-center gap-1.5">
              <span>🎊</span> {song.occasion}
            </p>
          )}

          {/* Lyrics */}
          {song.lyrics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-badaga-cream rounded-lg p-4 border border-badaga-earth/15">
                <h4 className="text-xs font-semibold text-badaga-earth/50 uppercase tracking-wide mb-2">
                  Badaga Lyrics
                </h4>
                <p className="text-sm text-badaga-bark font-serif italic leading-7 whitespace-pre-line">
                  {song.lyrics}
                </p>
              </div>
              {song.meaning && (
                <div className="bg-badaga-forest/5 rounded-lg p-4 border border-badaga-forest/15">
                  <h4 className="text-xs font-semibold text-badaga-earth/50 uppercase tracking-wide mb-2">
                    English Translation
                  </h4>
                  <p className="text-sm text-badaga-bark leading-7 whitespace-pre-line">
                    {song.meaning}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
