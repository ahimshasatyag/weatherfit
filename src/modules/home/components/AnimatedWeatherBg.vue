<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme, Theme } = useTheme()

// Determine active weather effects based on the current theme
const isRainy = computed(() => currentTheme.value === Theme.RAINY)
const isSunny = computed(() => currentTheme.value === Theme.SUNNY)
const isCloudy = computed(() => currentTheme.value === Theme.LIGHT) // Mapping light to cloudy for demo
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    
    <!-- Base Gradient Background handled by CSS Variables on body, but we can add parallax overlay here -->
    
    <!-- Sun Rays Effect -->
    <transition name="fade">
      <div v-if="isSunny" class="absolute inset-0">
        <div class="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-yellow-300/20 rounded-full blur-[120px] animate-pulse" />
        <div class="absolute top-[10%] right-[10%] w-[40%] h-[50%] bg-orange-400/20 rounded-full blur-[100px] animate-float" />
      </div>
    </transition>

    <!-- Rain Effect -->
    <transition name="fade">
      <div v-if="isRainy" class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQwIj48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxNSIgZmlsbD0icmdiYSgyNTUsIDI1NSLCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-30 animate-rain" />
    </transition>

    <!-- Clouds Effect -->
    <transition name="fade">
      <div v-if="isCloudy" class="absolute inset-0">
        <div class="absolute top-10 left-[-20%] w-[60%] h-[30%] bg-white/10 rounded-full blur-[80px] animate-float-delayed" />
        <div class="absolute top-40 right-[-10%] w-[50%] h-[40%] bg-white/10 rounded-full blur-[100px] animate-float" />
      </div>
    </transition>

    <!-- Dark Mode Stars / Ambient -->
    <transition name="fade">
      <div v-if="currentTheme === Theme.DARK" class="absolute inset-0">
        <div class="absolute top-[20%] left-[30%] w-2 h-2 bg-white rounded-full blur-[2px] animate-pulse" />
        <div class="absolute top-[50%] right-[20%] w-3 h-3 bg-white/80 rounded-full blur-[3px] animate-pulse" style="animation-delay: 1s;" />
        <div class="absolute bottom-[30%] left-[10%] w-1 h-1 bg-white/60 rounded-full blur-[1px] animate-pulse" style="animation-delay: 2s;" />
      </div>
    </transition>
    
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Rain Animation */
.animate-rain {
  animation: rain 0.5s linear infinite;
  background-size: 20px 40px;
}

@keyframes rain {
  0% { background-position: 0 0; }
  100% { background-position: 20px 40px; }
}
</style>
