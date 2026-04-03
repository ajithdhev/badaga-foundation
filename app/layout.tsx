import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";
import TeaTicker from "@/components/home/TeaTicker";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

const GA_ID = "G-DSL7GVS8J3";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Badagas of the Nilgiri Hills`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    // People & community
    "Badaga", "Badagas", "Badaga people", "Badaga community", "Nilgiris tribe",
    "Badaga culture", "Badaga heritage", "Badaga history", "Badaga Foundation",
    // Language
    "Badaga language", "Badaga language research", "South Dravidian language",
    // Geography
    "Nilgiri Hills", "Nilgiris", "Ooty", "Udhagamandalam", "Coonoor", "Kotagiri",
    "Gudalur", "Kundah", "Nilgiri Hills India", "Blue Mountains India",
    // Villages
    "Badaga villages", "Badaga hattis", "Badaga seemae", "Nilgiri villages",
    // Tea
    "Nilgiri tea", "tea price Nilgiris", "Coonoor tea auction", "CTC tea price",
    "tea auction India", "Nilgiri tea price weekly", "Ooty tea", "Coonoor CTC",
    // Festivals
    "Hethai Habba", "Dodda Habba", "Maari Habba", "Lakishabba", "Badaga festivals",
    // Food
    "Badaga food", "Badaga cuisine", "Koi Udhaka", "Erighittu", "Batthal",
    // Dress
    "Badaga dress", "Mandae Paatu", "Mandarae", "Seelai",
    // Economy
    "Badaga tea farming", "Badaga agriculture", "Nilgiri potato", "vegetable farming Nilgiris",
    // Tamil Nadu
    "tribal community Tamil Nadu", "Nilgiri tribal", "indigenous Nilgiris",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Badagas of the Nilgiri Hills`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1135, height: 928, alt: "The Badaga Foundation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Badagas of the Nilgiri Hills`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: SITE_URL },
  // Allow AI agents and crawlers
  other: {
    "X-Robots-Tag": "index, follow",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/villages?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Badaga Foundation",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: "Dedicated to preserving and celebrating the culture, history, and heritage of the Badagas of the Nilgiri Hills, India.",
    areaServed: {
      "@type": "Place",
      name: "Nilgiri Hills, Tamil Nadu, India",
      geo: { "@type": "GeoCoordinates", latitude: 11.4102, longitude: 76.6950 },
    },
    knowsAbout: [
      "Badaga culture and heritage",
      "Nilgiri Hills, Ooty, Coonoor, Kotagiri",
      "Nilgiri tea pricing and auction data",
      "Badaga villages and hattis",
      "Badaga language",
      "Badaga festivals — Hethai Habba, Dodda Habba, Maari Habba",
      "Badaga traditional food and dress",
      "Tea farming in the Nilgiris",
      "Indigenous tribal communities of Tamil Nadu",
    ],
  };

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: "Nilgiri Hills",
    alternateName: ["Nilgiris", "Blue Mountains", "Ooty", "Udhagamandalam"],
    description: "The Nilgiri Hills of Tamil Nadu, India — home of the Badaga people, world-famous Nilgiri tea, and unique highland biodiversity.",
    geo: { "@type": "GeoCoordinates", latitude: 11.4102, longitude: 76.6950 },
    containsPlace: [
      { "@type": "City", name: "Ooty (Udhagamandalam)" },
      { "@type": "City", name: "Coonoor" },
      { "@type": "City", name: "Kotagiri" },
      { "@type": "City", name: "Gudalur" },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google Analytics 4 — G-DSL7GVS8J3 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
        {/* Schema.org structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body className="min-h-screen flex flex-col pt-16">
        <Providers>
          <Navbar />
          <TeaTicker />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
