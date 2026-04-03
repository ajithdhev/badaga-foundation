"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Submission } from "@/lib/submissions-store";
import Logo from "@/components/ui/Logo";
import {
  MapPin, ExternalLink, Trash2, CheckCheck,
  LogOut, Home, RefreshCw, MapPinned, FileText, Bell
} from "lucide-react";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading]         = useState(true);
  const [filter, setFilter]           = useState<"all" | "hatti" | "contribution">("all");
  const router = useRouter();

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/submissions");
    if (res.status === 401) { router.push("/admin"); return; }
    setSubmissions(await res.json());
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  const act = async (id: string, action: "read" | "delete") => {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    fetchSubmissions();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const visible = submissions.filter(
    (s) => filter === "all" || s.type === filter
  );
  const unread = submissions.filter((s) => !s.read).length;
  const hattiCount = submissions.filter((s) => s.type === "hatti").length;
  const contribCount = submissions.filter((s) => s.type === "contribution").length;

  return (
    <div className="min-h-screen bg-badaga-cream">
      {/* Top bar */}
      <header className="bg-badaga-bark text-badaga-cream sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <span className="font-serif font-bold text-badaga-gold text-sm">Admin Dashboard</span>
            {unread > 0 && (
              <span className="bg-badaga-gold text-badaga-bark text-xs font-bold px-2 py-0.5 rounded-full">
                {unread} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchSubmissions}
              className="p-2 rounded hover:bg-white/10 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <a
              href="/"
              className="p-2 rounded hover:bg-white/10 transition-colors"
              title="Go to site"
            >
              <Home className="w-4 h-4" />
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total",         value: submissions.length, icon: Bell,      color: "bg-badaga-forest" },
            { label: "Missing Hattis",value: hattiCount,         icon: MapPinned, color: "bg-badaga-tea"    },
            { label: "Contributions", value: contribCount,       icon: FileText,  color: "bg-badaga-mist"   },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className={`${color} rounded-2xl p-5 text-white flex items-center gap-4`}>
              <Icon className="w-8 h-8 opacity-80" />
              <div>
                <div className="text-3xl font-serif font-bold">{value}</div>
                <div className="text-sm opacity-70">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "hatti", "contribution"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-badaga-tea text-white"
                  : "bg-white border border-badaga-earth/20 text-badaga-earth hover:border-badaga-tea"
              }`}
            >
              {f === "all" ? "All" : f === "hatti" ? "Missing Hattis" : "Contributions"}
            </button>
          ))}
        </div>

        {/* Submissions list */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-badaga-earth/50 gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Loading…</span>
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20 text-badaga-earth/40">
            <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((s) => (
              <div
                key={s.id}
                className={`bg-white rounded-2xl border p-5 transition-all ${
                  !s.read
                    ? "border-badaga-gold/60 shadow-md shadow-badaga-gold/10"
                    : "border-badaga-earth/15"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Type icon */}
                    <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                      s.type === "hatti" ? "bg-badaga-gold/20" : "bg-badaga-mist/20"
                    }`}>
                      {s.type === "hatti"
                        ? <MapPin className="w-4 h-4 text-badaga-gold" />
                        : <FileText className="w-4 h-4 text-badaga-mist" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {!s.read && (
                          <span className="bg-badaga-gold text-badaga-bark text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                            New
                          </span>
                        )}
                        <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                          s.type === "hatti"
                            ? "bg-badaga-gold/15 text-badaga-earth"
                            : "bg-badaga-mist/15 text-badaga-earth"
                        }`}>
                          {s.type === "hatti" ? "Missing Hatti" : s.category ?? "Contribution"}
                        </span>
                        <span className="text-xs text-badaga-earth/40">
                          {new Date(s.submittedAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit", month: "short", year: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {s.type === "hatti" ? (
                        <div className="space-y-0.5">
                          <p className="font-semibold text-badaga-bark text-base">
                            {s.hattiName}
                          </p>
                          {s.seemai && (
                            <p className="text-sm text-badaga-earth">
                              Seemae: <span className="font-medium">{s.seemai}</span>
                            </p>
                          )}
                          {s.mapsUrl && (
                            <a
                              href={s.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-badaga-tea hover:underline mt-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              View on Google Maps
                            </a>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="font-semibold text-badaga-bark">{s.title}</p>
                          {s.submitterName && s.submitterName !== "Community Submission" && (
                            <p className="text-xs text-badaga-earth/60">From: {s.submitterName}</p>
                          )}
                          {s.content && (
                            <p className="text-sm text-badaga-earth leading-relaxed whitespace-pre-line line-clamp-3">
                              {s.content}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!s.read && (
                      <button
                        onClick={() => act(s.id, "read")}
                        title="Mark as read"
                        className="p-2 rounded-lg text-badaga-tea hover:bg-badaga-tea/10 transition-colors"
                      >
                        <CheckCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => act(s.id, "delete")}
                      title="Delete"
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
