// Mock AI Service for Smart Outfit Generation

export interface AIGenerateRequest {
  weatherCondition: string
  temperature: number
  gender: 'Male' | 'Female' | 'Unisex'
  occasion: 'Casual' | 'Formal' | 'Sport' | 'Party'
  stylePreference: string
}

export interface AIOutfitRecommendation {
  top: string
  bottom: string
  footwear: string
  accessories: string[]
  reasoning: string
  colorPalette: {
    name: string
    colors: string[]
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const aiApi = {
  /**
   * Simulates an AI backend processing weather and user preferences 
   * to generate a tailored outfit recommendation.
   */
  async generateOutfit(request: AIGenerateRequest): Promise<AIOutfitRecommendation> {
    // Simulate network delay for AI processing (1.5 - 2.5 seconds)
    await sleep(1500 + Math.random() * 1000)

    const isHot = request.temperature > 25
    const isCold = request.temperature < 15
    const isRainy = request.weatherCondition.toLowerCase().includes('rain')

    let top = 'Classic T-Shirt'
    let bottom = 'Denim Jeans'
    let footwear = 'Sneakers'
    let accessories = ['Sunglasses']
    let paletteName = 'Everyday Neutrals'
    let colors = ['#f8fafc', '#94a3b8', '#0f172a']

    // Basic AI Rules Simulation
    if (isHot) {
      top = request.occasion === 'Formal' ? 'Linen Button-down' : 'Breathable Graphic Tee'
      bottom = request.occasion === 'Formal' ? 'Lightweight Chinos' : 'Comfortable Shorts'
      footwear = request.occasion === 'Formal' ? 'Loafers' : 'Canvas Sneakers'
      paletteName = 'Summer Breeze'
      colors = ['#fdf4ff', '#fbcfe8', '#db2777', '#831843']
    } else if (isCold) {
      top = request.occasion === 'Formal' ? 'Turtleneck Sweater + Blazer' : 'Heavyweight Hoodie'
      bottom = 'Wool Trousers'
      footwear = 'Leather Boots'
      accessories = ['Beanie', 'Scarf']
      paletteName = 'Winter Earth'
      colors = ['#fef3c7', '#d97706', '#78350f', '#451a03']
    }

    if (isRainy) {
      top += ' + Water-resistant Jacket'
      footwear = 'Waterproof Boots'
      accessories.push('Umbrella')
      paletteName = 'Rainy Mood'
      colors = ['#f1f5f9', '#94a3b8', '#334155', '#0f172a']
    }

    return {
      top,
      bottom,
      footwear,
      accessories,
      reasoning: `Based on the ${request.temperature}°C ${request.weatherCondition} weather, a ${request.stylePreference} ${request.occasion} look is best achieved with breathable yet protective layers.`,
      colorPalette: {
        name: paletteName,
        colors
      }
    }
  }
}
