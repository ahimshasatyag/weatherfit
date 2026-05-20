<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Sparkles } from 'lucide-vue-next'
import ListOutfit from './ListOutfit.vue'

const selectedCategory = ref<any>(null)

const categories = [
  {
    id: 'streetwear',
    name: 'Streetwear',
    description: 'Oversized, bold, and urban aesthetic. Hoodie oversized, cargo pants, sneakers, beanie, and layered outfit.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Clean, comfortable, and everyday essentials. Simple t-shirt, jeans, and clean sneakers.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'formal',
    name: 'Formal',
    description: 'Sharp, tailored, and sophisticated. Blazer, shirt, trousers, and leather shoes.',
    image: 'https://images.unsplash.com/photo-1594938298598-71ee5994659e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sporty',
    name: 'Sporty',
    description: 'Activewear, athleisure, and performance. Activewear, running shoes, and athleisure outfit.',
    image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Retro tones, warm vibes, and classic pieces. Retro outfit dengan tone warna warm dan classic accessories.',
    image: 'https://images.unsplash.com/photo-1550614000-4b95d4ebf951?q=80&w=800&auto=format&fit=crop'
  }
]

const selectCategory = (category: any) => {
  selectedCategory.value = category
}

const goBack = () => {
  selectedCategory.value = null
}
</script>

<template>
  <div class="min-h-screen bg-theme-bg text-theme-text-primary pt-24 pb-12 px-6">
    <transition name="fade" mode="out-in">
      <div v-if="!selectedCategory" key="categories" class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16 space-y-4">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-logo-from/10 border border-theme-logo-from/20 text-theme-logo-from mb-4">
            <Sparkles class="w-4 h-4" />
            <span class="text-xs font-bold tracking-widest uppercase">Style Guide</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight">Explore Outfit Styles</h1>
          <p class="text-theme-text-secondary max-w-2xl mx-auto text-lg">
            Temukan inspirasi fashion yang sesuai dengan kepribadian dan cuaca hari ini. Pilih kategori untuk melihat koleksi.
          </p>
        </div>

        <!-- Grid Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          <div 
            v-for="(cat, index) in categories" 
            :key="cat.id"
            @click="selectCategory(cat)"
            class="group relative overflow-hidden rounded-[2rem] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-theme-logo-from/20 transition-all duration-500"
            :class="[
              index === 0 ? 'md:col-span-2 lg:col-span-2 row-span-2' : '',
              index === 1 ? 'lg:col-span-1 row-span-2' : ''
            ]"
          >
            <!-- Background Image -->
            <img :src="cat.image" :alt="cat.name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

            <!-- Content -->
            <div class="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 class="text-3xl font-black text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{{ cat.name }}</h3>
              <p class="text-white/80 font-medium text-sm max-w-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 mb-6">
                {{ cat.description }}
              </p>
              
              <button class="w-max flex items-center gap-2 bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/30 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 delay-200">
                Explore Style
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail View (ListOutfit) -->
      <ListOutfit v-else key="list" :category="selectedCategory" @back="goBack" />
    </transition>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
