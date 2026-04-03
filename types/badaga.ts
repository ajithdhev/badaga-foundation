export interface Village {
  id: string;
  name: string;
  nameBadaga?: string;
  region: "Ooty" | "Coonoor" | "Gudalur" | "Kotagiri" | "Kundah" | "Udhagamandalam";
  taluk: string;
  elevationMeters?: number;
  estimatedPopulation?: number;
  primaryOccupation?: string[];
  notableFeatures?: string;
}

export interface Hatti {
  id: string;
  name: string;
  seemai: string;
  mapsUrl?: string;
  userAdded?: boolean;
}

export interface SeemaiData {
  id: string;
  name: string;
  aliases?: string;
  description: string;
  hatties: string[];
}

export interface FamousPerson {
  id: string;
  name: string;
  birthYear?: number;
  deathYear?: number;
  field: "Literature" | "Politics" | "Arts" | "Sports" | "Social Reform" | "Education" | "Science" | "Music" | "Law";
  bio: string;
  achievements: string[];
  village?: string;
}

export type SongGenre =
  | "Hettai"
  | "Habba"
  | "Melody"
  | "Sad"
  | "Wedding"
  | "Lullaby"
  | "Devotional";

export interface Song {
  id: string;
  title: string;
  titleBadaga?: string;
  genre: SongGenre;
  occasion?: string;
  lyrics?: string;
  meaning?: string;
  description: string;
  audioUrl?: string;
  demoAvailable?: boolean;
  initialRank: number;
  artist?: string;
  duration?: string;
}

export interface Dish {
  id: string;
  name: string;
  nameBadaga?: string;
  category: "Main" | "Snack" | "Dessert" | "Beverage" | "Festival Special";
  description: string;
  ingredients: string[];
  occasion?: string;
  emoji: string;
}

export interface DanceForm {
  id: string;
  name: string;
  description: string;
  performers: "Men" | "Women" | "Both";
  occasion: string;
  instruments: string[];
}

export interface WeddingRitual {
  step: number;
  name: string;
  nameBadaga?: string;
  timing: "Pre-wedding" | "Wedding day" | "Post-wedding";
  description: string;
  significance: string;
}

export interface Festival {
  id: string;
  name: string;
  nameBadaga?: string;
  month?: string;
  description: string;
  rituals: string[];
  significance: string;
}

export interface EconomyActivity {
  id: string;
  name: string;
  description: string;
  percentage?: number;
  icon: string;
}
