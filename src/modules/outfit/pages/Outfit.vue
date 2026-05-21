<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Sparkles, User, CloudSun, Thermometer, ArrowLeftRight } from 'lucide-vue-next'
import { useWeatherStore } from '@/modules/weather/stores/weather.store'
import ListOutfit from './ListOutfit.vue'

const router = useRouter()
const weatherStore = useWeatherStore()

const selectedCategory = ref<any>(null)
const selectedGender = ref<'male' | 'female' | 'unisex'>('unisex')

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

const navigateToWeather = () => {
  router.push('/weather')
}
</script>

<template>
  <div class="min-h-screen bg-theme-bg text-theme-text-primary pt-24 pb-12 px-6 transition-colors duration-500">
    <transition name="fade" mode="out-in">
      <div v-if="!selectedCategory" key="categories" class="max-w-7xl mx-auto space-y-12">
        
        <!-- Premium Header Area -->
        <div class="text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-logo-from/10 border border-theme-logo-from/20 text-theme-logo-from mb-2 animate-pulse">
            <Sparkles class="w-4 h-4" />
            <span class="text-xs font-bold tracking-widest uppercase">Style Guide</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-theme-logo-from to-theme-logo-to bg-clip-text text-transparent">
            Explore Outfit Styles
          </h1>
          <p class="text-theme-text-secondary max-w-2xl mx-auto text-base md:text-lg font-medium">
            Temukan inspirasi fashion yang sesuai dengan kepribadian dan cuaca hari ini. Pilih kategori untuk melihat koleksi.
          </p>
        </div>

        <!-- Integrated Weather & Gender Selectors (Double Card Layout) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          <!-- Weather Context Card -->
          <div class="p-6 rounded-[2rem] bg-theme-glass-bg border border-theme-glass-border shadow-lg flex flex-col justify-between transition-all duration-300 hover:border-theme-logo-from/30">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold uppercase tracking-wider text-theme-text-secondary flex items-center gap-2">
                <CloudSun class="w-4 h-4 text-theme-logo-from" />
                Weather Context
              </span>
              <button 
                @click="navigateToWeather" 
                class="text-xs font-bold text-theme-logo-from hover:text-theme-logo-to transition-colors flex items-center gap-1.5"
              >
                Change Location
                <ArrowLeftRight class="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div class="flex items-center gap-4 py-2">
              <div class="w-12 h-12 rounded-2xl bg-theme-logo-from/10 flex items-center justify-center text-theme-logo-from">
                <Thermometer class="w-6 h-6" />
              </div>
              <div>
                <div class="text-2xl font-black">{{ weatherStore.temperature }}°C</div>
                <div class="text-xs text-theme-text-secondary font-semibold uppercase tracking-wider">
                  Condition: {{ weatherStore.condition }}
                </div>
              </div>
            </div>
            
            <p class="text-xs text-theme-text-secondary mt-3">
              Rekomendasi AI akan disesuaikan otomatis dengan suhu dan cuaca di atas demi kenyamanan Anda.
            </p>
          </div>

          <!-- Gender Preference Card -->
          <div class="p-6 rounded-[2rem] bg-theme-glass-bg border border-theme-glass-border shadow-lg flex flex-col justify-between transition-all duration-300 hover:border-theme-logo-from/30">
            <div class="mb-4">
              <span class="text-xs font-bold uppercase tracking-wider text-theme-text-secondary flex items-center gap-2">
                <User class="w-4 h-4 text-theme-logo-from" />
                Gender Preference
              </span>
            </div>

            <!-- Modern Segmented Pill buttons -->
            <div class="grid grid-cols-3 gap-2 bg-theme-bg/60 p-1.5 rounded-2xl border border-theme-glass-border">
              <button 
                @click="selectedGender = 'male'" 
                class="py-2.5 rounded-xl text-xs font-bold transition-all"
                :class="selectedGender === 'male' ? 'bg-theme-logo-from text-white shadow-md' : 'text-theme-text-secondary hover:text-theme-text-primary'"
              >
                Male
              </button>
              <button 
                @click="selectedGender = 'female'" 
                class="py-2.5 rounded-xl text-xs font-bold transition-all"
                :class="selectedGender === 'female' ? 'bg-theme-logo-from text-white shadow-md' : 'text-theme-text-secondary hover:text-theme-text-primary'"
              >
                Female
              </button>
              <button 
                @click="selectedGender = 'unisex'" 
                class="py-2.5 rounded-xl text-xs font-bold transition-all"
                :class="selectedGender === 'unisex' ? 'bg-theme-logo-from text-white shadow-md' : 'text-theme-text-secondary hover:text-theme-text-primary'"
              >
                Unisex
              </button>
            </div>

            <p class="text-xs text-theme-text-secondary mt-4">
              Pilihan gender menentukan siluet, ukuran, dan perpaduan jenis item fashion dalam koleksi rekomendasi.
            </p>
          </div>

        </div>

        <!-- Grid Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[320px]">
          <div 
            v-for="(cat, index) in categories" 
            :key="cat.id"
            @click="selectCategory(cat)"
            class="group relative overflow-hidden rounded-[2.5rem] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-theme-logo-from/15 transition-all duration-500 border border-transparent hover:border-theme-logo-from/30"
            :class="[
              index === 0 ? 'md:col-span-2 lg:col-span-2 row-span-2' : '',
              index === 1 ? 'lg:col-span-1 row-span-2' : ''
            ]"
          >
            <!-- Background Image -->
            <img :src="cat.image" :alt="cat.name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500"></div>

            <!-- Content -->
            <div class="absolute inset-0 p-8 flex flex-col justify-end">
              <div class="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <h3 class="text-3xl md:text-4xl font-black text-white mb-3">{{ cat.name }}</h3>
                <p class="text-white/70 font-medium text-xs md:text-sm max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-6 leading-relaxed">
                  {{ cat.description }}
                </p>
              </div>
              
              <button class="w-max flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 delay-200">
                Explore Style
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail View (ListOutfit) with Gender Prop -->
      <ListOutfit v-else key="list" :category="selectedCategory" :gender="selectedGender" @back="goBack" />
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
