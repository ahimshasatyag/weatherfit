<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { 
  ArrowLeft, 
  SlidersHorizontal, 
  Star, 
  CloudRain, 
  Sun, 
  Thermometer, 
  ChevronDown, 
  Sparkles, 
  RefreshCw, 
  Shirt, 
  Layers, 
  Pocket, 
  Compass 
} from 'lucide-vue-next'
import { useOutfitStore } from '../stores/outfit.store'
import { useWeatherStore } from '../../weather/stores/weather.store'
import { getAestheticImageForPiece } from '../utils/outfit.utils'

const props = defineProps<{
  category: { id: string; name: string; description: string; image: string }
  gender: 'male' | 'female' | 'unisex'
}>()

const emit = defineEmits(['back'])

const outfitStore = useOutfitStore()
const weatherStore = useWeatherStore()

// Filter States for secondary catalogue
const filters = ref({
  weather: 'all',
  color: 'all',
  sort: 'popular'
})

// Trigger AI styling based on current weather context & props
const fetchAIRecommendation = async () => {
  await outfitStore.getRecommendation({
    temperature: weatherStore.temperature,
    condition: weatherStore.condition,
    gender: props.gender,
    style: props.category.id as any
  })
}

// Mock Data Generators for Catalogue (kept for exploration)
const catalogItems = ref<any[]>([])
const isCatalogLoading = ref(true)

