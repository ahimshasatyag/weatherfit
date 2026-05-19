<script setup lang="ts">
import { ref } from 'vue'
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

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % slides.length
}

const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length
}
</script>

<template>
  <div class="relative w-full h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group animate-slide-up">
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
        <img :src="slide.image" class="w-full h-full object-cover object-center" :alt="slide.title" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
      </div>
    </div>

    <!-- Content -->
    <div class="absolute inset-0 flex flex-col justify-end p-12 z-10 pointer-events-none">
      <div class="max-w-2xl pointer-events-auto">
        <h1 class="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-4 animate-slide-up" style="animation-delay: 0.2s">
          Find Your Perfect Outfit Based on Today's Weather
        </h1>
        <p class="text-lg text-slate-200 mb-8 animate-slide-up" style="animation-delay: 0.4s">
          Discover intelligent fashion combinations tailored to current temperature, humidity, and real-time sky conditions.
        </p>
        <div class="animate-slide-up" style="animation-delay: 0.6s">
          <BaseButton variant="primary" class="px-8 py-4 text-lg">
            Scan My Weather
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute bottom-12 right-12 flex gap-4 z-20">
      <button 
        @click="prevSlide"
        class="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        @click="nextSlide"
        class="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>
