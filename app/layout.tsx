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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}, Culture, History & Heritage of the Badaga People`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Badaga", "Badaga people", "Nilgiris tribe", "Badaga culture", "Nilgiri Hills",
    "Badaga language", "Badaga villages", "Badaga community India", "Badaga food",
    "Badaga festivals", "Hethai Habba", "Badaga songs", "Badaga dance", "Badaga wedding",
    "Nilgiri Hills India", "tribal community Tamil Nadu",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: `${SITE_NAME}, Culture, History & Heritage`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-home.png", width: 1200, height: 630, alt: "Badaga People of the Nilgiris" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}, Badaga People of the Nilgiri Hills`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Badaga Nilgiris",
    url: SITE_URL,
    description: "Dedicated to preserving and celebrating the culture, history, and heritage of the Badaga people of the Nilgiri Hills, India.",
    areaServed: "Nilgiri Hills, Tamil Nadu, India",
    knowsAbout: ["Badaga culture", "Nilgiri Hills", "Tribal heritage", "Indian folk traditions"],
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
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
