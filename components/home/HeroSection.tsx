"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Users, MapPin, Factory, TrendingUp } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [ctcPrice, setCtcPrice] = useState<string>("...");

  useEffect(() => {
    fetch("/api/tea-rates", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data?.latestCoonoorCTC) setCtcPrice(`₹${data.latestCoonoorCTC}/kg`);
      })
      .catch(() => setCtcPrice("₹114.92/kg"));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-9">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-badaga-forest via-badaga-bark to-badaga-earth" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-badaga-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-badaga-tea/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-badaga-mist/5 rounded-full blur-3xl" />

      {/* Mountain silhouette SVG */}
      <div className="absolute bottom-0 left-0 right-0 opacity-20">
        <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,200 L0,120 L120,60 L240,100 L360,20 L480,80 L600,10 L720,70 L840,30 L960,90 L1080,40 L1200,100 L1320,50 L1440,110 L1440,200 Z" fill="#F5EDD6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-6"
        >
          <Logo size={120} className="drop-shadow-2xl" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-badaga-cream mb-6 leading-tight"
        >
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-badaga-gold to-badaga-tea">
            Badagas
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl text-badaga-cream/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
        >
          Indigenous people of the Nilgiri Hills, guardians of ancient traditions, masters of mountain agriculture, and keepers of a living cultural heritage.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { icon: Users, label: "~4 Lakh", sub: "Badaga population" },
            { icon: MapPin, label: "312+ Hattis", sub: "Across 4 seemae" },
            { icon: Factory, label: "90+ BLFs", sub: "Bought Leaf Factories, Nilgiris" },
            { icon: TrendingUp, label: ctcPrice, sub: "Coonoor CTC BOP avg (weekly)" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={sub} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
              <Icon className="w-5 h-5 text-badaga-gold flex-shrink-0" />
              <div className="text-left">
                <div className="text-badaga-cream font-semibold text-sm">{label}</div>
                <div className="text-badaga-cream/60 text-xs">{sub}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/villages"
            className="px-8 py-3 bg-badaga-gold text-badaga-bark font-semibold rounded-xl hover:bg-badaga-gold/90 transition-all hover:scale-105 active:scale-95"
          >
            Explore Hattis
          </Link>
          <Link
            href="/culture"
            className="px-8 py-3 bg-white/15 border border-white/30 text-badaga-cream font-semibold rounded-xl hover:bg-white/25 transition-all backdrop-blur-sm"
          >
            Discover Culture
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-1 text-badaga-cream/40 text-xs"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
