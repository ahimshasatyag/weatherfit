import { fetchOutfitRecommendation } from '../api/outfit.api';
import type { OutfitRequestParams, OutfitRecommendation } from '../types/outfit.types';

export class OutfitService {
  /**
   * Mengambil rekomendasi outfit dari API AI (Gemini)
   * Di sini Anda bisa menambahkan logika tambahan seperti caching atau validasi
   */
  static async getRecommendation(params: OutfitRequestParams): Promise<OutfitRecommendation> {
    try {
      const data = await fetchOutfitRecommendation(params);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
