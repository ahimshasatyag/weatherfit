import type { OutfitRequestParams } from '../types/outfit.types'

export const buildGeminiPrompt = (params: OutfitRequestParams): string => {
  const { temperature, condition, gender = 'unisex', style = 'casual' } = params;
  
  return `You are an expert AI fashion stylist. 
Based on the following conditions, recommend a ${style} outfit for a ${gender}.
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
