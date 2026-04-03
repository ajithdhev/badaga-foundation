"use client";

import SectionHero from "@/components/ui/SectionHero";
import { seemais, villageStats } from "@/data/villages";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Mountain, Search, ChevronDown, ChevronUp, Send, CheckCircle } from "lucide-react";

export default function VillagesPage() {
  const [search, setSearch] = useState("");
  const [expandedSeemais, setExpandedSeemais] = useState<Set<string>>(
    new Set(seemais.map((s) => s.id))
  );

  // Submit form state
  const [hattiName, setHattiName] = useState("");
  const [hattiSeemai, setHattiSeemai] = useState(seemais[0].id);
  const [hattiMaps, setHattiMaps] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const toggleSeemai = (id: string) => {
    setExpandedSeemais((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hattiName.trim()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const seemaiName = seemais.find((s) => s.id === hattiSeemai)?.name ?? hattiSeemai;
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Community Submission",
          email: "noreply@voiceofbadagas.com",
          category: "Missing Hatti",
          title: hattiName.trim(),
          content: `Hatti Name: ${hattiName.trim()}\nSeemai: ${seemaiName}\nGoogle Maps: ${hattiMaps.trim() || "Not provided"}`,
          source: hattiMaps.trim() || "Not provided",
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setHattiName("");
      setHattiSeemai(seemais[0].id);
      setHattiMaps("");
    } catch {
      setSubmitError("Could not send your submission. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const searchLower = search.toLowerCase();

  const filteredSeemais = seemais.map((seemai) => ({
    ...seemai,
    builtIn: seemai.hatties.filter((h) => h.toLowerCase().includes(searchLower)),
  }));

  const totalVisible = filteredSeemais.reduce((acc, s) => acc + s.builtIn.length, 0);

  return (
    <>
      <SectionHero
        title="Badaga Hattis"
        subtitle="Hundreds of Badaga hattis scattered across the Nilgiri Hills, organised by Seemae. Browse all hattis, or report a missing hatti at the bottom."
        breadcrumbs={[{ label: "Hattis" }]}
        emoji="🏘️"
      />

      {/* Stats */}
      <section className="bg-badaga-forest py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: "Documented Hattis", value: villageStats.totalVillages + "+", icon: MapPin },
              { label: "Badaga Population", value: "4 Lakh+", icon: Users },
              { label: "Major Seemae", value: villageStats.majorSeemais.toString(), icon: Mountain },
              { label: "Elevation Range", value: villageStats.elevationRange, icon: Mountain },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-badaga-cream">
                <Icon className="w-6 h-6 text-badaga-gold mx-auto mb-2" />
                <div className="text-2xl font-serif font-bold text-badaga-gold">{value}</div>
                <div className="text-sm text-badaga-cream/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="py-6 bg-badaga-cream sticky top-[6.25rem] z-30 border-b border-badaga-earth/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-badaga-earth/60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hattis..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-badaga-earth/30 text-sm bg-white text-badaga-bark focus:outline-none focus:border-badaga-tea"
              />
            </div>
            <p className="text-sm text-badaga-earth/60">
              {search
                ? `${totalVisible} hattis matching "${search}"`
                : `${villageStats.totalVillages}+ Badaga hattis across 4 seemae`}
            </p>
          </div>
        </div>
      </section>

      {/* Seemai Sections */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {filteredSeemais.map((seemai, idx) => {
            const isExpanded = expandedSeemais.has(seemai.id);
            return (
              <motion.div
                key={seemai.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl border border-badaga-earth/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleSeemai(seemai.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-gradient-to-r from-badaga-forest to-badaga-bark text-left"
                >
                  <div>
                    <h2 className="font-serif font-bold text-badaga-cream text-xl">
                      {seemai.name}
                    </h2>
                    <div className="mt-1">
                      <span className="text-badaga-cream/60 text-xs">{seemai.description}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="bg-badaga-gold/20 text-badaga-gold px-3 py-1 rounded-full text-sm font-semibold">
                      {seemai.builtIn.length} hattis
                    </span>
                    {isExpanded
                      ? <ChevronUp className="w-5 h-5 text-badaga-cream/70" />
                      : <ChevronDown className="w-5 h-5 text-badaga-cream/70" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-badaga-cream/30 px-6 py-5"
                    >
                      {seemai.builtIn.length === 0 ? (
                        <p className="text-badaga-earth/50 text-sm">
                          No hattis match your search in this seemae.
                        </p>
                      ) : (
                        <div className="columns-2 sm:columns-3 lg:columns-4 gap-x-6">
                          {seemai.builtIn.map((name) => (
                            <div key={name} className="break-inside-avoid py-1 flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-badaga-tea flex-shrink-0" />
                              <span className="text-sm text-badaga-bark">{name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Submit missing hatti */}
      <section className="py-16 bg-badaga-cream border-t border-badaga-earth/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block text-badaga-tea text-sm font-semibold uppercase tracking-widest mb-3">
              Know a missing hatti?
            </span>
            <h2 className="text-3xl font-serif font-bold text-badaga-bark mb-3">
              Report a Missing Hatti
            </h2>
            <p className="text-badaga-earth text-sm leading-relaxed">
              If you know of a Badaga hatti that is not listed here, please submit it below. Our team will verify and add it to the list.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-10 text-center"
            >
              <CheckCircle className="w-14 h-14 text-badaga-tea" />
              <h3 className="font-serif font-bold text-badaga-bark text-xl">Thank you!</h3>
              <p className="text-badaga-earth text-sm max-w-sm">
                Your submission has been sent to our team. Once verified, the hatti will be added to the list.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-sm text-badaga-tea underline underline-offset-2"
              >
                Submit another
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-badaga-earth/20 p-6 sm:p-8 space-y-5 shadow-sm"
            >
              <div>
                <label className="block text-sm font-medium text-badaga-bark mb-1.5">
                  Hatti Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={hattiName}
                  onChange={(e) => setHattiName(e.target.value)}
                  placeholder="e.g. Kallatti"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-badaga-earth/30 text-sm text-badaga-bark bg-white focus:outline-none focus:border-badaga-tea focus:ring-1 focus:ring-badaga-tea/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-badaga-bark mb-1.5">
                  Seemae <span className="text-red-500">*</span>
                </label>
                <select
                  value={hattiSeemai}
                  onChange={(e) => setHattiSeemai(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-badaga-earth/30 text-sm text-badaga-bark bg-white focus:outline-none focus:border-badaga-tea focus:ring-1 focus:ring-badaga-tea/30"
                >
                  {seemais.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-badaga-bark mb-1.5">
                  Google Maps Link
                  <span className="text-badaga-earth/50 font-normal ml-1">(optional but helpful)</span>
                </label>
                <input
                  value={hattiMaps}
                  onChange={(e) => setHattiMaps(e.target.value)}
                  placeholder="https://maps.google.com/..."
                  type="url"
                  className="w-full px-4 py-2.5 rounded-lg border border-badaga-earth/30 text-sm text-badaga-bark bg-white focus:outline-none focus:border-badaga-tea focus:ring-1 focus:ring-badaga-tea/30"
                />
              </div>

              {submitError && (
                <p className="text-red-600 text-sm">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-badaga-tea text-white rounded-xl font-semibold text-sm hover:bg-badaga-forest transition-colors disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Sending…" : "Submit Hatti"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
