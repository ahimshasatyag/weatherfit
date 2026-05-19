<script setup lang="ts">
const communityOutfits = [
  { id: 1, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop', user: '@alex_styles', height: 'h-64' },
  { id: 2, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop', user: '@winterboy', height: 'h-96' },
  { id: 3, img: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=400&auto=format&fit=crop', user: '@summervibe', height: 'h-72' },
  { id: 4, img: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=400&auto=format&fit=crop', user: '@techwear_daily', height: 'h-80' },
  { id: 5, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop', user: '@formal_gent', height: 'h-64' },
  { id: 6, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop', user: '@minimal_aesthetics', height: 'h-96' },
]
</script>

<template>
  <div class="mt-20">
    <div class="text-center mb-10 animate-slide-up">
      <h2 class="text-4xl font-black text-theme-text-primary mb-4">Community Inspiration</h2>
      <p class="text-theme-text-secondary">See how others are styling today's weather.</p>
    </div>

    <!-- CSS Masonry Layout -->
    <div class="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
      <div 
        v-for="(outfit, index) in communityOutfits" 
        :key="outfit.id"
        class="relative group rounded-3xl overflow-hidden break-inside-avoid cursor-pointer"
        :class="[outfit.height, 'animate-slide-up']"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <img :src="outfit.img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div class="text-white font-bold">{{ outfit.user }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
