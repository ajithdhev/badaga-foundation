"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface SectionHeroProps {
  title: string;
  subtitle: string;
  breadcrumbs: Breadcrumb[];
  gradient?: string;
  emoji?: string;
}

export default function SectionHero({
  title,
  subtitle,
  breadcrumbs,
  gradient = "from-badaga-forest to-badaga-bark",
  emoji,
}: SectionHeroProps) {
  return (
    <section className={`relative bg-gradient-to-br ${gradient} pt-36 pb-16 overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 50%, rgba(196,151,58,0.4) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(74,124,47,0.4) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm text-badaga-cream/60 mb-6">
          <Link href="/" className="hover:text-badaga-gold transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-badaga-gold transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-badaga-cream/90">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {emoji && <div className="text-5xl mb-4">{emoji}</div>}
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-badaga-cream mb-4">
            {title}
          </h1>
          <p className="text-lg text-badaga-cream/80 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
