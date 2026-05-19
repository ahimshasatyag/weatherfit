<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme, Theme } = useTheme()

const paletteInfo = computed(() => {
  if (currentTheme.value === Theme.RAINY) {
    return { name: 'Earthy Tones', desc: 'Grounding colors for rainy days', colors: ['#57534e', '#78716c', '#a8a29e', '#d6d3d1'] }
  } else if (currentTheme.value === Theme.SUNNY) {
    return { name: 'Vibrant Summer', desc: 'Bright, energetic hues', colors: ['#ef4444', '#f97316', '#f59e0b', '#eab308'] }
  } else if (currentTheme.value === Theme.LIGHT) {
    return { name: 'Pastel Clouds', desc: 'Soft and airy', colors: ['#bae6fd', '#e0f2fe', '#f0f9ff', '#ffffff'] }
  } else {
    return { name: 'Midnight Neon', desc: 'Sleek dark mode accents', colors: ['#0f172a', '#312e81', '#4c1d95', '#86198f'] }
  }
})
</script>

<template>
  <div class="glass rounded-3xl p-6">
    <h3 class="text-lg font-bold text-theme-text-primary mb-1">Color Palette</h3>
    <p class="text-xs text-theme-text-secondary mb-4">{{ paletteInfo.desc }}</p>
    
    <div class="flex gap-3">
      <div 
        v-for="(color, idx) in paletteInfo.colors" 
        :key="color"
        class="w-10 h-10 rounded-full shadow-lg border border-theme-glass-border hover:scale-125 transition-transform duration-300 cursor-pointer"
        :style="{ backgroundColor: color, zIndex: 10 - idx }"
        :title="color"
      />
    </div>
  </div>
</template>