const generateCatalogData = (categoryId: string) => {
  const baseData = []
  const count = 9
  
  for (let i = 0; i < count; i++) {
    let title = ''
    let price = Math.floor(Math.random() * 120) + 29
    let rating = (Math.random() * 0.8 + 4.2).toFixed(1)
    let image = props.category.image
    let pieces: string[] = []
    
    if (categoryId === 'streetwear') {
      title = `Urban Street Hood ${i + 1}`
      pieces = ['Oversized Tee', 'Cargo Shorts', 'Chunky Dunks']
      image = `https://images.unsplash.com/photo-1523398002811-999aa8e95d1e?q=80&w=600&auto=format&fit=crop`
    } else if (categoryId === 'casual') {
      title = `Everyday Chino Look ${i + 1}`
      pieces = ['Linen Shirt', 'Stretch Chinos', 'Leather Sneakers']
      image = `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop`
    } else if (categoryId === 'formal') {
      title = `Executive Linen Fit ${i + 1}`
      pieces = ['Double-Breasted Vest', 'Smart Shirt', 'Slim Trousers']
      image = `https://images.unsplash.com/photo-1594938298598-71ee5994659e?q=80&w=600&auto=format&fit=crop`
    } else if (categoryId === 'sporty') {
      title = `Vapor Training Kit ${i + 1}`
      pieces = ['Athletic Tank', 'Grid Shorts', 'Stability Runner']
      image = `https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=600&auto=format&fit=crop`
    } else if (categoryId === 'vintage') {
      title = `Nostalgia Tweed Set ${i + 1}`
      pieces = ['Corduroy Shirt', 'Distressed Jeans', 'Suede Boots']
      image = `https://images.unsplash.com/photo-1550614000-4b95d4ebf951?q=80&w=600&auto=format&fit=crop`
    }

    const weathers = ['sunny', 'rainy', 'cloudy', 'cold']
    const colors = ['dark', 'light', 'colorful', 'earth']
    
    baseData.push({
      id: `cat-${i}`,
      title,
      price,
      rating,
      image,
      pieces,
      weather: weathers[Math.floor(Math.random() * weathers.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      popular: Math.random() > 0.4
    })
  }
  return baseData
}

const loadCatalogData = () => {
  isCatalogLoading.value = true
  setTimeout(() => {
    catalogItems.value = generateCatalogData(props.category.id)
    isCatalogLoading.value = false
  }, 1000)
}

onMounted(() => {
  fetchAIRecommendation()
  loadCatalogData()
})

watch(() => props.category, () => {
  fetchAIRecommendation()
  loadCatalogData()
})

const filteredCatalogItems = computed(() => {
  let result = [...catalogItems.value]

  if (filters.value.weather !== 'all') {
    result = result.filter(item => item.weather === filters.value.weather)
  }
  if (filters.value.color !== 'all') {
    result = result.filter(item => item.color === filters.value.color)
  }
  
  if (filters.value.sort === 'popular') {
    result = result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
  } else if (filters.value.sort === 'price-low') {
    result = result.sort((a, b) => a.price - b.price)
  } else if (filters.value.sort === 'price-high') {
    result = result.sort((a, b) => b.price - a.price)
  }

  return result
})
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-12">
    <!-- Header Navigation -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-theme-glass-border">
      <div class="flex items-center gap-5">
        <button 
          @click="emit('back')" 
          class="w-12 h-12 rounded-2xl bg-theme-glass-bg border border-theme-glass-border flex items-center justify-center text-theme-text-primary hover:bg-theme-logo-from hover:text-white transition-all shadow-md hover:shadow-theme-logo-from/15 group shrink-0"
        >
          <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h2 class="text-3xl font-black tracking-tight text-theme-text-primary flex items-center gap-3">
            {{ category.name }} Collection
          </h2>
          <p class="text-xs md:text-sm text-theme-text-secondary font-medium mt-1">
            Gaya <span class="capitalize font-bold text-theme-logo-from">{{ gender }}</span> • {{ category.description }}
          </p>
        </div>
      </div>

      <!-- Quick Active Weather Context Indicator -->
      <div class="px-5 py-3 rounded-2xl bg-theme-glass-bg border border-theme-glass-border flex items-center gap-3 shrink-0 self-start sm:self-center">
        <div class="w-8 h-8 rounded-xl bg-theme-logo-from/10 flex items-center justify-center text-theme-logo-from">
          <CloudSun class="w-4.5 h-4.5" />
        </div>
        <div class="text-left">
          <div class="text-[10px] text-theme-text-secondary font-bold uppercase tracking-wider">Weather Active</div>
          <div class="text-sm font-black">{{ weatherStore.temperature }}°C • {{ weatherStore.condition }}</div>
        </div>
      </div>
    </div>

    <!-- AI Stylist Spotlight Section -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-black text-theme-text-primary flex items-center gap-2">
          <Sparkles class="w-5 h-5 text-theme-logo-from animate-pulse" />
          AI Stylist Spotlight
        </h3>
        <!-- AI Engine Status Badge -->
        <span 
          v-if="!outfitStore.isLoading && outfitStore.recommendation"
          class="px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border"
          :class="outfitStore.isUsingLocalFallback 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'"
        >
          {{ outfitStore.isUsingLocalFallback ? '🛠️ Local Stylist Engine' : '⚡ AI Gemini Active' }}
        </span>
      </div>

      <!-- AI Skeletons -->
      <div v-if="outfitStore.isLoading" class="glass rounded-[2.5rem] p-8 animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-5 grid grid-cols-2 gap-4 h-[350px]">
          <div v-for="i in 4" :key="`sk-${i}`" class="bg-theme-bg/50 rounded-2xl w-full h-full"></div>
        </div>
        <div class="lg:col-span-7 space-y-6 py-4">
          <div class="h-6 bg-theme-bg/50 rounded-lg w-1/3"></div>
          <div class="space-y-3">
            <div v-for="i in 4" :key="`sk-li-${i}`" class="h-10 bg-theme-bg/50 rounded-xl w-full"></div>
          </div>
          <div class="h-20 bg-theme-bg/50 rounded-2xl w-full mt-6"></div>
        </div>
      </div>

      <!-- AI Spotlight Card Content -->
      <div 
        v-else-if="outfitStore.recommendation" 
        class="glass rounded-[2.5rem] overflow-hidden border border-theme-glass-border shadow-xl hover:shadow-2xl hover:shadow-theme-logo-from/5 transition-shadow duration-500 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <!-- Visual Collage (Left Column) -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-4 h-[380px] sm:h-[420px] lg:h-[450px]">
          <!-- Top Piece image -->
          <div class="group relative overflow-hidden rounded-[1.75rem] border border-theme-glass-border shadow-inner">
            <img 
              :src="getAestheticImageForPiece(outfitStore.recommendation.top, 'top')" 
              alt="Recommended Top" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-left">
              <span class="text-[9px] font-bold tracking-widest text-theme-logo-from uppercase bg-theme-logo-from/15 px-2.5 py-1 rounded-md border border-theme-logo-from/20">Top</span>
              <p class="text-white text-xs font-bold mt-2 line-clamp-2 leading-relaxed" :title="outfitStore.recommendation.top">{{ outfitStore.recommendation.top }}</p>
            </div>
          </div>

          <!-- Bottom Piece image -->
          <div class="group relative overflow-hidden rounded-[1.75rem] border border-theme-glass-border shadow-inner">
            <img 
              :src="getAestheticImageForPiece(outfitStore.recommendation.bottom, 'bottom')" 
              alt="Recommended Bottom" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-left">
              <span class="text-[9px] font-bold tracking-widest text-theme-logo-from uppercase bg-theme-logo-from/15 px-2.5 py-1 rounded-md border border-theme-logo-from/20">Bottom</span>
              <p class="text-white text-xs font-bold mt-2 line-clamp-2 leading-relaxed" :title="outfitStore.recommendation.bottom">{{ outfitStore.recommendation.bottom }}</p>
            </div>
          </div>

          <!-- Shoes image -->
          <div class="group relative overflow-hidden rounded-[1.75rem] border border-theme-glass-border shadow-inner">
            <img 
              :src="getAestheticImageForPiece(outfitStore.recommendation.shoes, 'shoes')" 
              alt="Recommended Shoes" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-left">
              <span class="text-[9px] font-bold tracking-widest text-theme-logo-from uppercase bg-theme-logo-from/15 px-2.5 py-1 rounded-md border border-theme-logo-from/20">Shoes</span>
              <p class="text-white text-xs font-bold mt-2 line-clamp-2 leading-relaxed" :title="outfitStore.recommendation.shoes">{{ outfitStore.recommendation.shoes }}</p>
            </div>
          </div>

          <!-- Accessories image -->
          <div class="group relative overflow-hidden rounded-[1.75rem] border border-theme-glass-border shadow-inner">
            <img 
              :src="getAestheticImageForPiece(outfitStore.recommendation.accessories[0] || 'bag', 'accessories')" 
              alt="Recommended Accessories" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-left">
              <span class="text-[9px] font-bold tracking-widest text-theme-logo-from uppercase bg-theme-logo-from/15 px-2.5 py-1 rounded-md border border-theme-logo-from/20">Accessories</span>
              <p class="text-white text-xs font-bold mt-2 line-clamp-2 leading-relaxed" :title="outfitStore.recommendation.accessories.join(', ')">{{ outfitStore.recommendation.accessories.join(', ') }}</p>
            </div>
          </div>
        </div>

        <!-- Outfit Anatomy & Styling (Right Column) -->
        <div class="lg:col-span-7 flex flex-col justify-between py-2 text-left space-y-6">
          <div class="space-y-6">
            <div>
              <h4 class="text-2xl font-black text-theme-text-primary tracking-tight">AI Curated Look</h4>
              <p class="text-xs text-theme-text-secondary font-medium">Dirancang secara cerdas demi kenyamanan optimal di suhu {{ weatherStore.temperature }}°C.</p>
            </div>

            <!-- List of Outfit Components -->
            <div class="space-y-3">
              <!-- Top component card -->
              <div class="flex items-center gap-4 p-3 rounded-2xl bg-theme-bg/40 border border-theme-glass-border transition-colors hover:bg-theme-bg/60">
                <div class="w-10 h-10 rounded-xl bg-theme-logo-from/10 flex items-center justify-center text-theme-logo-from shrink-0">
                  <Shirt class="w-5 h-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-[10px] font-bold text-theme-text-secondary uppercase tracking-widest leading-none">Top Layer</div>
                  <div class="text-sm font-bold text-theme-text-primary truncate mt-1">{{ outfitStore.recommendation.top }}</div>
                </div>
              </div>

              <!-- Bottom component card -->
              <div class="flex items-center gap-4 p-3 rounded-2xl bg-theme-bg/40 border border-theme-glass-border transition-colors hover:bg-theme-bg/60">
                <div class="w-10 h-10 rounded-xl bg-theme-logo-from/10 flex items-center justify-center text-theme-logo-from shrink-0">
                  <Layers class="w-5 h-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-[10px] font-bold text-theme-text-secondary uppercase tracking-widest leading-none">Bottom Layer</div>
                  <div class="text-sm font-bold text-theme-text-primary truncate mt-1">{{ outfitStore.recommendation.bottom }}</div>
                </div>
              </div>

              <!-- Shoes component card -->
              <div class="flex items-center gap-4 p-3 rounded-2xl bg-theme-bg/40 border border-theme-glass-border transition-colors hover:bg-theme-bg/60">
                <div class="w-10 h-10 rounded-xl bg-theme-logo-from/10 flex items-center justify-center text-theme-logo-from shrink-0">
                  <Pocket class="w-5 h-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-[10px] font-bold text-theme-text-secondary uppercase tracking-widest leading-none">Footwear</div>
                  <div class="text-sm font-bold text-theme-text-primary truncate mt-1">{{ outfitStore.recommendation.shoes }}</div>
                </div>
              </div>

              <!-- Accessories component card -->
              <div class="flex items-center gap-4 p-3 rounded-2xl bg-theme-bg/40 border border-theme-glass-border transition-colors hover:bg-theme-bg/60">
                <div class="w-10 h-10 rounded-xl bg-theme-logo-from/10 flex items-center justify-center text-theme-logo-from shrink-0">
                  <Compass class="w-5 h-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-[10px] font-bold text-theme-text-secondary uppercase tracking-widest leading-none">Accessories</div>
                  <div class="text-sm font-bold text-theme-text-primary truncate mt-1">{{ outfitStore.recommendation.accessories.join(' • ') }}</div>
                </div>
              </div>
            </div>

            <!-- Stylist Reasoning Quote -->
            <div class="p-4 rounded-2xl bg-theme-logo-from/5 border-l-4 border-theme-logo-from/80 italic text-sm text-theme-text-secondary leading-relaxed">
              &ldquo;{{ outfitStore.recommendation.reasoning }}&rdquo;
            </div>
          </div>

          <!-- Regenerate Styling button -->
          <div class="pt-4 border-t border-theme-glass-border flex justify-between items-center">
            <span class="text-xs text-theme-text-secondary font-medium">Bukan gaya Anda? Coba regenerasi:</span>
            <button 
              @click="fetchAIRecommendation" 
              class="flex items-center gap-2 px-5 py-3 rounded-xl bg-theme-btn-bg text-theme-btn-text font-bold text-xs hover:scale-[1.03] transition-transform duration-300 active:scale-[0.97]"
            >
              <RefreshCw class="w-3.5 h-3.5" />
              Regenerate Style
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Exploration Secondary Catalog section -->
    <div class="flex flex-col lg:flex-row gap-8 pt-8">
      
      <!-- Sidebar Filters -->
      <aside class="w-full lg:w-72 shrink-0 space-y-6">
        <div class="p-6 rounded-3xl bg-theme-glass-bg border border-theme-glass-border shadow-lg lg:sticky lg:top-28 transition-colors duration-500">
          <div class="flex items-center gap-3 mb-6 text-theme-text-primary font-bold border-b border-theme-glass-border pb-4">
            <div class="w-8 h-8 rounded-lg bg-theme-logo-from/10 flex items-center justify-center text-theme-logo-from">
              <SlidersHorizontal class="w-4 h-4" />
            </div>
            Refine Catalog
          </div>

          <!-- Weather Compatibility -->
          <div class="mb-8 text-left">
            <h4 class="text-xs font-bold text-theme-text-primary mb-4 uppercase tracking-wider">Weather Compatibility</h4>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" v-model="filters.weather" value="all" class="hidden" />
                <div class="w-5 h-5 rounded-full border-2 border-theme-text-secondary flex items-center justify-center group-hover:border-theme-logo-from transition-colors" :class="{'border-theme-logo-from': filters.weather === 'all'}">
                  <div class="w-2.5 h-2.5 rounded-full bg-theme-logo-from transition-transform scale-0" :class="{'scale-100': filters.weather === 'all'}"></div>
                </div>
                <span class="text-xs font-bold text-theme-text-secondary group-hover:text-theme-text-primary transition-colors" :class="{'text-theme-text-primary': filters.weather === 'all'}">Any Weather</span>
              </label>
              
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" v-model="filters.weather" value="sunny" class="hidden" />
                <div class="w-5 h-5 rounded-full border-2 border-theme-text-secondary flex items-center justify-center group-hover:border-theme-logo-from transition-colors" :class="{'border-theme-logo-from': filters.weather === 'sunny'}">
                  <div class="w-2.5 h-2.5 rounded-full bg-theme-logo-from transition-transform scale-0" :class="{'scale-100': filters.weather === 'sunny'}"></div>
                </div>
                <div class="flex items-center gap-2 text-xs font-bold text-theme-text-secondary group-hover:text-theme-text-primary transition-colors" :class="{'text-theme-text-primary': filters.weather === 'sunny'}">
                  <Sun class="w-4 h-4" /> Sunny & Warm
                </div>
              </label>

              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" v-model="filters.weather" value="rainy" class="hidden" />
                <div class="w-5 h-5 rounded-full border-2 border-theme-text-secondary flex items-center justify-center group-hover:border-theme-logo-from transition-colors" :class="{'border-theme-logo-from': filters.weather === 'rainy'}">
                  <div class="w-2.5 h-2.5 rounded-full bg-theme-logo-from transition-transform scale-0" :class="{'scale-100': filters.weather === 'rainy'}"></div>
                </div>
                <div class="flex items-center gap-2 text-xs font-bold text-theme-text-secondary group-hover:text-theme-text-primary transition-colors" :class="{'text-theme-text-primary': filters.weather === 'rainy'}">
                  <CloudRain class="w-4 h-4" /> Rainy & Wet
                </div>
              </label>
            </div>
          </div>

          <!-- Color Tone -->
          <div class="mb-8 text-left">
            <h4 class="text-xs font-bold text-theme-text-primary mb-4 uppercase tracking-wider">Color Tone</h4>
            <div class="flex flex-wrap gap-2">
              <button @click="filters.color = 'all'" class="px-4 py-2 rounded-xl text-[10px] font-bold transition-all border border-transparent" :class="filters.color === 'all' ? 'bg-theme-logo-from text-white shadow-md shadow-theme-logo-from/15' : 'bg-theme-bg text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-glass-border'">All</button>
              <button @click="filters.color = 'dark'" class="px-4 py-2 rounded-xl text-[10px] font-bold transition-all border border-transparent" :class="filters.color === 'dark' ? 'bg-theme-logo-from text-white shadow-md shadow-theme-logo-from/15' : 'bg-theme-bg text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-glass-border'">Dark</button>
              <button @click="filters.color = 'light'" class="px-4 py-2 rounded-xl text-[10px] font-bold transition-all border border-transparent" :class="filters.color === 'light' ? 'bg-theme-logo-from text-white shadow-md shadow-theme-logo-from/15' : 'bg-theme-bg text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-glass-border'">Light</button>
              <button @click="filters.color = 'earth'" class="px-4 py-2 rounded-xl text-[10px] font-bold transition-all border border-transparent" :class="filters.color === 'earth' ? 'bg-theme-logo-from text-white shadow-md shadow-theme-logo-from/15' : 'bg-theme-bg text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-glass-border'">Earth</button>
            </div>
          </div>

          <!-- Sort -->
          <div class="text-left">
            <h4 class="text-xs font-bold text-theme-text-primary mb-4 uppercase tracking-wider">Sort By</h4>
            <div class="relative">
              <select v-model="filters.sort" class="w-full appearance-none bg-theme-bg border border-theme-glass-border rounded-xl px-4 py-3 text-xs font-bold text-theme-text-primary outline-none focus:border-theme-logo-from transition-colors cursor-pointer shadow-inner">
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-secondary pointer-events-none" />
            </div>
          </div>

        </div>
      </aside>

      <!-- Grid Content -->
      <main class="flex-1 space-y-6">
        <h4 class="text-lg font-black text-theme-text-primary flex items-center gap-2 text-left">
          <Compass class="w-5 h-5 text-theme-logo-from" />
          Browse Style Catalogue
        </h4>

        <!-- Modern Skeletons -->
        <div v-if="isCatalogLoading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="`skel-${i}`" class="rounded-3xl bg-theme-glass-bg border border-theme-glass-border p-4 animate-pulse shadow-sm">
            <div class="w-full h-64 bg-theme-bg/50 rounded-2xl mb-5"></div>
            <div class="h-5 bg-theme-bg/50 rounded-lg w-3/4 mb-3"></div>
            <div class="h-4 bg-theme-bg/50 rounded-lg w-1/2 mb-5"></div>
            <div class="flex gap-2 mb-5">
              <div class="w-16 h-7 bg-theme-bg/50 rounded-lg"></div>
              <div class="w-16 h-7 bg-theme-bg/50 rounded-lg"></div>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-theme-glass-border">
              <div class="w-20 h-6 bg-theme-bg/50 rounded-lg"></div>
              <div class="w-10 h-10 bg-theme-bg/50 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Actual Grid -->
        <transition-group v-else name="list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            v-for="item in filteredCatalogItems" 
            :key="item.id"
            class="group rounded-[2rem] bg-theme-glass-bg border border-theme-glass-border p-4 hover:border-theme-logo-from/50 hover:shadow-2xl hover:shadow-theme-logo-from/10 transition-all duration-500 flex flex-col justify-between"
          >
            <!-- Image Thumbnail -->
            <div class="relative w-full h-64 rounded-2xl overflow-hidden mb-4 shrink-0">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="absolute top-3 right-3 bg-black/55 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-white text-xs font-bold border border-white/10 shadow-lg">
                <Star class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                {{ item.rating }}
              </div>
            </div>

            <!-- Info -->
            <div class="mb-4 px-1 text-left flex-1 flex flex-col justify-between">
              <div>
                <h5 class="text-base font-black text-theme-text-primary mb-1.5 line-clamp-1 group-hover:text-theme-logo-from transition-colors">{{ item.title }}</h5>
                <p class="text-[11px] text-theme-text-secondary font-semibold line-clamp-2 leading-relaxed">{{ item.pieces.join(' • ') }}</p>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4 px-1 shrink-0">
              <span class="px-2.5 py-1 rounded-lg bg-theme-bg border border-theme-glass-border text-[9px] font-bold text-theme-text-secondary uppercase tracking-widest flex items-center gap-1.5">
                <Thermometer class="w-3 h-3" />
                {{ item.weather }}
              </span>
              <span class="px-2.5 py-1 rounded-lg bg-theme-bg border border-theme-glass-border text-[9px] font-bold text-theme-text-secondary uppercase tracking-widest">
                {{ item.color }}
              </span>
            </div>

            <!-- Footer -->
            <div class="flex justify-between items-center pt-4 px-1 border-t border-theme-glass-border shrink-0">
              <div class="text-lg font-black text-theme-text-primary">${{ item.price }}</div>
              <button class="w-9 h-9 rounded-full bg-theme-text-primary text-theme-bg flex items-center justify-center hover:scale-110 hover:bg-theme-logo-from hover:text-white transition-all shadow-md">
                <Sparkles class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </transition-group>

        <!-- Empty State -->
        <div v-if="!isCatalogLoading && filteredCatalogItems.length === 0" class="text-center py-20 px-4 bg-theme-glass-bg border border-theme-glass-border rounded-3xl mt-4">
          <div class="w-20 h-20 mx-auto bg-theme-bg rounded-full flex items-center justify-center mb-6 border border-theme-glass-border shadow-inner">
            <Sparkles class="w-8 h-8 text-theme-text-secondary opacity-50" />
          </div>
          <h3 class="text-xl font-black text-theme-text-primary mb-3">No outfits match your style</h3>
          <p class="text-xs text-theme-text-secondary max-w-xs mx-auto mb-6 leading-relaxed">Try adjusting your filters, color tone, or weather compatibility to explore more options.</p>
          <button @click="filters.weather = 'all'; filters.color = 'all'" class="px-6 py-3 rounded-xl bg-gradient-to-r from-theme-logo-from to-theme-logo-to text-white font-bold text-xs hover:shadow-lg hover:shadow-theme-logo-from/25 hover:scale-105 active:scale-95 transition-all">
            Reset Filters
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.97);
}
.list-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
