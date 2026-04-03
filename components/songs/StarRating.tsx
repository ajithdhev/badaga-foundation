"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRating } from "@/contexts/RatingContext";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  songId: string;
  onLoginRequired: () => void;
}

export default function StarRating({ songId, onLoginRequired }: StarRatingProps) {
  const { user } = useAuth();
  const { rate, getUserRating, getAverage, getRatingCount } = useRating();
  const [hovered, setHovered] = useState(0);

  const userRating = user ? getUserRating(songId, user.email) : 0;
  const average = getAverage(songId);
  const count = getRatingCount(songId);

  const displayStars = hovered || userRating;

  const handleClick = (stars: number) => {
    if (!user) { onLoginRequired(); return; }
    rate(songId, user.email, stars);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Interactive stars */}
      <div
        className="flex items-center gap-0.5"
        onMouseLeave={() => setHovered(0)}
        title={user ? "Click to rate" : "Sign in to rate"}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHovered(star)}
            className={cn(
              "transition-all duration-100",
              !user && "cursor-pointer opacity-60 hover:opacity-100"
            )}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={cn(
                "w-4 h-4 transition-colors",
                star <= displayStars
                  ? "fill-badaga-gold text-badaga-gold"
                  : "fill-transparent text-badaga-earth/30",
                hovered > 0 && star <= hovered && "scale-110"
              )}
            />
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-1.5 text-xs text-badaga-earth/70">
        {count > 0 ? (
          <>
            <span className="font-semibold text-badaga-gold">{average.toFixed(1)}</span>
            <span>({count} {count === 1 ? "rating" : "ratings"})</span>
          </>
        ) : (
          <span className="italic">No ratings yet</span>
        )}
      </div>

      {/* User's own rating badge */}
      {userRating > 0 && (
        <span className="text-xs bg-badaga-tea/10 text-badaga-tea px-2 py-0.5 rounded-full border border-badaga-tea/20">
          You: {userRating}★
        </span>
      )}
    </div>
  );
}
