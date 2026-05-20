export interface OutfitCardItem {
  category: string;
  name: string;
  color: string;
  image: string;
}

export interface OutfitCard {
  items: OutfitCardItem[];
  recommendation: string;
}

export interface UserPreference {
  gender: 'Pria' | 'Wanita' | 'Unisex';
  age: number;
  stylePreference: 'Streetwear' | 'Casual' | 'Formal' | 'Sporty' | 'Vintage';
  favoriteColor: string;
  budget: 'Low' | 'Mid' | 'High';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  options?: string[];
  photoUrl?: string;
  base64Image?: string;
  isRegenerateable?: boolean;
  outfitCard?: OutfitCard;
}
