<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'

const activeSlide = ref(0)
const slides = [
  {
    title: "Embrace the Sun",
    subtitle: "Lightweight, breathable fabrics for clear skies.",
    image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Urban Rainwear",
    subtitle: "Stay dry without compromising on style.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Winter Layering",
    subtitle: "Master the art of warmth and silhouette.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"
  }
]

const currentSlide = computed(() => {
  return slides[activeSlide.value] || {
    title: "Embrace the Sun",
    subtitle: "Lightweight, breathable fabrics for clear skies.",
    image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?q=80&w=800&auto=format&fit=crop"
  }
})

let autoplayInterval: any = null

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 6000)
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
}

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % slides.length
}

const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length
}

// Touch controls for mobile / swipe gestures
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e: TouchEvent) => {
  if (e.touches && e.touches[0]) {
    touchStartX.value = e.touches[0].clientX
    touchEndX.value = e.touches[0].clientX // reset to avoid drifting
  }
  stopAutoplay()
}

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches && e.touches[0]) {
    touchEndX.value = e.touches[0].clientX
  }
}

const handleTouchEnd = () => {
  const threshold = 50
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div 
    class="relative w-full h-[420px] sm:h-[500px] md:h-[600px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl group animate-slide-up cursor-grab active:cursor-grabbing"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Image Slider -->
    <div 
      class="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
      :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
    >
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="min-w-full h-full relative"
      >
        <img :src="slide.image" class="w-full h-full object-cover object-center select-none" :alt="slide.title" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-transparent" />
      </div>
    </div>

    <!-- Content Panel -->
    <div class="absolute inset-0 flex flex-col justify-end p-6 pb-16 sm:p-10 sm:pb-12 md:p-12 z-10 pointer-events-none">
      <div class="max-w-2xl pointer-events-auto">
        <!-- Dynamic Weather Mode Badge -->
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold text-white mb-3 tracking-wider uppercase">
          <span class="w-1.5 h-1.5 rounded-full bg-theme-logo-from animate-pulse"></span>
          {{ currentSlide.title }}
        </span>
        
        <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-4">
          Find Your Perfect Outfit Based on Today's Weather
        </h1>
        
        <!-- Interactive Style Tips inside High-Contrast Glass Card -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/40 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-slate-200 mb-4 max-w-full">
          <span class="text-base shrink-0">💡</span>
          <span class="leading-relaxed">
            <strong class="text-theme-logo-from font-bold mr-1">Rekomendasi:</strong>
            {{ currentSlide.subtitle }}
          </span>
        </div>
        
        <p class="text-xs sm:text-sm md:text-base text-slate-300 mb-6 max-w-xl">
          Temukan kombinasi pakaian cerdas yang disesuaikan dengan suhu, kelembapan, dan kondisi langit secara real-time.
        </p>
        
        <div>
          <BaseButton variant="primary" class="px-5 py-2.5 text-xs sm:px-7 sm:py-3.5 sm:text-sm">
            Scan My Weather
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Slide Indicators / Glowing Dots -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10 flex gap-2 z-20">
      <button 
        v-for="(_, index) in slides" 
        :key="index"
        @click="activeSlide = index"
        class="h-2 rounded-full transition-all duration-300 cursor-pointer"
        :class="activeSlide === index ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/60'"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>

    <!-- Controls (Hidden on mobile touch devices unless hovered/desktop) -->
    <div class="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-12 md:right-12 hidden sm:flex gap-3 z-20">
      <button 
        @click="prevSlide"
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 shadow-lg"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        @click="nextSlide"
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 shadow-lg"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
