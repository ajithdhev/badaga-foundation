import type { DanceForm } from "@/types/badaga";

export const danceForms: DanceForm[] = [
  {
    id: "d1",
    name: "Soppu Dance",
    description: "The most iconic Badaga folk dance, performed by women during the Hethai festival and major celebrations. Dancers carry fresh green foliage (soppu) on their heads and move in circular formations, their colourful traditional dress swirling as they dance. The dance celebrates the fertility of the land and the goddess's blessing.",
    performers: "Women",
    occasion: "Hethai Habba festival; major celebrations; weddings",
    instruments: ["Kolattam sticks", "Tavil (drum)", "Nadaswaram (wind instrument)"],
  },
  {
    id: "d2",
    name: "Thuda Dance",
    description: "A vigorous men's dance performed at festivals and weddings, characterised by rhythmic stamping, arm swings, and energetic group formations. Dancers often form lines that advance and retreat in synchronised movement, symbolising the community's unity and strength.",
    performers: "Men",
    occasion: "Weddings; Dodda Habba; community celebrations",
    instruments: ["Tavil (drum)", "Dhol", "Cymbals"],
  },
  {
    id: "d3",
    name: "Kolattam",
    description: "A stick dance performed with decorated wooden sticks, where dancers form circles and create intricate patterns by striking their sticks against those of neighbouring dancers. The click of sticks creates a rhythmic percussion accompaniment. Performed by both men and women, sometimes simultaneously in separate circles.",
    performers: "Both",
    occasion: "Festivals; cultural events; school competitions",
    instruments: ["Decorated wooden sticks (kolattam sticks)", "Tavil drum", "Singing"],
  },
  {
    id: "d4",
    name: "Kummi",
    description: "A graceful circle dance performed by women, involving rhythmic clapping in sync with folk singing. No instruments are used: the clapping and singing create the music. Women stand in a circle, clapping in complex rhythmic patterns while rotating and singing traditional Badaga songs.",
    performers: "Women",
    occasion: "Weddings; women's festivals; informal celebrations",
    instruments: ["Clapping (no instruments: voice and hands only)"],
  },
  {
    id: "d5",
    name: "Kaavadi Dance",
    description: "A devotional dance performed during temple festivals, where participants carry decorated arched frames (kaavadi) on their shoulders as an act of devotion to the deity. The dance involves rhythmic steps and swaying, often accompanied by devotional singing. An act of both physical discipline and spiritual dedication.",
    performers: "Men",
    occasion: "Hethai temple festivals; devotional occasions",
    instruments: ["Nadaswaram", "Tavil drum", "Bells"],
  },
  {
    id: "d6",
    name: "Nande Dance",
    description: "A lesser-known but ancient Badaga ceremonial dance performed only during specific ancestral worship ceremonies. The movements are slow and meditative, with participants moving in a spiral formation believed to connect the living with ancestral spirits. Only performed by initiated community elders.",
    performers: "Both",
    occasion: "Keel Ooru Habba (ancestral worship festivals)",
    instruments: ["Traditional Badaga flute (murali)", "Hand bells", "Chanting"],
  },
];

export const dressForms = {
  women: {
    name: "Badaga Women's Traditional Dress",
    items: [
      {
        name: "Thundu",
        badagaName: "துண்டு",
        description: "The Thundu is the essential upper-body cloth of Badaga women: a length of plain white or off-white cotton fabric draped across the upper body and shoulders. In traditional daily wear, the Thundu serves both as modesty cover and as protection from the cold Nilgiri winds. During festivals and ceremonies it may be replaced with a finely woven cloth with coloured borders. The Thundu is also used as a head covering during worship, draped loosely over the hair as a mark of reverence when entering a temple or shrine.",
      },
      {
        name: "Mundu",
        badagaName: "முண்டு",
        description: "The Mundu is the lower-body wrap worn by Badaga women: a length of white or undyed cotton fabric wrapped around the waist and falling to the ankle. Unlike the draped saree style of other South Indian communities, the Badaga Mundu is wrapped and tucked firmly at the waist, allowing ease of movement during farmwork on the steep Nilgiri hillsides. For festivals and weddings, the Mundu is replaced with a finer cloth in dark blue, maroon, or forest green featuring a gold or coloured woven border.",
      },
      {
        name: "Mandae Paatu",
        badagaName: "மண்டே பாட்டு",
        description: "Mandae Paatu is the traditional head cloth of Badaga women, characteristically distinguished by a red ribbon. It is tied or draped over the head and is a mark of an elderly woman's identity in the community. The Mandae Paatu is worn at all festivals, ceremonies, and auspicious occasions, the red ribbon is its most defining feature, making it instantly recognisable as a uniquely Badaga garment.",
      },
    ],
  },
  men: {
    name: "Badaga Men's Traditional Dress",
    items: [
      {
        name: "Seelai",
        badagaName: "சீலை",
        description: "The Seelai is the shoulder shawl of Badaga men, a length of white cotton cloth draped over the shoulders and upper body. On ceremonial occasions, the Seelai is a fine white cloth with a coloured or gold-thread border. It is worn with pride at festivals, community gatherings, and temple ceremonies, signifying a man's participation in community life.",
      },
      {
        name: "Mandarae",
        badagaName: "மண்டரே",
        description: "The Mandarae is the traditional head turban of Badaga men, a length of white or cream-coloured cloth wrapped around the head. Senior men and community leaders wear the Mandarae on ceremonial occasions, festivals, and community gatherings. The turban signals authority, elder status, and ritual participation. The style of tying varies by occasion and village.",
      },
    ],
  },
};
