import { storeToRefs } from 'pinia';
import { useExploreStore } from '../stores/explore.store';
import { onMounted } from 'vue';

export const useExplore = () => {
  const store = useExploreStore();
  const refs = storeToRefs(store);

  onMounted(() => {
    // Only init if store is not populated
    if (store.outfits.length === 0) {
      store.init();
    }
  });

  return {
    ...refs,
    setCategory: store.setCategory,
    updateFilters: store.updateFilters,
    resetFilters: store.resetFilters,
    selectOutfit: store.selectOutfit,
    triggerMixMatch: store.triggerMixMatch,
    refetch: store.init
  };
};
