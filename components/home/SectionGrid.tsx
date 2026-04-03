"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const sections = [
  { href: "/villages", label: "Villages", emoji: "🏘️", description: "312+ Badaga hattis across the Nilgiris, organised by seemae from high-altitude hamlets to bustling towns", color: "from-emerald-600 to-emerald-800" },
  { href: "/culture", label: "Culture, Food & Dress", emoji: "🏛️", description: "Festivals, food traditions, traditional dress and the sacred practices that define Badaga identity", color: "from-amber-600 to-amber-800" },
  { href: "/economy", label: "Economy", emoji: "🌿", description: "Tea estates, potato farms, cattle rearing, the livelihoods sustaining Badaga families for generations", color: "from-green-700 to-green-900" },
];

export default function SectionGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-badaga-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold text-badaga-bark mb-4">
            Explore Badaga Heritage
          </h2>
          <p className="text-badaga-earth max-w-2xl mx-auto">
            From mountain villages to sacred festivals, from folk songs to wedding rituals, discover every facet of Badaga life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((section, i) => (
            <motion.div
              key={section.href}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={section.href}
                className={`group block relative overflow-hidden rounded-2xl bg-gradient-to-br ${section.color} p-6 h-44 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl`}
              >
                <div className="relative z-10">
                  <span className="text-4xl mb-3 block">{section.emoji}</span>
                  <h3 className="text-xl font-serif font-bold text-white mb-1">{section.label}</h3>
                  <p className="text-white/75 text-sm leading-snug line-clamp-2">{section.description}</p>
                </div>
                {/* Shine effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
