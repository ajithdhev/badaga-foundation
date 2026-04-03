"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { label: "Villages", value: 312, suffix: "+", description: "Badaga settlements across the Nilgiris" },
  { label: "Population", value: 400000, suffix: "+", description: "Badaga community members" },
  { label: "Years of History", value: 500, suffix: "+", description: "Documented Badaga heritage" },
  { label: "Festivals", value: 12, suffix: "", description: "Major annual celebrations" },
];

export default function StatsBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="bg-badaga-forest py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center text-badaga-cream/70 text-sm font-medium uppercase tracking-widest mb-10"
        >
          Badagas by the Numbers
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-serif font-bold text-badaga-gold mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-badaga-cream font-semibold mb-1">{stat.label}</div>
              <div className="text-badaga-cream/50 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
