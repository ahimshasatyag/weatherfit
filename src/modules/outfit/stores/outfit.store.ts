import { defineStore } from 'pinia';
import { ref } from 'vue';
import { OutfitService } from '../services/outfit.service';
import type { OutfitRequestParams, OutfitRecommendation } from '../types/outfit.types';

export const useOutfitStore = defineStore('outfit', () => {
  const recommendation = ref<OutfitRecommendation | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getRecommendation = async (params: OutfitRequestParams) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await OutfitService.getRecommendation(params);
      recommendation.value = data;
    } catch (err: any) {
      error.value = err.message || 'Terjadi kesalahan saat memuat rekomendasi outfit';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const clearRecommendation = () => {
    recommendation.value = null;
    error.value = null;
  };

  return {
    recommendation,
    isLoading,
    error,
    getRecommendation,
    clearRecommendation
  };
});
