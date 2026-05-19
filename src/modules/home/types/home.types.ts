export type WeatherCondition = 'sunny' | 'rainy' | 'cloudy' | 'cold'

export interface OutfitRecommendation {
  id: string
  name: string
  category: 'Casual' | 'Streetwear' | 'Sport' | 'Formal'
  image: string
  price: number
  suitableFor: WeatherCondition[]
}

export interface FashionTip {
  id: string
  title: string
  description: string
  icon: string
}

export interface TrendingOutfit {
  id: string
  title: string
  brand: string
  image: string
  likes: number
}
