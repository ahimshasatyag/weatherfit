import { defineStore } from 'pinia';
import { ref } from 'vue';
import { OutfitService } from '../services/outfit.service';
import { getLocalOutfitFallback } from '../utils/outfit.utils';
import type { OutfitRequestParams, OutfitRecommendation } from '../types/outfit.types';

export const useOutfitStore = defineStore('outfit', () => {
  const recommendation = ref<OutfitRecommendation | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isUsingLocalFallback = ref(false);

  const getRecommendation = async (params: OutfitRequestParams) => {
    isLoading.value = true;
    error.value = null;
    isUsingLocalFallback.value = false;
    
    try {
      const data = await OutfitService.getRecommendation(params);
      recommendation.value = data;
    } catch (err: any) {
      console.warn('AI Recommendation failed, falling back to local styling engine:', err);
      // Seamlessly fallback to high quality local curated stylist
      const fallbackData = getLocalOutfitFallback(params);
      recommendation.value = fallbackData;
      isUsingLocalFallback.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const clearRecommendation = () => {
    recommendation.value = null;
    error.value = null;
    isUsingLocalFallback.value = false;
  };

  return {
    recommendation,
    isLoading,
    error,
    isUsingLocalFallback,
    getRecommendation,
    clearRecommendation
  };
});
