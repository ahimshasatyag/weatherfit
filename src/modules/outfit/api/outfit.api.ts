import axios from 'axios';
import { buildGeminiPrompt } from '../utils/outfit.utils';
import type { OutfitRequestParams, OutfitRecommendation } from '../types/outfit.types';

const BASE_URL = import.meta.env.VITE_OUTFIT_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Helper to select the correct API key based on the URL context
const getAppropriateApiKey = (): string | undefined => {
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const outfitKey = import.meta.env.VITE_OUTFIT_API_KEY;
  
  const isOfficialGoogle = BASE_URL.includes('generativelanguage.googleapis.com');
  
  if (isOfficialGoogle) {
    // Official Google Gemini API requires a key starting with 'AIzaSy'
    if (geminiKey && geminiKey.trim().startsWith('AIzaSy')) {
      return geminiKey.trim();
    }
    if (outfitKey && outfitKey.trim().startsWith('AIzaSy')) {
      return outfitKey.trim();
    }
  }
  
  // Custom endpoints/proxies prefer the specific outfit key
  return (outfitKey || geminiKey)?.trim();
};

const OUTFIT_API_KEY = getAppropriateApiKey();
const OUTFIT_API_URL = `${BASE_URL}?key=${OUTFIT_API_KEY}`;

export const fetchOutfitRecommendation = async (params: OutfitRequestParams): Promise<OutfitRecommendation> => {
  if (!OUTFIT_API_KEY) {
    throw new Error('Outfit API Key is missing. Please check your .env file.');
  }

  const prompt = buildGeminiPrompt(params);

  try {
    const response = await axios.post(OUTFIT_API_URL, {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      }
    });

    if (!response.data || !response.data.candidates || response.data.candidates.length === 0) {
      throw new Error('Respons AI tidak mengandung kandidat rekomendasi.');
    }

    let textResponse = response.data.candidates[0].content.parts[0].text.trim();
    
    // Safely strip markdown code block wraps if the AI generates them despite the settings
    if (textResponse.startsWith('```json')) {
      textResponse = textResponse.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (textResponse.startsWith('```')) {
      textResponse = textResponse.replace(/^```/, '').replace(/```$/, '').trim();
    }

    // Parse the JSON response
    const recommendation: OutfitRecommendation = JSON.parse(textResponse);
    return recommendation;
  } catch (error: any) {
    console.error('Error fetching outfit recommendation from Gemini API:', error);
    throw new Error(error.response?.data?.error?.message || error.message || 'Gagal mendapatkan rekomendasi outfit dari AI.');
  }
}
