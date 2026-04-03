"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PenLine, Music, Utensils, Users, BookOpen } from "lucide-react";

const ways = [
  { icon: Music, label: "Share a Song", desc: "Folk songs, lullabies, wedding songs" },
  { icon: Utensils, label: "Share a Recipe", desc: "Traditional Badaga dishes and snacks" },
  { icon: Users, label: "Notable Person", desc: "Badaga individuals making a difference" },
  { icon: BookOpen, label: "Share a Story", desc: "History, legends, and oral traditions" },
];

export default function ContributeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-badaga-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-badaga-forest to-badaga-bark rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-badaga-gold/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-badaga-tea/20 rounded-full translate-y-12 -translate-x-12" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <PenLine className="w-10 h-10 text-badaga-gold mb-4" />
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-badaga-cream mb-4">
                Be a Guardian of Badaga Heritage
              </h2>
              <p className="text-badaga-cream/70 leading-relaxed mb-6">
                Do you have knowledge, stories, songs, or photographs that belong to this community? Help us build the most complete digital archive of Badaga culture: for future generations.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-badaga-gold text-badaga-bark font-bold rounded-xl hover:bg-badaga-gold/90 transition-all hover:scale-105"
              >
                <PenLine className="w-4 h-4" />
                Contribute Now
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {ways.map((way) => (
                <div key={way.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <way.icon className="w-7 h-7 text-badaga-gold mb-2" />
                  <h3 className="font-serif font-semibold text-badaga-cream text-sm mb-1">{way.label}</h3>
                  <p className="text-badaga-cream/60 text-xs">{way.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
