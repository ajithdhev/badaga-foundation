import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import StatsBanner from "@/components/home/StatsBanner";
import SectionGrid from "@/components/home/SectionGrid";
import OriginsSection from "@/components/home/OriginsSection";
import ContributeSection from "@/components/home/ContributeSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badaga Nilgiris: Complete Guide to the Badaga People of the Nilgiri Hills",
  description:
    "Complete guide to the Badaga people of the Nilgiri Hills, India: villages by seemae, culture, food, dress, and economy.",
};

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who are the Badagas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Badagas are a community indigenous to the Nilgiri Hills of Tamil Nadu, India. With approximately 4 lakh people in 312+ villages, they are the most numerous of the Nilgiri tribal communities, known for their distinctive culture, language, tea farming, and festivals.",
        },
      },
      {
        "@type": "Question",
        name: "What language do Badaga people speak?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Badaga people speak the Badaga language, a Southern Dravidian language closely related to Kannada. It has approximately 400,000 native speakers and is written using Kannada script.",
        },
      },
      {
        "@type": "Question",
        name: "What is the main festival of the Badaga community?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Hethai Habba is the most sacred festival of the Badaga people, held in January–February to honour the goddess Hethai. It brings all Badaga villages together in prayer, music, community feasting, and cultural celebration.",
        },
      },
      {
        "@type": "Question",
        name: "Where do Badaga people live?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Badaga people live primarily in the Nilgiri Hills of Tamil Nadu, India, across five main regions: Ooty (Udhagamandalam), Kotagiri, Coonoor, Gudalur, and Kundah, at elevations ranging from 900 to 2637 metres above sea level.",
        },
      },
      {
        "@type": "Question",
        name: "What are Badaga people known for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Badaga people are known for their world-famous Nilgiri tea cultivation, premium potato and vegetable farming, rich folk music traditions, sacred Hethai festivals, distinctive nine-yard saree draping style, and ancient community governance systems.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroSection />
      <IntroSection />
      <OriginsSection />
      <StatsBanner />
      <SectionGrid />
      <ContributeSection />
    </>
  );
}
