import { MOCK_OUTFITS, ACCESSORIES_DATABASE } from '../utils/explore.utils';
import type { ExploreOutfit, Accessory, FilterParams } from '../types/explore.types';

export const exploreApi = {
  /**
   * Mengambil data outfit berdasarkan filter dengan delay untuk simulasi real-world API
   */
  getOutfits: async (filters: Partial<FilterParams> = {}): Promise<ExploreOutfit[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [...MOCK_OUTFITS];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(item => 
            item.name.toLowerCase().includes(q) || 
            item.style.toLowerCase().includes(q) ||
            item.pieces.some(p => p.toLowerCase().includes(q))
          );
        }

        const { category, weather, gender, season, activity } = filters;

        if (category && category !== 'all') {
          const norm = category.toLowerCase();
          result = result.filter(item => item.category === norm);
        }

        if (weather && weather !== 'all') {
          const norm = weather.toLowerCase();
          result = result.filter(item => item.weather === norm);
        }

        if (gender && gender !== 'all') {
          const norm = gender.toLowerCase();
          result = result.filter(item => item.gender === norm || item.gender === 'unisex');
        }

        if (season && season !== 'all') {
          const norm = season.toLowerCase();
          result = result.filter(item => item.season === norm);
        }

        if (activity && activity !== 'all') {
          const norm = activity.toLowerCase();
          result = result.filter(item => item.activity === norm);
        }

        resolve(result);
      }, 700); // 700ms simulation
    });
  },

  /**
   * Mengambil data seluruh aksesoris pendukung
   */
  getAccessories: async (): Promise<Accessory[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ACCESSORIES_DATABASE);
      }, 300);
    });
  }
};
