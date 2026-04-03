import SectionHero from "@/components/ui/SectionHero";
import SubmitForm from "@/components/ui/SubmitForm";
import type { Metadata } from "next";
import { Shield, Heart, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Contribute to Badaga Nilgiris: Share Your Knowledge",
  description: "Help preserve Badaga culture by contributing songs, recipes, stories, village information, famous personalities, and festival details to the Badaga Nilgiris community archive.",
  keywords: ["contribute Badaga knowledge", "Badaga community archive", "share Badaga songs", "Badaga cultural preservation"],
};

export default function SubmitPage() {
  return (
    <>
      <SectionHero
        title="Contribute"
        subtitle="You are the living custodian of Badaga heritage. Help us build the most complete digital archive of Badaga culture: for your children, and their children."
        breadcrumbs={[{ label: "Contribute" }]}
        emoji="✍️"
        gradient="from-badaga-forest to-badaga-earth"
      />

      <section className="py-16 bg-badaga-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Why contribute */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {[
              { icon: Heart, title: "Preserve Heritage", desc: "Every song, recipe, and story you share ensures it won't be forgotten by future generations." },
              { icon: Star, title: "Be Recognised", desc: "Contributors are credited on every piece of content they help add to the archive." },
              { icon: Shield, title: "Trusted & Safe", desc: "All submissions are reviewed by our community editorial team before publication." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-5 border border-badaga-earth/20 text-center">
                <Icon className="w-8 h-8 text-badaga-tea mx-auto mb-3" />
                <h3 className="font-serif font-bold text-badaga-bark mb-2">{title}</h3>
                <p className="text-sm text-badaga-earth">{desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-badaga-earth/20 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-badaga-bark mb-2">Submit Your Contribution</h2>
            <p className="text-badaga-earth text-sm mb-8">
              Share knowledge about Badaga songs, food, famous people, villages, festivals, stories, or anything else related to Badaga culture. All contributions are welcome.
            </p>
            <SubmitForm />
          </div>

          {/* What we accept */}
          <div className="mt-10 bg-white rounded-2xl p-6 border border-badaga-earth/20">
            <h2 className="font-serif font-bold text-badaga-bark text-lg mb-4">What We Accept</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ["🎵", "Songs & Music", "Lyrics, translations, recordings, or descriptions of Badaga folk songs"],
                ["🍽️", "Recipes & Food", "Traditional Badaga recipes, ingredients, cooking methods, and food history"],
                ["⭐", "Notable Personalities", "Badaga individuals making a difference in any field"],
                ["🏘️", "Village Information", "History, population, notable features of Badaga villages"],
                ["🏛️", "Festivals & Rituals", "Descriptions, significance, and customs of Badaga festivals"],
                ["📖", "Stories & History", "Oral traditions, legends, historical events, and community memories"],
              ].map(([emoji, title, desc]) => (
                <div key={title} className="flex gap-3 p-3 rounded-lg hover:bg-badaga-cream transition-colors">
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                  <div>
                    <h3 className="font-medium text-badaga-bark text-sm">{title}</h3>
                    <p className="text-xs text-badaga-earth">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
