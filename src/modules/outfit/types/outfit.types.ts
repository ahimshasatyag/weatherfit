export interface OutfitRecommendation {
  top: string;
  bottom: string;
  shoes: string;
  accessories: string[];
  reasoning: string;
}

export interface OutfitRequestParams {
  temperature: number;
  condition: string; // e.g., "Rainy", "Sunny", "Cloudy"
  gender?: 'male' | 'female' | 'unisex';
  style?: 'casual' | 'formal' | 'sporty' | 'streetwear';
}
