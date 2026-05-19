<script setup lang="ts">
const forecast = [
  { day: 'Mon', temp: 24, icon: '⛅', outfitThumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=150&auto=format&fit=crop' },
  { day: 'Tue', temp: 26, icon: '☀️', outfitThumb: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=150&auto=format&fit=crop' },
  { day: 'Wed', temp: 22, icon: '🌧️', outfitThumb: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=150&auto=format&fit=crop' },
  { day: 'Thu', temp: 21, icon: '🌧️', outfitThumb: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=150&auto=format&fit=crop' },
  { day: 'Fri', temp: 25, icon: '⛅', outfitThumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=150&auto=format&fit=crop' },
  { day: 'Sat', temp: 28, icon: '☀️', outfitThumb: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=150&auto=format&fit=crop' },
  { day: 'Sun', temp: 27, icon: '☀️', outfitThumb: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=150&auto=format&fit=crop' },
]
</script>

<template>
  <div class="mb-12">
    <h2 class="text-2xl font-bold text-theme-text-primary mb-6">Weekly Outlook</h2>
    
    <div class="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide" style="scrollbar-width: none;">
      <div 
        v-for="(day, index) in forecast" 
        :key="day.day"
        class="min-w-[100px] flex flex-col items-center p-4 rounded-3xl glass snap-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
        :style="{ animationDelay: `${index * 0.1}s` }"
        :class="['animate-slide-up']"
      >
        <span class="text-theme-text-secondary font-bold text-sm mb-2">{{ day.day }}</span>
        <span class="text-3xl mb-2">{{ day.icon }}</span>
        <span class="text-theme-text-primary font-bold text-lg mb-4">{{ day.temp }}°</span>
        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-theme-glass-border">
          <img :src="day.outfitThumb" alt="Suggested outfit" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>
