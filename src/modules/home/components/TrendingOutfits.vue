<script setup lang="ts">
import { mockTrendingOutfits } from '../utils/mockData'
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-theme-text-primary">Trending Styles</h2>
      <div class="flex gap-2">
        <button class="w-8 h-8 rounded-full glass flex items-center justify-center text-theme-text-primary hover:bg-white/10 transition-colors">
          &larr;
        </button>
        <button class="w-8 h-8 rounded-full glass flex items-center justify-center text-theme-text-primary hover:bg-white/10 transition-colors">
          &rarr;
        </button>
      </div>
    </div>

    <!-- Horizontal Scroll Container -->
    <div class="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide" style="scrollbar-width: none;">
      <div 
        v-for="item in mockTrendingOutfits" 
        :key="item.id"
        class="min-w-[280px] sm:min-w-[320px] snap-center"
      >
        <div class="glass rounded-3xl p-4 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
          <div class="relative h-48 rounded-2xl overflow-hidden mb-4">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-slate-900/60 backdrop-blur-md flex items-center gap-1">
              <span class="text-xs text-rose-400 font-bold">&hearts;</span>
              <span class="text-xs text-white font-medium">{{ (item.likes / 1000).toFixed(1) }}k</span>
            </div>
          </div>
          <div>
            <div class="text-xs text-theme-text-secondary font-bold tracking-wider uppercase mb-1">{{ item.brand }}</div>
            <h3 class="font-bold text-theme-text-primary truncate">{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
