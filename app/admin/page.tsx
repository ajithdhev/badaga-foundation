"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) { setError("Incorrect password."); return; }
      router.push("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-badaga-forest flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8 gap-3">
          <Logo size={64} />
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold text-badaga-gold">Admin Panel</h1>
            <p className="text-badaga-cream/60 text-sm mt-1">Voice of Badagas</p>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 p-7 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-badaga-cream mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-badaga-cream/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-badaga-cream placeholder:text-badaga-cream/30 text-sm focus:outline-none focus:border-badaga-gold"
                placeholder="Enter admin password"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-badaga-gold text-badaga-bark font-semibold rounded-xl text-sm hover:bg-badaga-gold/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-badaga-cream/30">
          Set <code className="font-mono">ADMIN_PASSWORD</code> in your .env.local
        </p>
      </div>
    </div>
  );
}
