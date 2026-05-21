<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { mockTrendingOutfits } from '../utils/mockData'

// Carousel drag & click-to-scroll controls
const carouselRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const hasDragged = ref(false)
const startX = ref(0)
const scrollLeftVal = ref(0)
const dragThreshold = 5

const scrollCarousel = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  const scrollAmount = 340 // Match the width of one card + gaps
  carouselRef.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  })
}

const onMouseDown = (e: MouseEvent) => {
  if (!carouselRef.value) return
  isDragging.value = true
  hasDragged.value = false
  startX.value = e.pageX - carouselRef.value.offsetLeft
  scrollLeftVal.value = carouselRef.value.scrollLeft
}

const onMouseLeave = () => {
  isDragging.value = false
}

const onMouseUp = () => {
  isDragging.value = false
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !carouselRef.value) return
  e.preventDefault()
  const x = e.pageX - carouselRef.value.offsetLeft
  const walk = (x - startX.value) * 1.5
  if (Math.abs(walk) > dragThreshold) {
    hasDragged.value = true
  }
  carouselRef.value.scrollLeft = scrollLeftVal.value - walk
}

const handleItemClick = (e: MouseEvent) => {
  if (hasDragged.value) {
    e.preventDefault()
    e.stopPropagation()
    hasDragged.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-theme-text-primary">Trending Styles</h2>
      <div class="flex gap-2">
        <button 
          @click="scrollCarousel('left')"
          class="w-8 h-8 rounded-full glass flex items-center justify-center text-theme-text-primary hover:bg-white/10 active:scale-90 transition-all"
          title="Scroll Left"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button 
          @click="scrollCarousel('right')"
          class="w-8 h-8 rounded-full glass flex items-center justify-center text-theme-text-primary hover:bg-white/10 active:scale-90 transition-all"
          title="Scroll Right"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Horizontal Scroll Container -->
    <div 
      ref="carouselRef"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
      class="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing select-none" 
      style="scrollbar-width: none; -ms-overflow-style: none;"
    >
      <div 
        v-for="item in mockTrendingOutfits" 
        :key="item.id"
        class="min-w-[280px] sm:min-w-[320px] snap-center shrink-0"
        @click="handleItemClick"
      >
        <div class="glass rounded-3xl p-4 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
          <div class="relative h-48 rounded-2xl overflow-hidden mb-4">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none" />
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

<style scoped>
/* Scrollbar removal */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

