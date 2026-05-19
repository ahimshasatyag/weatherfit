import type { OutfitRecommendation, FashionTip, TrendingOutfit } from '../types/home.types'

export const mockOutfitRecommendations: OutfitRecommendation[] = [
  {
    id: 'outfit-1',
    name: 'Oversized Hoodie & Cargo',
    category: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    price: 89.99,
    suitableFor: ['cloudy', 'cold', 'rainy']
  },
  {
    id: 'outfit-2',
    name: 'Linen Button-down Shirt',
    category: 'Casual',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=600&auto=format&fit=crop',
    price: 45.00,
    suitableFor: ['sunny']
  },
  {
    id: 'outfit-3',
    name: 'Waterproof Tech Jacket',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=600&auto=format&fit=crop',
    price: 120.00,
    suitableFor: ['rainy', 'cloudy']
  },
  {
    id: 'outfit-4',
    name: 'Tailored Trench Coat',
    category: 'Formal',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    price: 199.99,
    suitableFor: ['cold', 'rainy']
  }
]

export const mockFashionTips: FashionTip[] = [
  {
    id: 'tip-1',
    title: 'Layering is Key',
    description: 'When the weather is unpredictable, use the 3-layer rule: base layer for moisture, middle for insulation, and outer for protection.',
    icon: '👕'
  },
  {
    id: 'tip-2',
    title: 'Protect from UV',
    description: 'Even on cloudy days, UV rays can be high. Always wear sunglasses and apply sunscreen if the UV index is above 3.',
    icon: '🕶️'
  },
  {
    id: 'tip-3',
    title: 'Waterproof Essentials',
    description: 'Always keep a packable waterproof jacket or umbrella in your bag during rainy seasons.',
    icon: '☔'
  }
]

export const mockTrendingOutfits: TrendingOutfit[] = [
  {
    id: 'trend-1',
    title: 'Urban Explorer Set',
    brand: 'NorthPeak',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    likes: 1240
  },
  {
    id: 'trend-2',
    title: 'Minimalist Summer',
    brand: 'Aura',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop',
    likes: 3890
  },
  {
    id: 'trend-3',
    title: 'Cyberpunk Runner',
    brand: 'Y-Tech',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop',
    likes: 5120
  },
  {
    id: 'trend-4',
    title: 'Classic Vintage Denim',
    brand: 'Heritage',
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=600&auto=format&fit=crop',
    likes: 2750
  }
]
