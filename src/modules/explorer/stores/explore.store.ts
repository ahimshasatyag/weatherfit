import { defineStore } from 'pinia';
import { ref, reactive, watch } from 'vue';
import { ExploreService } from '../services/explore.service';
import { mixAndMatchAccessories } from '../utils/explore.utils';
import type { ExploreOutfit, Accessory, FilterParams } from '../types/explore.types';

export const useExploreStore = defineStore('explore', () => {
  // State
  const outfits = ref<ExploreOutfit[]>([]);
  const accessories = ref<Accessory[]>([]);
  const selectedCategory = ref<string>('streetwear'); // Default category
  const selectedOutfit = ref<ExploreOutfit | null>(null);
  
  const isOutfitsLoading = ref(false);
  const isAccessoriesLoading = ref(false);
  
  const filters = reactive<FilterParams>({
    search: '',
    category: 'streetwear', // starts synced
    color: 'all',
    season: 'all',
    gender: 'all',
    activity: 'all',
    weather: 'all',
    accessory: 'all'
  });

  // Mix & Match state
  const mixMatchStyle = ref<string>('streetwear');
  const mixMatchResults = ref<Accessory[]>([]);

  // Actions
  const fetchOutfits = async () => {
    isOutfitsLoading.value = true;
    try {
      const data = await ExploreService.getCuratedOutfits({
        search: filters.search,
        category: selectedCategory.value === 'all' ? '' : selectedCategory.value,
        season: filters.season,
        gender: filters.gender,
        activity: filters.activity,
        weather: filters.weather
      });
      outfits.value = data;
    } catch (error) {
      console.error('Failed to fetch outfits in Pinia store:', error);
    } finally {
      isOutfitsLoading.value = false;
    }
  };

  const fetchAccessories = async () => {
    isAccessoriesLoading.value = true;
    try {
      const data = await ExploreService.getAccessoryPicks();
      accessories.value = data;
    } catch (error) {
      console.error('Failed to fetch accessories in Pinia store:', error);
    } finally {
      isAccessoriesLoading.value = false;
    }
  };

  const setCategory = (catId: string) => {
    selectedCategory.value = catId;
    filters.category = catId;
    // Auto sync mix & match style with the active category for user convenience
    mixMatchStyle.value = catId;
    triggerMixMatch(catId);
    fetchOutfits();
  };

  const updateFilters = (newFilters: Partial<FilterParams>) => {
    Object.assign(filters, newFilters);
    fetchOutfits();
  };

  const resetFilters = () => {
    filters.search = '';
    filters.category = selectedCategory.value;
    filters.color = 'all';
    filters.season = 'all';
    filters.gender = 'all';
    filters.activity = 'all';
    filters.weather = 'all';
    filters.accessory = 'all';
    fetchOutfits();
  };

  const selectOutfit = (outfit: ExploreOutfit | null) => {
    selectedOutfit.value = outfit;
  };

  const triggerMixMatch = (styleId: string) => {
    mixMatchStyle.value = styleId;
    mixMatchResults.value = mixAndMatchAccessories(styleId);
  };

  // Watch for initial load or manual triggers
  const init = async () => {
    await Promise.all([
      fetchOutfits(),
      fetchAccessories()
    ]);
    triggerMixMatch(selectedCategory.value);
  };

  return {
    outfits,
    accessories,
    selectedCategory,
    selectedOutfit,
    isOutfitsLoading,
    isAccessoriesLoading,
    filters,
    mixMatchStyle,
    mixMatchResults,
    fetchOutfits,
    fetchAccessories,
    setCategory,
    updateFilters,
    resetFilters,
    selectOutfit,
    triggerMixMatch,
    init
  };
});
