"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-badaga-tea text-sm font-semibold uppercase tracking-widest mb-3">
              Who are the Badagas?
            </span>
            <h2 className="text-4xl font-serif font-bold text-badaga-bark mb-6 leading-tight">
              Children of the Nilgiri Mountains
            </h2>
            <div className="space-y-4 text-badaga-earth leading-relaxed">
              <p>
                The <strong>Badagas</strong> (meaning "northerners" in the Badaga language) are a community
                indigenous to the <strong>Nilgiri Hills</strong> of Tamil Nadu, India. With a population
                of approximately 4 lakh people spread across 312+ villages, they are the most
                numerous of the Nilgiri tribal communities.
              </p>
              <p>
                Historians believe the Badagas migrated to the Nilgiris from the Mysore plateau
                (present-day Karnataka) sometime between the 15th and 17th centuries, fleeing
                conflict and seeking the cool, fertile highlands. They speak <strong>Badaga</strong> —
                a Southern Dravidian language closely related to Kannada: and have preserved
                a rich oral literary tradition over centuries.
              </p>
              <p>
                The Badagas are deeply connected to the land: skilled farmers who cultivate
                the world-famous Nilgiri tea, the prized Nilgiri potato, and diverse vegetables
                in the fertile mountain valleys. Their spiritual life revolves around the
                goddess <strong>Hethai</strong>, whose festivals bring all villages together in
                communal celebration.
              </p>
              <p>
                Today, the Badaga community balances modernity with tradition: increasingly
                educated and professionally accomplished while fiercely protecting the cultural
                practices, songs, festivals, and sacred sites that define their identity.
              </p>
            </div>
            <Link
              href="/culture"
              className="inline-block mt-6 px-6 py-2.5 bg-badaga-tea text-white rounded-lg font-medium hover:bg-badaga-forest transition-colors"
            >
              Explore Badaga Culture →
            </Link>
          </motion.div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { emoji: "🏔️", title: "Nilgiri Mountains", desc: "900m–2637m elevation homeland" },
              { emoji: "🍃", title: "Tea Guardians", desc: "World-famous Nilgiri tea farmers" },
              { emoji: "🎵", title: "Living Tradition", desc: "Oral songs passed for generations" },
              { emoji: "🙏", title: "Hethai Worship", desc: "Sacred festivals uniting villages" },
              { emoji: "🗣️", title: "Badaga Language", desc: "Distinct Dravidian tongue" },
              { emoji: "🌿", title: "Sacred Groves", desc: "Ancient ecology preserved" },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-badaga-cream rounded-xl p-4 border border-badaga-earth/20 hover:border-badaga-tea/50 transition-colors"
              >
                <span className="text-3xl mb-2 block">{card.emoji}</span>
                <h3 className="font-serif font-semibold text-badaga-bark text-sm mb-1">{card.title}</h3>
                <p className="text-badaga-earth text-xs">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
