import type { Festival } from "@/types/badaga";

export const festivals: Festival[] = [
  {
    id: "fest1",
    name: "Hethai Habba",
    nameBadaga: "ஹேத்தை ஹப்பா",
    month: "January–February",
    description: "The most sacred and grand festival of the Badaga people, held in honour of the goddess Hethai: the protector deity of the Badaga community. Celebrated across all Badaga villages simultaneously, it brings the entire community together in prayer, music, and feasting.",
    rituals: [
      "Ritual purification bath at dawn",
      "Lighting of sacred oil lamps at the Hethai temple",
      "Community prayer with the village elder (Hetagaara)",
      "Offering of fresh Pongal rice and vegetables to the goddess",
      "Group singing of Hethai devotional songs",
      "Village procession with traditional music",
      "Community feast shared by all families",
    ],
    significance: "Hethai Habba reaffirms the spiritual identity of the Badaga people and their ancestral covenant with the goddess. It is also an occasion for resolving community disputes and renewing social bonds across villages.",
  },
  {
    id: "fest2",
    name: "Dodda Habba",
    nameBadaga: "ದೊಡ್ಡ ಹಬ್ಬ",
    month: "March–April",
    description: "The 'Great Festival': a major agricultural celebration marking the beginning of the planting season. Communities gather for multi-day celebrations involving folk dances, communal farming rituals, and thanksgiving to the earth goddess.",
    rituals: [
      "Ploughing of ceremonial first furrow by the village elder",
      "Sowing of first seeds with ritual incantations",
      "Community feast with traditional Badaga dishes",
      "Folk dance performances (Soppu and Thuda)",
      "Cattle decoration and worship",
    ],
    significance: "Dodda Habba marks the agricultural cycle's beginning and celebrates the community's relationship with the fertile Nilgiri soil that sustains Badaga livelihoods.",
  },
  {
    id: "fest3",
    name: "Maari Habba",
    month: "June–July",
    description: "Maari Habba is the Badaga festival of worship for Amman, the powerful goddess of rain, fertility, and protection. Celebrated across villages during the monsoon season, the entire community gathers to offer prayers to Amman, seeking her blessings for healthy rains, bountiful harvests, and protection from disease and calamity. Amman worship is a deeply revered tradition and Maari Habba is one of the most emotionally charged festivals in the Badaga calendar.",
    rituals: [
      "Ritual purification of the Amman shrine and surrounding area",
      "Offerings of kumkum, turmeric, coconut, flowers, and fruits to the goddess",
      "Special puja conducted by the village priest",
      "Community prayer for good monsoon rains and protection from illness",
      "Night vigil with rows of oil lamps lit before the deity",
      "Devotional singing and chanting in honour of Amman",
    ],
    significance: "Maari Habba is the community's sacred covenant with Amman, the mother goddess. The Badaga people believe that sincere collective worship of Amman ensures the protection of the village from epidemics, crop failure, and natural calamity. It is an expression of faith, gratitude, and community unity.",
  },
  {
    id: "fest4",
    name: "Lakishabba (Karthigai Deebam)",
    month: "November–December",
    description: "Lakishabba, celebrated during the auspicious Karthigai month, is the festival of lights for the Badaga community. Rows of earthen oil lamps are lit at home entrances, temple courtyards, and pathways, illuminating entire villages in a sea of flickering light. It corresponds with the pan-Indian Karthigai Deepam celebration.",
    rituals: [
      "Lighting of hundreds of earthen oil lamps at dusk",
      "Decorating home entrances with lamp rows",
      "Temple lamp-lighting ceremony",
      "Offering of sweet pongal and fruits at the shrine",
      "Community gathering around the temple bonfire",
    ],
    significance: "Lakishabba symbolises the victory of light over darkness. The collective lamp-lighting transforms Badaga villages into glowing beacons on the cold Nilgiri nights and is a deeply cherished community memory for every generation.",
  },
];

export const culturalFacts = [
  {
    title: "Badaga Language",
    content: "Badaga is a Southern Dravidian language closely related to Kannada, with distinct phonological features including retroflex sounds. It has approximately 400,000 native speakers and is recognised by UNESCO as a vulnerable language. The Badaga script uses Kannada characters.",
    icon: "🗣️",
  },
  {
    title: "Social Structure",
    content: "Badaga society is organised into four major divisions (habbus): Adhikari, Wodeya, Karhatta, and Kadu: each with distinct roles in the community. Historically, the Adhikari community managed political affairs, Wodeya managed rituals, Karhatta managed trade, and Kadu managed forest activities.",
    icon: "🏛️",
  },
  {
    title: "Sacred Groves",
    content: "Every Badaga village maintains a sacred grove (devarakadu): a protected forest area never cut or disturbed. These groves are centres of biodiversity and are home to the village deity. This ancient ecological wisdom preserved countless shola forest patches in the Nilgiris.",
    icon: "🌲",
  },
  {
    title: "Clan System",
    content: "The Badaga clan (kola) system traces lineage patrilineally. Marriage within the same kola is strictly forbidden. The clan names often describe ancestral occupations, village origins, or natural features: connecting families to the Nilgiri landscape.",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "Oral Tradition",
    content: "Before formal literacy, Badaga history, laws, and spiritual knowledge were preserved in elaborate oral traditions: songs, proverbs, and story cycles: passed from grandparents to grandchildren. Village elders (Hetagaaras) were custodians of this knowledge.",
    icon: "📖",
  },
  {
    title: "Architecture",
    content: "Traditional Badaga houses (manay) are distinctive: built in rows along a single street (ooru), with thick stone walls, low doorways (to prevent cold winds), and a central hearth. The architectural style reflects adaptation to the cold Nilgiri climate.",
    icon: "🏠",
  },
];
