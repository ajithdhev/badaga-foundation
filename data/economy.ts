import type { EconomyActivity } from "@/types/badaga";

export const economyActivities: EconomyActivity[] = [
  {
    id: "e1",
    name: "Tea Cultivation",
    icon: "🍃",
    description: "The backbone of the Badaga economy. The Nilgiri Hills produce some of India's finest teas, and Badaga farmers own and work in tea estates across Ooty, Coonoor, Kotagiri, and Gudalur. Nilgiri tea is celebrated globally for its bright colour and brisk, aromatic flavour.",
    percentage: 40,
  },
  {
    id: "e2",
    name: "Vegetable Farming",
    icon: "🥔",
    description: "The famous Nilgiri potato, grown at high altitudes, is a premium product sold across India. Badaga farmers also grow carrots, cabbage, beans, peas, beetroot, and other temperate vegetables that thrive in the Nilgiri climate.",
    percentage: 25,
  },
  {
    id: "e3",
    name: "Dairy & Cattle Rearing",
    icon: "🐄",
    description: "Badaga households traditionally maintain cattle for both milk and agricultural work. Nilgiri milk: especially from Badaga-owned buffalo and cows: is prized for its richness. Many families produce and sell fresh milk to local dairies and directly to consumers.",
    percentage: 10,
  },
  {
    id: "e4",
    name: "Government & Public Service",
    icon: "🏛️",
    description: "With increasing literacy rates and educational attainment, many Badaga individuals have entered government service, the armed forces, teaching, medicine, and engineering. The community has a strong tradition of public service and civic participation.",
    percentage: 12,
  },
  {
    id: "e5",
    name: "Trade & Commerce",
    icon: "🏪",
    description: "Badaga merchants are active across Nilgiri towns: running grocery stores, textile shops, hardware businesses, and transport companies. The community has adapted well to modern commerce while maintaining traditional trade ethics of fair dealing.",
    percentage: 8,
  },
  {
    id: "e6",
    name: "Horticulture & Floriculture",
    icon: "🌸",
    description: "Growing flowers (roses, chrysanthemums, gerberas) and fruit (plums, pears, avocados) for urban markets is an increasingly important income source. Several Badaga farmers supply flowers to cities across Tamil Nadu and Karnataka.",
    percentage: 5,
  },
];

export const economyStats = [
  { label: "Tea Estates", value: "800+", description: "Badaga-owned tea estates in the Nilgiris" },
  { label: "Annual Tea Production", value: "80 MLK kg", description: "Nilgiri district annual tea output" },
  { label: "Avg. Farm Size", value: "2–5 acres", description: "Typical Badaga family farm holding" },
  { label: "Literacy Rate", value: "~85%", description: "Among the highest in tribal communities" },
];
