"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
  duration?: string;
}

export default function AudioPlayer({ audioUrl, title, duration }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  if (!audioUrl) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-badaga-earth/5 border border-dashed border-badaga-earth/20 rounded-xl text-sm text-badaga-earth/50">
        <Music className="w-4 h-4 flex-shrink-0" />
        <span className="italic">Audio preview coming soon</span>
        {duration && <span className="ml-auto text-xs">{duration}</span>}
      </div>
    );
  }

  const fmt = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setError(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    setProgress((a.currentTime / a.duration) * 100);
    setCurrentTime(fmt(a.currentTime));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    a.currentTime = ratio * a.duration;
  };

  if (error) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-500">
        <Music className="w-4 h-4 flex-shrink-0" />
        <span>Audio unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-badaga-forest/8 border border-badaga-tea/20 rounded-xl">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlaying(false)}
        onCanPlay={() => setLoaded(true)}
        onError={() => setError(true)}
        muted={muted}
        preload="none"
      />

      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        disabled={!loaded && playing}
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
          playing
            ? "bg-badaga-tea text-white shadow-md"
            : "bg-badaga-gold/20 text-badaga-gold border border-badaga-gold/30 hover:bg-badaga-gold/30"
        )}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

      {/* Progress bar + time */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-badaga-bark truncate mb-1.5">{title}</p>
        <div
          className="w-full h-1.5 bg-badaga-earth/15 rounded-full cursor-pointer group"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-badaga-tea rounded-full relative transition-all group-hover:bg-badaga-forest"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-badaga-gold rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-badaga-earth/50 mt-1">
          <span>{currentTime}</span>
          <span>{duration ?? "--:--"}</span>
        </div>
      </div>

      {/* Mute */}
      <button
        onClick={() => setMuted((m) => !m)}
        className="text-badaga-earth/40 hover:text-badaga-tea transition-colors flex-shrink-0"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
