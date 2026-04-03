import SectionHero from "@/components/ui/SectionHero";
import { economyActivities, economyStats } from "@/data/economy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badaga Economy: Livelihoods, Tea Farming & Agriculture",
  description: "Learn about the Badaga economy: tea cultivation, potato farming, dairy, government service, and trade that sustain 4 lakh people across the Nilgiri Hills.",
  keywords: ["Badaga economy", "Nilgiri tea farming", "Badaga livelihoods", "Nilgiri potato", "Badaga agriculture"],
};

export default function EconomyPage() {
  return (
    <>
      <SectionHero
        title="Badaga Economy"
        subtitle="The Badagas have sustained themselves through the fertile bounty of the Nilgiri Hills for centuries. Tea, potatoes, dairy, and trade form the backbone of a community that is both rooted in tradition and adapted to modernity."
        breadcrumbs={[{ label: "Economy" }]}
        emoji="🌿"
        gradient="from-green-800 to-badaga-bark"
      />

      {/* Key stats */}
      <section className="bg-badaga-forest py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {economyStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-serif font-bold text-badaga-gold mb-1">{stat.value}</div>
                <div className="text-badaga-cream font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-badaga-cream/50 text-xs">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economy activities */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-badaga-bark text-center mb-3">
            Economic Activities
          </h2>
          <p className="text-center text-badaga-earth mb-12 max-w-2xl mx-auto">
            Badaga livelihoods have evolved over generations: from purely agricultural roots to a diverse modern economy while retaining the land as the primary source of identity and sustenance.
          </p>

          <div className="space-y-6">
            {economyActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-badaga-cream rounded-2xl p-6 border border-badaga-earth/20 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-shrink-0 text-5xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h3 className="font-serif font-bold text-badaga-bark text-xl">{activity.name}</h3>
                      {activity.percentage && (
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-badaga-earth/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-badaga-tea rounded-full"
                              style={{ width: `${activity.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-badaga-tea">{activity.percentage}%</span>
                        </div>
                      )}
                    </div>
                    <p className="text-badaga-earth leading-relaxed">{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
