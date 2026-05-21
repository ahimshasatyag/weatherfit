export interface ExploreOutfit {
  id: string;
  name: string;
  category: 'streetwear' | 'casual' | 'formal' | 'sporty' | 'vintage' | 'minimalist' | 'korean' | 'techwear';
  image: string;
  weather: 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'windy';
  style: string;
  gender: 'male' | 'female' | 'unisex';
  season: 'summer' | 'autumn' | 'winter' | 'spring';
  activity: 'work' | 'travel' | 'gym' | 'date' | 'hangout';
  pieces: string[];
  rating: number;
  likes: number;
}

export interface Accessory {
  id: string;
  name: string;
  category: 'hat' | 'beanie' | 'glasses' | 'necklace' | 'bracelet' | 'watch' | 'bag' | 'belt' | 'ring' | 'scarf' | 'shoes';
  image: string;
  matchingStyles: string[];
  price: number;
  description?: string;
}

export interface FilterParams {
  search: string;
  category: string;
  color: string;
  season: string;
  gender: string;
  activity: string;
  weather: string;
  accessory: string;
}
