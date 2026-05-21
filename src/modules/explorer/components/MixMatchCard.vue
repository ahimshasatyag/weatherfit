<script setup lang="ts">
import { computed } from 'vue'
import { Sparkles, RefreshCw, ShoppingBag, Plus } from 'lucide-vue-next'
import { useExploreStore } from '../stores/explore.store'

const store = useExploreStore()

const stylesList = [
  { id: 'streetwear', name: 'Streetwear' },
  { id: 'casual', name: 'Casual' },
  { id: 'formal', name: 'Formal' },
  { id: 'sporty', name: 'Sporty' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'korean', name: 'Korean Style' },
  { id: 'techwear', name: 'Techwear' }
]

const handleStyleChange = (styleId: string) => {
  store.triggerMixMatch(styleId)
}

const totalComboPrice = computed(() => {
  return store.mixMatchResults.reduce((sum, item) => sum + item.price, 0)
})
</script>

<template>
  <div class="glass rounded-[2.5rem] p-8 border border-theme-glass-border shadow-xl relative overflow-hidden group">
    <!-- Glowing decorative light effect -->
    <div class="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-theme-logo-from/10 blur-[80px] pointer-events-none group-hover:bg-theme-logo-from/15 transition-colors duration-500"></div>
    <div class="absolute -left-24 -bottom-24 w-64 h-64 rounded-full bg-theme-logo-to/10 blur-[80px] pointer-events-none group-hover:bg-theme-logo-to/15 transition-colors duration-500"></div>

    <div class="relative z-10 space-y-6 text-left">
      <!-- Title -->
      <div class="flex items-center justify-between border-b border-theme-glass-border pb-4">
        <div class="space-y-1">
          <span class="text-[10px] font-black uppercase tracking-widest text-theme-logo-from flex items-center gap-1.5">
            <Sparkles class="w-3.5 h-3.5 animate-pulse" />
            Interactive Tool
          </span>
          <h4 class="text-2xl font-black text-theme-text-primary tracking-tight">Mix & Match Accessories</h4>
        </div>
        
        <button 
          @click="store.triggerMixMatch(store.mixMatchStyle)" 
          class="w-10 h-10 rounded-xl bg-theme-bg/60 border border-theme-glass-border flex items-center justify-center text-theme-text-secondary hover:text-theme-logo-from hover:scale-105 active:scale-95 transition-all"
          title="Segarkan Kombinasi"
        >
          <RefreshCw class="w-4 h-4" />
        </button>
      </div>

      <p class="text-xs text-theme-text-secondary leading-relaxed">
        Pilih preferensi gaya busana Anda di bawah untuk mengombinasikan setumpuk aksesoris modis pendukung secara instan menggunakan AI Stylist Engine kami.
      </p>

      <!-- Horizontal Selectors -->
      <div class="flex flex-wrap gap-2 py-2">
        <button
          v-for="st in stylesList"
          :key="st.id"
          @click="handleStyleChange(st.id)"
          class="px-4 py-2.5 rounded-xl text-xs font-bold transition-all border"
          :class="store.mixMatchStyle === st.id 
            ? 'bg-gradient-to-r from-theme-logo-from to-theme-logo-to text-white border-transparent shadow-lg shadow-theme-logo-from/15' 
            : 'bg-theme-bg/40 border-theme-glass-border text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-logo-from/30'"
        >
          {{ st.name }}
        </button>
      </div>

      <!-- Result Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        <div 
          v-for="item in store.mixMatchResults" 
          :key="item.id"
          class="group/item rounded-2xl bg-theme-bg/40 border border-theme-glass-border p-3 flex flex-col justify-between hover:border-theme-logo-from/40 hover:bg-theme-bg/80 transition-all duration-300 shadow-sm"
        >
          <div class="relative w-full h-24 rounded-xl overflow-hidden mb-3 shrink-0">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
            
            <div class="absolute bottom-1.5 left-2 bg-theme-logo-from/20 border border-theme-logo-from/30 px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest text-white uppercase">
              {{ item.category }}
            </div>
          </div>

          <div class="text-left flex-1 flex flex-col justify-between">
            <h5 class="text-[10px] font-black text-theme-text-primary line-clamp-1 leading-tight group-hover/item:text-theme-logo-from transition-colors">{{ item.name }}</h5>
            <div class="flex items-center justify-between mt-2 pt-2 border-t border-theme-glass-border/30 shrink-0">
              <span class="text-[10px] font-black text-theme-text-primary">${{ item.price }}</span>
              <button class="w-5 h-5 rounded-full bg-theme-logo-from/10 hover:bg-theme-logo-from hover:text-white flex items-center justify-center text-theme-logo-from transition-colors">
                <Plus class="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Total Box -->
      <div class="p-5 rounded-3xl bg-theme-bg/60 border border-theme-glass-border flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 shadow-inner">
        <div class="text-center sm:text-left">
          <div class="text-[10px] text-theme-text-secondary font-black uppercase tracking-wider">Total Combo Set (4 Items)</div>
          <div class="text-2xl font-black text-theme-text-primary mt-1">
            ${{ totalComboPrice }} <span class="text-xs text-theme-text-secondary font-medium">USD</span>
          </div>
        </div>

        <button class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-theme-btn-bg text-theme-btn-text hover:scale-[1.02] transition-all duration-500 font-bold text-xs shadow-md active:scale-95 shrink-0">
          <ShoppingBag class="w-4 h-4" />
          Add Entire Combo to Cart
        </button>
      </div>

    </div>
  </div>
</template>
