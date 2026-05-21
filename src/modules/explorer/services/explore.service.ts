import { exploreApi } from '../api/explore.api';
import type { ExploreOutfit, Accessory, FilterParams } from '../types/explore.types';

export class ExploreService {
  /**
   * Mengambil list outfit terkurasi berdasarkan search dan filter parameter
   */
  static async getCuratedOutfits(filters: Partial<FilterParams> = {}): Promise<ExploreOutfit[]> {
    try {
      const data = await exploreApi.getOutfits(filters);
      return data;
    } catch (error) {
      console.error('Error fetching curated outfits in ExploreService:', error);
      throw error;
    }
  }

  /**
   * Mengambil katalog aksesoris estetik pendukung
   */
  static async getAccessoryPicks(): Promise<Accessory[]> {
    try {
      const data = await exploreApi.getAccessories();
      return data;
    } catch (error) {
      console.error('Error fetching accessory picks in ExploreService:', error);
      throw error;
    }
  }
}
