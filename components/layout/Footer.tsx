import Link from "next/link";
import { Heart } from "lucide-react";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-badaga-bark text-badaga-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-3">
              <Logo size={56} />
              <span className="text-badaga-cream font-serif font-bold text-lg">{SITE_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed text-badaga-cream/60">
              A comprehensive digital home for the Badaga people of the Nilgiri Hills, preserving culture, celebrating heritage, and connecting communities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif font-semibold text-badaga-gold mb-3">Explore</h3>
            <ul className="grid grid-cols-2 gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-badaga-cream/60 hover:text-badaga-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-serif font-semibold text-badaga-gold mb-3">About the Badagas</h3>
            <p className="text-sm text-badaga-cream/60 leading-relaxed">
              The Badagas are a community of the Nilgiri Hills, Tamil Nadu, India, known for their distinctive culture, language, and deep connection to the mountains they call home.
            </p>
            <Link
              href="/submit"
              className="inline-block mt-3 text-sm text-badaga-gold hover:underline"
            >
              Share your knowledge →
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-badaga-cream/40">
            © {new Date().getFullYear()} Badaga Nilgiris. All content for educational and cultural preservation purposes.
          </p>
          <p className="text-xs text-badaga-cream/40 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-badaga-gold" /> for the Badaga community
          </p>
        </div>
      </div>
    </footer>
  );
}
