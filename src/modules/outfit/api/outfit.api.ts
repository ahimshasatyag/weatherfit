import axios from 'axios';
import { buildGeminiPrompt } from '../utils/outfit.utils';
import type { OutfitRequestParams, OutfitRecommendation } from '../types/outfit.types';

const OUTFIT_API_KEY = import.meta.env.VITE_OUTFIT_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

// Jika menggunakan proxy/layanan pihak ketiga seperti Andora AI, Anda bisa menambahkan VITE_OUTFIT_API_URL di .env
// Jika tidak ada, maka secara default akan menggunakan URL resmi dari Google Gemini
const BASE_URL = import.meta.env.VITE_OUTFIT_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
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

    const textResponse = response.data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    const recommendation: OutfitRecommendation = JSON.parse(textResponse);
    return recommendation;
  } catch (error) {
    console.error('Error fetching outfit recommendation:', error);
    throw new Error('Gagal mendapatkan rekomendasi outfit dari AI.');
  }
}
