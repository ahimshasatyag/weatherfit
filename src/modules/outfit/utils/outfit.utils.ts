import type { OutfitRequestParams, OutfitRecommendation } from '../types/outfit.types'

export const buildGeminiPrompt = (params: OutfitRequestParams): string => {
  const { temperature, condition, gender = 'unisex', style = 'casual' } = params;
  
  return `You are an expert AI fashion stylist. 
Based on the following conditions, recommend a ${style} outfit for a ${gender} suitable for the weather.
Temperature: ${temperature}°C
Weather Condition: ${condition}

Return the recommendation strictly as a JSON object with the following structure (do not include markdown blocks like \`\`\`json or any other text, just the raw JSON):
{
  "top": "description of the top piece",
  "bottom": "description of the bottom piece",
  "shoes": "description of shoes",
  "accessories": ["accessory 1", "accessory 2"],
  "reasoning": "Brief explanation of why this outfit works for the weather"
}`;
}

export const getAestheticImageForPiece = (pieceName: string, category: 'top' | 'bottom' | 'shoes' | 'accessories'): string => {
  const name = pieceName.toLowerCase();
  
  if (category === 'top') {
    if (name.includes('hoodie') || name.includes('jacket') || name.includes('coat') || name.includes('sweater') || name.includes('outer') || name.includes('cardigan') || name.includes('windbreaker') || name.includes('anorak') || name.includes('parka')) {
      return 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('kemeja') || name.includes('shirt') || name.includes('blouse') || name.includes('dress') || name.includes('blazer') || name.includes('suit')) {
      return 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=600&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop'; // T-Shirt / Casual Top
  }
  
  if (category === 'bottom') {
    if (name.includes('jean') || name.includes('denim')) {
      return 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('skirt') || name.includes('rok') || name.includes('dress')) {
      return 'https://images.unsplash.com/photo-1583496661160-fb488653dfe5?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('cargo') || name.includes('jogger') || name.includes('track') || name.includes('sweatpants')) {
      return 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=600&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop'; // Trousers / Chinos
  }
  
  if (category === 'shoes') {
    if (name.includes('sneaker') || name.includes('run') || name.includes('sport') || name.includes('training') || name.includes('chunky')) {
      return 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('boot') || name.includes('chelsea') || name.includes('leather boot')) {
      return 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop'; // Loafers / Oxfords / Formal
  }
  
  if (category === 'accessories') {
    if (name.includes('bag') || name.includes('tas') || name.includes('backpack') || name.includes('tote') || name.includes('crossbody')) {
      return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('glasses') || name.includes('sun') || name.includes('kacamata')) {
      return 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop';
    }
    if (name.includes('watch') || name.includes('jam') || name.includes('smartwatch')) {
      return 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=600&auto=format&fit=crop'; // Hats / Belts / Scarves / Beanies
  }
  
  return 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop';
};

export const getLocalOutfitFallback = (params: OutfitRequestParams): OutfitRecommendation => {
  const { condition, style = 'casual', gender = 'unisex' } = params;
  const weather = condition.toLowerCase();
  
  if (style === 'streetwear') {
    if (weather.includes('rain') || weather.includes('cold') || weather.includes('cloud') || weather.includes('drizzle')) {
      return {
        top: 'Oversized Techwear Anorak Hoodie in Slate Black',
        bottom: 'Relaxed-Fit Heavy Cotton Cargo Pants with Utility Straps',
        shoes: 'Triple Black Chunky Platform Sneakers',
        accessories: ['Weatherproof Crossbody Chest Bag', 'Classic Ribbed Beanie in Charcoal Grey'],
        reasoning: 'Gaya streetwear techwear yang tebal memberikan perlindungan dari angin dingin dan rintik hujan ringan sembari menjaga siluet perkotaan yang modern dan trendi.'
      };
    } else {
      return {
        top: 'Heavyweight Graphic Boxy Tee with Drop-Shoulders in Off-White',
        bottom: 'Relaxed-Fit Distressed Denim Jeans in Light Acid Wash',
        shoes: 'Classic Canvas High-Top Sneakers in Cream',
        accessories: ['Distressed Vintage Baseball Cap', 'Silver Link Metal Chain', 'Canvas Tote Bag'],
        reasoning: 'Kombinasi streetwear kasual yang sangat nyaman dan bersirkulasi udara baik, sangat cocok untuk cuaca hangat dan eksplorasi perkotaan santai.'
      };
    }
  }
  
  if (style === 'formal') {
    if (weather.includes('rain') || weather.includes('cold') || weather.includes('cloud') || weather.includes('drizzle')) {
      return {
        top: 'Double-Breasted Wool Trench Coat layered over a Tailored Oxford Shirt',
        bottom: 'Slim-Fit Wool-Blend Dress Trousers in Charcoal Grey',
        shoes: 'Premium Water-Resistant Leather Chelsea Boots',
        accessories: ['Brushed Leather Belt', 'Minimalist Chronograph Watch with Leather Strap', 'Camel Cashmere Scarf'],
        reasoning: 'Lapisan blazer dan trench coat wol memberikan kehangatan prima dengan siluet tajam dan elegan, sangat tepat untuk rapat kerja dan komuter di cuaca dingin.'
      };
    } else {
      return {
        top: 'Structured Linen-Blend Blazer over a Breathable Cotton Dress Shirt',
        bottom: 'Slim-Fit Stretch Chino Trousers in Sand Beige',
        shoes: 'Burnished Suede Penny Loafers in Tan',
        accessories: ['Minimalist Leather Watch', 'Classic Acetate Tortoiseshell Sunglasses'],
        reasoning: 'Setelan formal semi-kasual berbahan linen yang ringan mencegah keringat berlebih di cuaca panas, namun tetap memancarkan aura profesional dan rapi.'
      };
    }
  }
  
  if (style === 'sporty') {
    if (weather.includes('rain') || weather.includes('cold') || weather.includes('cloud') || weather.includes('drizzle')) {
      return {
        top: 'Insulated Shield Windbreaker over a Moisture-Wicking Performance Long-Sleeve',
        bottom: 'Fleece-Lined Premium Athletic Joggers in Heather Grey',
        shoes: 'All-Weather Cushioning Trail Running Shoes with Vibram Outsole',
        accessories: ['Breathable Thermal Sports Headband', 'Smart Fitness Tracker'],
        reasoning: 'Pakaian olahraga fungsional yang tahan angin dan air, menjaga suhu tubuh tetap optimal saat berolahraga di luar ruangan di tengah cuaca dingin atau mendung.'
      };
    } else {
      return {
        top: 'Aero-Ready Sleeveless Training Tank or Lightweight Tee',
        bottom: 'Breathable Training Shorts with built-in compression lining',
        shoes: 'Ultra-Lightweight Mesh Running Shoes in Bright White',
        accessories: ['Lightweight Running Visor Hat', 'Ergonomic Water Flask', 'Moisture-Absorbing Wristbands'],
        reasoning: 'Sangat tipis, sejuk, dan memaksimalkan penguapan keringat di bawah sinar matahari langsung, ideal untuk sesi olahraga intensif atau lari pagi.'
      };
    }
  }
  
  // Default to Casual style
  if (weather.includes('rain') || weather.includes('cold') || weather.includes('cloud') || weather.includes('drizzle')) {
    return {
      top: 'Chunky Knit Cable Crewneck Sweater layered over a Basic Tee',
      bottom: 'Comfort-Stretch Classic Denim Jeans in Dark Indigo',
      shoes: 'Water-Resistant Classic Leather Boots in Dark Brown',
      accessories: ['Aesthetic Canvas Rucksack', 'Wool-Blend Knitted Beanie'],
      reasoning: 'Gaya kasual berlapis yang sangat hangat dan modis, memberikan perlindungan dari udara lembap hari yang hujan sembari menjaga kenyamanan Anda sepanjang hari.'
    };
  } else {
    return {
      top: 'Minimalist Lightweight Short-Sleeve Linen Shirt in Sage Green',
      bottom: 'Comfort-Fit Cotton Drawstring Shorts in Olive',
      shoes: 'Clean White Minimalist Leather Sneakers',
      accessories: ['Classic Black Round Sunglasses', 'Canvas Tote Bag with Minimalist typography'],
      reasoning: 'Pakaian harian yang santai, tipis, dan sangat modis, ideal untuk menikmati cuaca cerah di luar ruangan dengan kenyamanan total dan sirkulasi udara maksimal.'
    };
  }
};
