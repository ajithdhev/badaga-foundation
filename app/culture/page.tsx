import SectionHero from "@/components/ui/SectionHero";
import { festivals } from "@/data/culture";
import { dishes } from "@/data/food";
import { dressForms } from "@/data/dance";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badaga Culture, Food & Dress",
  description: "Explore the rich culture of the Badaga people: sacred festivals, traditional food, and authentic dress. Hethai Habba, Dodda Habba, Maari Habba, Lakishabba, Badaga cuisine and clothing.",
  keywords: ["Badaga culture", "Hethai Habba", "Badaga festivals", "Badaga food", "Badaga dress", "Thundu", "Mundu", "Seelai", "Mandarae"],
};

const categoryColors: Record<string, string> = {
  Main: "bg-orange-100 text-orange-800",
  Snack: "bg-yellow-100 text-yellow-800",
  Dessert: "bg-pink-100 text-pink-800",
  Beverage: "bg-blue-100 text-blue-800",
  "Festival Special": "bg-amber-100 text-amber-800",
};

type DressItem = { name: string; badagaName?: string; description: string };

export default function CulturePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Badaga Culture, Food & Dress",
    description: "A comprehensive guide to Badaga culture including festivals, traditional food, and authentic dress.",
    about: { "@type": "Thing", name: "Badaga culture", description: "The cultural practices, festivals, food traditions, and dress of the Badaga people of the Nilgiri Hills, India" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <SectionHero
        title="Culture, Food & Dress"
        subtitle="From sacred festivals to traditional cuisine and authentic garments, the Badagas carry a living heritage as rich and layered as the Nilgiri Hills themselves."
        breadcrumbs={[{ label: "Culture" }]}
        emoji="🏛️"
        gradient="from-amber-800 to-badaga-bark"
      />

      {/* ── FESTIVALS ─────────────────────────────────────────────── */}
      <section id="festivals" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-badaga-bark mb-2 text-center">
            Sacred Festivals
          </h2>
          <p className="text-center text-badaga-earth mb-10 max-w-2xl mx-auto">
            Badaga festivals are not mere celebrations: they are the living heartbeat of community identity, performed with the same rituals for centuries.
          </p>

          <div className="space-y-6">
            {festivals.map((festival, i) => (
              <article
                key={festival.id}
                className="bg-badaga-cream rounded-2xl p-6 sm:p-8 border border-badaga-earth/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-badaga-gold/20 text-badaga-gold font-serif font-bold text-xl flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-serif font-bold text-badaga-bark text-xl">{festival.name}</h3>
                      {festival.nameBadaga && (
                        <span className="text-sm text-badaga-earth/60">{festival.nameBadaga}</span>
                      )}
                      {festival.month && (
                        <span className="text-xs bg-badaga-tea/10 text-badaga-tea px-3 py-0.5 rounded-full">
                          {festival.month}
                        </span>
                      )}
                    </div>
                    <p className="text-badaga-earth leading-relaxed mb-4">{festival.description}</p>
                    <div className="mb-3">
                      <h4 className="font-semibold text-badaga-bark text-sm mb-2">Key Rituals:</h4>
                      <ul className="space-y-1">
                        {festival.rituals.map((ritual) => (
                          <li key={ritual} className="text-sm text-badaga-earth flex items-start gap-2">
                            <span className="text-badaga-gold mt-0.5">•</span>
                            {ritual}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-badaga-forest/10 rounded-lg p-3 border-l-4 border-badaga-tea">
                      <p className="text-sm text-badaga-bark italic">{festival.significance}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOD ──────────────────────────────────────────────────── */}
      <section id="food" className="py-16 bg-badaga-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-badaga-bark mb-2 text-center">
            Traditional Food
          </h2>
          <p className="text-center text-badaga-earth mb-10 max-w-2xl mx-auto">
            Rooted in the fertile Nilgiri soil, Badaga cuisine is hearty, wholesome, and deeply seasonal, every dish tells a story.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish) => (
              <article
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden border border-badaga-earth/20 hover:shadow-lg transition-all hover:border-badaga-gold/50 group"
              >
                <div className="bg-gradient-to-br from-badaga-gold/20 to-badaga-earth/20 flex items-center justify-center py-8 text-6xl group-hover:scale-105 transition-transform">
                  {dish.emoji}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif font-bold text-badaga-bark text-lg">{dish.name}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ml-2 ${categoryColors[dish.category]}`}>
                      {dish.category}
                    </span>
                  </div>
                  <p className="text-badaga-earth text-sm leading-relaxed mb-4">{dish.description}</p>
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-badaga-bark/60 uppercase tracking-wide mb-1.5">
                      Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {dish.ingredients.map((ing) => (
                        <span key={ing} className="text-xs bg-badaga-cream border border-badaga-earth/20 text-badaga-earth px-2 py-0.5 rounded-full">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                  {dish.occasion && (
                    <p className="text-xs text-badaga-tea/80 italic border-t border-badaga-earth/10 pt-3">
                      {dish.occasion}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRESS ─────────────────────────────────────────────────── */}
      <section id="dress" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-badaga-bark mb-2 text-center">
            Traditional Dress
          </h2>
          <p className="text-center text-badaga-earth mb-4 max-w-2xl mx-auto">
            Each garment in the Badaga wardrobe has a name, a purpose, and a story.
          </p>

          {/* Glossary strip */}
          <div className="bg-badaga-bark rounded-xl py-4 px-6 mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {[
              { label: "Thundu", sub: "Women: Upper cloth" },
              { label: "Mundu", sub: "Women: Lower wrap" },
              { label: "Mandae Paatu", sub: "Women: Head cloth (red ribbon)" },
              { label: "Seelai", sub: "Men: Shoulder shawl" },
              { label: "Mandarae", sub: "Men: Head turban" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <span className="font-serif font-bold text-badaga-gold text-base">{item.label}</span>
                <p className="text-badaga-cream/50 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Women */}
            <div>
              <div className="bg-rose-50 rounded-2xl p-4 mb-5 text-center border border-rose-100">
                <span className="text-5xl">👩‍🦱</span>
                <h3 className="text-xl font-serif font-bold text-badaga-bark mt-3">
                  {dressForms.women.name}
                </h3>
              </div>
              <div className="space-y-4">
                {(dressForms.women.items as DressItem[]).map((item) => (
                  <div key={item.name} className="bg-badaga-cream rounded-xl p-5 border border-rose-200 hover:shadow-sm transition-shadow">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h4 className="font-serif font-bold text-badaga-bark text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block flex-shrink-0" />
                        {item.name}
                      </h4>
                      {item.badagaName && (
                        <span className="text-sm text-badaga-earth/60">{item.badagaName}</span>
                      )}
                    </div>
                    <p className="text-badaga-earth text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Men */}
            <div>
              <div className="bg-blue-50 rounded-2xl p-4 mb-5 text-center border border-blue-100">
                <span className="text-5xl">👨‍🦱</span>
                <h3 className="text-xl font-serif font-bold text-badaga-bark mt-3">
                  {dressForms.men.name}
                </h3>
              </div>
              <div className="space-y-4">
                {(dressForms.men.items as DressItem[]).map((item) => (
                  <div key={item.name} className="bg-badaga-cream rounded-xl p-5 border border-blue-200 hover:shadow-sm transition-shadow">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h4 className="font-serif font-bold text-badaga-bark text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block flex-shrink-0" />
                        {item.name}
                      </h4>
                      {item.badagaName && (
                        <span className="text-sm text-badaga-earth/60">{item.badagaName}</span>
                      )}
                    </div>
                    <p className="text-badaga-earth text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-12 bg-badaga-forest text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-badaga-cream mb-3">
            Know More About Badaga Culture?
          </h2>
          <p className="text-badaga-cream/70 mb-6">
            Help us document festivals, recipes, customs, and traditions that have not been recorded yet.
          </p>
          <a
            href="/submit"
            className="inline-block px-8 py-3 bg-badaga-gold text-badaga-bark font-bold rounded-xl hover:bg-badaga-gold/90 transition-colors"
          >
            Share Your Knowledge
          </a>
        </div>
      </section>
    </>
  );
}
