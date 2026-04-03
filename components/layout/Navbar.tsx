"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Home } from "lucide-react";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-badaga-bark/95 backdrop-blur-md shadow-lg"
          : "bg-badaga-bark/85 backdrop-blur-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-badaga-cream font-serif font-bold text-lg hover:text-badaga-gold transition-colors"
          >
            <Logo size={36} className="flex-shrink-0 rounded-full" />
            <span className="hidden sm:inline">{SITE_NAME}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={cn(
                "px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1.5",
                pathname === "/"
                  ? "bg-badaga-tea text-white"
                  : "text-badaga-cream/90 hover:text-badaga-gold hover:bg-white/10"
              )}
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            {NAV_ITEMS.slice(0, -1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-badaga-tea text-white"
                    : "text-badaga-cream/90 hover:text-badaga-gold hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/submit"
              className="ml-2 px-4 py-1.5 bg-badaga-gold text-badaga-bark rounded font-medium text-sm hover:bg-badaga-gold/90 transition-colors"
            >
              Contribute
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-badaga-cream p-2 rounded hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-badaga-bark/98 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <Link
              href="/"
              className={cn(
                "px-4 py-3 rounded text-sm font-medium transition-colors flex items-center gap-2",
                pathname === "/"
                  ? "bg-badaga-tea text-white"
                  : "text-badaga-cream/90 hover:text-badaga-gold hover:bg-white/10"
              )}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-3 rounded text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-badaga-tea text-white"
                    : "text-badaga-cream/90 hover:text-badaga-gold hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
