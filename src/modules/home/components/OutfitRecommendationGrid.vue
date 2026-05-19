<script setup lang="ts">
import { mockOutfitRecommendations } from '../utils/mockData'

const badgeColors: Record<string, string> = {
  Casual: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Streetwear: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  Sport: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  Formal: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div 
      v-for="(item, index) in mockOutfitRecommendations" 
      :key="item.id"
      class="glass rounded-3xl overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-500"
      :style="{ animationDelay: `${index * 0.1}s` }"
      :class="['animate-slide-up']"
    >
      <div class="relative h-64 overflow-hidden">
        <img 
          :src="item.image" 
          :alt="item.name" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <!-- Category Badge -->
        <div class="absolute top-4 left-4">
          <span 
            class="px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md"
            :class="badgeColors[item.category]"
          >
            {{ item.category }}
          </span>
        </div>
      </div>
      
      <div class="p-6">
        <h3 class="text-lg font-bold text-theme-text-primary mb-2 line-clamp-1 group-hover:text-sky-400 transition-colors">
          {{ item.name }}
        </h3>
        <div class="flex items-center justify-between mt-4">
          <span class="text-theme-text-secondary font-medium">${{ item.price.toFixed(2) }}</span>
          <button class="w-8 h-8 rounded-full bg-theme-btn-bg text-theme-btn-text flex items-center justify-center hover:scale-110 transition-transform">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
