"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const sources = [
  {
    title: "eHRAF World Cultures, Badaga (AW50)",
    url: "https://ehrafworldcultures.yale.edu/cultures/aw50/summary",
    desc: "Yale University Human Relations Area Files, peer-reviewed ethnographic records",
  },
  {
    title: "Christiane Pilot-Raichoor, Badaga Language Research",
    url: "https://badaga.co/badagas-origin/",
    desc: "French linguistic scholar demonstrating Badaga as a separate South Dravidian language",
  },
  {
    title: "Census of India, Nilgiris District",
    url: "https://censusindia.gov.in",
    desc: "Population records of the Badaga community from 1812 to present",
  },
];

export default function OriginsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-badaga-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-badaga-tea text-sm font-semibold uppercase tracking-widest mb-3">
            Origins
          </span>
          <h2 className="text-4xl font-serif font-bold text-badaga-bark mb-4">
            Indigenous People of the Nilgiris
          </h2>
          <p className="text-badaga-earth max-w-3xl mx-auto leading-relaxed">
            The Badagas are one of the indigenous tribal communities of the Nilgiri Hills, their roots in these mountains run deep, shaped by centuries of history, migration, and an unbreakable bond with the land.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          {/* Main narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5 text-badaga-earth leading-relaxed"
          >
            <p>
              The <strong className="text-badaga-bark">Badagas</strong>, whose name is widely understood to mean <em>"northerners"</em> in the Badaga language, are recognised as one of the indigenous tribal communities of the Nilgiri Hills of Tamil Nadu, India. Together with the Toda, Kota, and Kurumba peoples, they form the ancient hill tribes of this unique highland ecosystem.
            </p>
            <p>
              Historical scholarship offers two broad theories of Badaga origins. The conventional view, recorded by early British administrators, holds that the Badagas migrated from the Mysore plateau (present-day Karnataka) in waves between the 14th and 17th centuries, first during the raid of Malik Kafir around 1311 AD, and later following the fall of the Vijayanagar empire in 1565. Under this theory, "northerners" describes their geographical origin relative to the Tamil plains.
            </p>
            <p>
              A competing and compelling body of evidence argues that the Badagas have inhabited the Nilgiri Hills for <strong className="text-badaga-bark">thousands of years</strong>, like the Toda and Kotha communities. Researcher B. Balasubramaniam and others point out that ancient <em>Sangam</em>-period Tamil texts contain references to <em>"Vadugar"</em> peoples associated with the northern hills, a term potentially cognate with Badaga. The presence of "Badaga-Varu" references in ancient Kannada and Tamil literature suggests a far older connection to these highlands.
            </p>
            <p>
              French linguistic scholar <strong className="text-badaga-bark">Christiane Pilot-Raichoor</strong> conducted pioneering research demonstrating that the Badaga language is <em>not</em> a dialect of Kannada, but a distinct, independent South Dravidian language with archaic phonological and grammatical features. Its connections to the Alu Kurumba language, another Nilgiri tribe, point to deep, ancient linguistic roots in the hills themselves, supporting the case for long-standing indigenous presence.
            </p>
            <p>
              Today, the Badagas number approximately <strong className="text-badaga-bark">4 lakh (400,000)</strong> people, a remarkable growth from just 2,207 recorded in 1812 and 34,178 in 1901, and remain the most numerous of the Nilgiri indigenous communities. They maintain a unique symbiotic relationship with neighbouring hill tribes: the Toda, Kota, and Kurumba, a relationship of mutual exchange and ceremony that structured Nilgiri society for centuries.
            </p>
          </motion.div>

          {/* Timeline + key facts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-serif font-bold text-badaga-bark text-lg mb-4">Key Historical Milestones</h3>
            {[
              { period: "Ancient, Sangam era", fact: "References to 'Vadugar' hill peoples in Sangam-period Tamil literature, possibly the earliest historical mention of Badaga ancestors." },
              { period: "c. 1311 AD", fact: "Malik Kafir's raid into the Deccan; one theory places a Badaga migration into the Nilgiris around this period to escape conflict." },
              { period: "1565 AD", fact: "Fall of the Vijayanagar empire; scholars record another wave of migration from the Mysore plateau into the Nilgiri highlands." },
              { period: "1812", fact: "First British census records 2,207 Badagas, the earliest reliable population figure." },
              { period: "1858", fact: "First Christian missions reach Badaga villages; gradual literacy and education begin." },
              { period: "1901", fact: "Population reaches 34,178, a 15-fold increase in under a century." },
              { period: "Present", fact: "~4 lakh Badagas across 312+ hattis in 4 seemae; thousands of graduates, professionals, and community leaders." },
            ].map((item) => (
              <div key={item.period} className="flex gap-4 bg-white rounded-xl p-4 border border-badaga-earth/15">
                <div className="flex-shrink-0 w-28 text-xs font-semibold text-badaga-tea pt-0.5">{item.period}</div>
                <p className="text-sm text-badaga-earth leading-relaxed">{item.fact}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-serif font-semibold text-badaga-bark mb-4 text-sm uppercase tracking-widest">
            Sources & References
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-badaga-earth/20 hover:border-badaga-tea/50 hover:shadow-sm transition-all group"
              >
                <ExternalLink className="w-4 h-4 text-badaga-tea flex-shrink-0 mt-0.5 group-hover:text-badaga-forest" />
                <div>
                  <p className="text-sm font-semibold text-badaga-bark group-hover:text-badaga-tea transition-colors">{s.title}</p>
                  <p className="text-xs text-badaga-earth/70 mt-0.5">{s.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
