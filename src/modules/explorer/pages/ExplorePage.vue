<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Search, 
  Filter, 
  Sparkles, 
  Heart, 
  Star, 
  CloudSun, 
  Eye, 
  Compass, 
  X, 
  Calendar, 
  Flame, 
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Award,
  Zap
} from 'lucide-vue-next'
import { useExplore } from '../composables/useExplore'
import MixMatchCard from '../components/MixMatchCard.vue'
import { 
  WEATHER_COLLECTIONS, 
  SEASON_COLLECTIONS, 
  ACTIVITY_COLLECTIONS,
  ACCESSORIES_DATABASE
} from '../utils/explore.utils'

const {
  outfits,
  accessories,
  selectedCategory,
  selectedOutfit,
  isOutfitsLoading,
  isAccessoriesLoading,
  filters,
  mixMatchStyle,
  mixMatchResults,
  setCategory,
  updateFilters,
  resetFilters,
  selectOutfit
} = useExplore()

// Interactive Filters Expansion Toggle
const isFiltersExpanded = ref(false)

// Mock Categories list with high quality fashion visuals
const categoriesList = [
  { id: 'streetwear', name: 'Streetwear', description: 'Bold, oversized, and urban siluet.', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop' },
  { id: 'casual', name: 'Casual Essentials', description: 'Clean, comfortable, and everyday comfort.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop' },
  { id: 'formal', name: 'Formal Sophisticated', description: 'Sharp, tailored blazers & sleek shoes.', image: 'https://images.unsplash.com/photo-1594938298598-71ee5994659e?q=80&w=600&auto=format&fit=crop' },
  { id: 'sporty', name: 'Sporty Athleisure', description: 'Moisture-wicking, flexible activewear.', image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=600&auto=format&fit=crop' },
  { id: 'vintage', name: 'Vintage Nostalgia', description: 'Classic tobacco corduroy & flared denim.', image: 'https://images.unsplash.com/photo-1550614000-4b95d4ebf951?q=80&w=600&auto=format&fit=crop' },
  { id: 'minimalist', name: 'Clean Minimalist', description: 'Monochrome palettes & pure organic linen.', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop' },
  { id: 'korean', name: 'Korean K-Style', description: 'Loose cardigan layering & pleated tennis skirts.', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop' },
  { id: 'techwear', name: 'Urban Techwear', description: 'Asymmetrical utility cargo & waterproof shell.', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop' }
]

// Mix & match helper for active outfit pieces
const outfitMatchesAccessories = computed(() => {
  if (!selectedOutfit.value) return []
  const normStyle = selectedOutfit.value.category
  return ACCESSORIES_DATABASE.filter(acc => 
    acc.matchingStyles.includes(normStyle)
  ).slice(0, 3)
})

// Trending Outfits Mock Data
const trendingOutfits = computed(() => {
  return [...outfits.value].sort((a, b) => b.likes - a.likes).slice(0, 5)
})

// Quick Filter Apply helper
const handleQuickFilter = (type: 'weather' | 'season' | 'activity', value: string) => {
  updateFilters({ [type]: value })
  // Scroll to outfit grid section
  const el = document.getElementById('explore-grid-anchor')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Carousel drag & click-to-scroll controls
const carouselRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const hasDragged = ref(false)
const startX = ref(0)
const scrollLeftVal = ref(0)
const dragThreshold = 5

const scrollCarousel = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  const scrollAmount = 300
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

const handleCategoryClick = (catId: string) => {
  if (hasDragged.value) {
    hasDragged.value = false
    return
  }
  setCategory(catId)
}
</script>

<template>
  <div class="min-h-screen bg-theme-bg text-theme-text-primary pt-24 pb-16 px-6 transition-colors duration-500 relative overflow-hidden">
    <!-- Floating background decorative mesh gradients -->
    <div class="absolute -right-48 top-36 w-[450px] h-[450px] rounded-full bg-theme-logo-from/5 blur-[120px] pointer-events-none"></div>
    <div class="absolute -left-48 top-[60%] w-[450px] h-[450px] rounded-full bg-theme-logo-to/5 blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto space-y-16 relative z-10">
      
      <!-- HERO SECTION -->
      <section class="text-center max-w-4xl mx-auto space-y-6 pt-8 relative">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-logo-from/10 border border-theme-logo-from/20 text-theme-logo-from mb-2 animate-pulse">
          <Sparkles class="w-4 h-4" />
          <span class="text-[10px] font-black tracking-widest uppercase">Fashion Nexus</span>
        </div>
        
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none bg-gradient-to-r from-theme-logo-from via-theme-logo-to to-theme-logo-from bg-clip-text text-transparent">
          Explore Your Fashion Style
        </h1>
        
        <p class="text-theme-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Temukan mahakarya paduan pakaian lengkap dengan aksesoris estetik terbaik. Disesuaikan secara cerdas berdasarkan kondisi cuaca, musim, aktivitas, dan tren fashion terkini.
        </p>

        <!-- MODERN SEARCH & FILTER BAR -->
        <div class="max-w-3xl mx-auto pt-4">
          <div class="glass p-2.5 rounded-[2rem] border border-theme-glass-border shadow-xl flex flex-col md:flex-row items-center gap-2">
            <!-- Search field -->
            <div class="relative w-full flex-1 flex items-center px-4">
              <Search class="w-5 h-5 text-theme-text-secondary shrink-0" />
              <input 
                v-model="filters.search"
                @input="updateFilters({ search: filters.search })"
                type="text" 
                placeholder="Cari gaya, item pakaian, atau trend..."
                class="w-full bg-transparent border-none outline-none py-3 px-3 text-sm text-theme-text-primary placeholder-theme-text-secondary font-semibold"
              />
              <button 
                v-if="filters.search"
                @click="updateFilters({ search: '' }); filters.search = ''"
                class="text-xs text-theme-text-secondary hover:text-theme-text-primary px-2"
              >
                Clear
              </button>
            </div>

            <!-- Filters Toggle button -->
            <button 
              @click="isFiltersExpanded = !isFiltersExpanded"
              class="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-theme-bg/60 border border-theme-glass-border flex items-center justify-center gap-2 text-xs font-bold text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-logo-from/40 transition-colors"
            >
              <Filter class="w-4 h-4" />
              Refine Search
              <span class="w-2 h-2 rounded-full bg-theme-logo-from" v-if="filters.season !== 'all' || filters.gender !== 'all' || filters.activity !== 'all' || filters.weather !== 'all'"></span>
            </button>

            <!-- Search Action -->
            <button 
              @click="updateFilters({})"
              class="w-full md:w-auto px-8 py-3.5 rounded-2xl bg-theme-btn-bg text-theme-btn-text hover:scale-[1.02] transition-all duration-500 font-bold text-xs shadow-md active:scale-[0.98] shrink-0"
            >
              Search
            </button>
          </div>

          <!-- Extended Dropdown Panel -->
          <transition name="expand">
            <div v-if="isFiltersExpanded" class="glass rounded-[2rem] p-6 border border-theme-glass-border shadow-xl mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <!-- Weather -->
              <div class="space-y-2">
                <label class="text-[10px] font-black text-theme-text-secondary uppercase tracking-wider">Weather Conditions</label>
                <select 
                  v-model="filters.weather" 
                  @change="updateFilters({ weather: filters.weather })"
                  class="w-full bg-theme-bg border border-theme-glass-border rounded-xl px-4 py-3 text-xs font-bold text-theme-text-primary outline-none focus:border-theme-logo-from cursor-pointer shadow-inner"
                >
                  <option value="all">Any Weather</option>
                  <option value="sunny">☀️ Sunny</option>
                  <option value="rainy">🌧️ Rainy</option>
                  <option value="cloudy">☁️ Cloudy</option>
                  <option value="snowy">❄️ Snowy</option>
                  <option value="windy">💨 Windy</option>
                </select>
              </div>

              <!-- Season -->
              <div class="space-y-2">
                <label class="text-[10px] font-black text-theme-text-secondary uppercase tracking-wider">Seasonal Vibe</label>
                <select 
                  v-model="filters.season"
                  @change="updateFilters({ season: filters.season })"
                  class="w-full bg-theme-bg border border-theme-glass-border rounded-xl px-4 py-3 text-xs font-bold text-theme-text-primary outline-none focus:border-theme-logo-from cursor-pointer shadow-inner"
                >
                  <option value="all">Any Season</option>
                  <option value="summer">🌴 Summer Oasis</option>
                  <option value="autumn">🍁 Golden Autumn</option>
                  <option value="winter">❄️ Winter Eclipse</option>
                  <option value="spring">🌸 Spring Blossom</option>
                </select>
              </div>

              <!-- Gender -->
              <div class="space-y-2">
                <label class="text-[10px] font-black text-theme-text-secondary uppercase tracking-wider">Gender Silhouettes</label>
                <select 
                  v-model="filters.gender"
                  @change="updateFilters({ gender: filters.gender })"
                  class="w-full bg-theme-bg border border-theme-glass-border rounded-xl px-4 py-3 text-xs font-bold text-theme-text-primary outline-none focus:border-theme-logo-from cursor-pointer shadow-inner"
                >
                  <option value="all">Unisex / All</option>
                  <option value="male">Male Cut</option>
                  <option value="female">Female Cut</option>
                </select>
              </div>

              <!-- Activity -->
              <div class="space-y-2">
                <label class="text-[10px] font-black text-theme-text-secondary uppercase tracking-wider">User Activities</label>
                <select 
                  v-model="filters.activity"
                  @change="updateFilters({ activity: filters.activity })"
                  class="w-full bg-theme-bg border border-theme-glass-border rounded-xl px-4 py-3 text-xs font-bold text-theme-text-primary outline-none focus:border-theme-logo-from cursor-pointer shadow-inner"
                >
                  <option value="all">Any Activity</option>
                  <option value="work">💼 Work / Office</option>
                  <option value="travel">✈️ Travel / Explore</option>
                  <option value="gym">🏋️ Gym / Active</option>
                  <option value="date">✨ Date Night</option>
                  <option value="hangout">🍕 Hangout / Chill</option>
                </select>
              </div>

              <!-- Reset Action -->
              <div class="sm:col-span-2 md:col-span-4 flex justify-between items-center pt-2 border-t border-theme-glass-border/30">
                <span class="text-[10px] text-theme-text-secondary font-semibold">Active filters are compiled and applied dynamically below.</span>
                <button 
                  @click="resetFilters" 
                  class="text-xs font-bold text-theme-logo-from hover:text-theme-logo-to transition-colors"
                >
                  Reset Active Filters
                </button>
              </div>
            </div>
          </transition>
        </div>
      </section>

      <!-- STYLE CATEGORIES CAROUSEL -->
      <section class="space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="text-xl sm:text-2xl font-black text-theme-text-primary tracking-tight flex items-center gap-2">
            <Compass class="w-6 h-6 text-theme-logo-from" />
            Curated Styles
          </h3>
          
          <!-- Navigation Arrows & swipe label -->
          <div class="flex items-center gap-3">
            <span class="text-xs text-theme-text-secondary font-semibold hidden sm:inline">Drag or click to explore</span>
            <div class="flex items-center gap-1.5">
              <button 
                @click="scrollCarousel('left')" 
                class="w-9 h-9 rounded-xl bg-theme-glass-bg border border-theme-glass-border flex items-center justify-center text-theme-text-secondary hover:text-theme-logo-from hover:scale-105 active:scale-95 transition-all shadow-sm animate-fade-in"
                title="Scroll Left"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button 
                @click="scrollCarousel('right')" 
                class="w-9 h-9 rounded-xl bg-theme-glass-bg border border-theme-glass-border flex items-center justify-center text-theme-text-secondary hover:text-theme-logo-from hover:scale-105 active:scale-95 transition-all shadow-sm animate-fade-in"
                title="Scroll Right"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Horizontal Scroll Grid Container -->
        <div 
          ref="carouselRef"
          @mousedown="onMouseDown"
          @mouseleave="onMouseLeave"
          @mouseup="onMouseUp"
          @mousemove="onMouseMove"
          class="flex items-center gap-5 overflow-x-auto pb-4 scroll-smooth no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        >
          <div 
            v-for="cat in categoriesList" 
            :key="cat.id"
            @click="handleCategoryClick(cat.id)"
            class="snap-start shrink-0 w-60 sm:w-64 h-80 rounded-[2rem] relative overflow-hidden cursor-pointer border hover:shadow-2xl transition-all duration-500"
            :class="selectedCategory === cat.id 
              ? 'border-theme-logo-from shadow-lg shadow-theme-logo-from/15 scale-[1.02]' 
              : 'border-theme-glass-border hover:border-theme-logo-from/30'"
          >
            <!-- Image background -->
            <img :src="cat.image" :alt="cat.name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-750 hover:scale-105" />
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
            <!-- Outline Glow effect if active -->
            <div 
              v-if="selectedCategory === cat.id"
              class="absolute inset-0 border-[2.5px] border-theme-logo-from rounded-[2rem] pointer-events-none shadow-[inset_0_0_15px_rgba(244,63,94,0.3)] animate-pulse"
            ></div>

            <!-- Card Content -->
            <div class="absolute inset-0 p-6 flex flex-col justify-end text-left space-y-2">
              <h4 class="text-xl font-black text-white leading-tight">{{ cat.name }}</h4>
              <p class="text-[10px] text-white/70 font-semibold leading-relaxed line-clamp-2">
                {{ cat.description }}
              </p>
              
              <div class="pt-2 flex items-center justify-between">
                <span class="text-[9px] font-black text-theme-logo-from uppercase tracking-widest bg-theme-logo-from/15 px-2.5 py-1 rounded-md border border-theme-logo-from/20">Explore Vibe</span>
                <ChevronRight class="w-4 h-4 text-white hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- RESPONSIVE MASONRY GRID (Selected Category Outfits) -->
      <section id="explore-grid-anchor" class="space-y-6">
        <div class="flex items-center justify-between border-b border-theme-glass-border pb-4">
          <div class="text-left">
            <h3 class="text-2xl font-black text-theme-text-primary tracking-tight">
              Looking for <span class="capitalize text-theme-logo-from font-black">{{ selectedCategory }}</span> Lookbook
            </h3>
            <p class="text-xs text-theme-text-secondary mt-1 font-semibold">Hasil terkurasi dari database kami berdasarkan cuaca aktif.</p>
          </div>
        </div>

        <!-- Skeleton Loaders -->
        <div v-if="isOutfitsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="`outfit-skel-${i}`" class="glass rounded-[2rem] p-4 border border-theme-glass-border animate-pulse">
            <div class="w-full h-80 bg-theme-bg/50 rounded-2xl mb-4"></div>
            <div class="h-6 bg-theme-bg/50 rounded-lg w-2/3 mb-3"></div>
            <div class="h-4 bg-theme-bg/50 rounded-lg w-1/2 mb-5"></div>
            <div class="flex justify-between items-center pt-4 border-t border-theme-glass-border/30">
              <div class="w-20 h-5 bg-theme-bg/50 rounded-lg"></div>
              <div class="w-8 h-8 bg-theme-bg/50 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="outfits.length === 0" class="glass rounded-[2.5rem] p-12 text-center border border-theme-glass-border max-w-lg mx-auto">
          <div class="w-16 h-16 rounded-full bg-theme-bg/60 border border-theme-glass-border flex items-center justify-center mx-auto mb-6 text-theme-text-secondary text-2xl shadow-inner">
            🔍
          </div>
          <h4 class="text-lg font-black text-theme-text-primary mb-2">Gaya Outfit Tidak Ditemukan</h4>
          <p class="text-xs text-theme-text-secondary leading-relaxed mb-6 max-w-xs mx-auto">Tidak ada outfit yang cocok dengan kombinasi filter aktif Anda. Coba bersihkan filter pencarian atau ganti kategori gaya Anda.</p>
          <button @click="resetFilters" class="px-6 py-3 rounded-xl bg-theme-btn-bg text-theme-btn-text hover:scale-[1.02] transition-all duration-500 font-bold text-xs shadow-md active:scale-[0.98]">
            Reset Filter
          </button>
        </div>

        <!-- Actual Grid (Masonry lookalike) -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="outfit in outfits" 
            :key="outfit.id"
            class="group glass rounded-[2.5rem] p-4 border border-theme-glass-border hover:border-theme-logo-from/50 hover:shadow-2xl hover:shadow-theme-logo-from/10 transition-all duration-500 flex flex-col justify-between"
          >
            <!-- Image Layer -->
            <div class="relative w-full h-80 rounded-2xl overflow-hidden mb-4 shrink-0 shadow-inner">
              <img :src="outfit.image" :alt="outfit.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Hearts / Likes counter bubble -->
              <div class="absolute top-3 left-3 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-white text-xs font-bold shadow-lg">
                <Heart class="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                {{ outfit.likes }}
              </div>

              <!-- Rating bubble -->
              <div class="absolute top-3 right-3 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-white text-xs font-bold shadow-lg">
                <Star class="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                {{ outfit.rating }}
              </div>
            </div>

            <!-- Content Details -->
            <div class="px-1 text-left flex-1 flex flex-col justify-between">
              <div>
                <h4 class="text-lg font-black text-theme-text-primary mb-2 group-hover:text-theme-logo-from transition-colors line-clamp-1">
                  {{ outfit.name }}
                </h4>
                <p class="text-xs text-theme-text-secondary leading-relaxed line-clamp-2">
                  {{ outfit.pieces.join(' • ') }}
                </p>
              </div>

              <!-- Badges & Action -->
              <div class="mt-4 pt-4 border-t border-theme-glass-border/30 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <!-- Weather badge -->
                  <span class="px-2.5 py-1 rounded-lg bg-theme-bg border border-theme-glass-border text-[9px] font-black text-theme-text-secondary uppercase tracking-widest flex items-center gap-1.5">
                    <Zap class="w-3 h-3 text-theme-logo-from" />
                    {{ outfit.weather }}
                  </span>
                  <!-- Style badge -->
                  <span class="px-2.5 py-1 rounded-lg bg-theme-bg border border-theme-glass-border text-[9px] font-black text-theme-text-secondary uppercase tracking-widest">
                    {{ outfit.gender }}
                  </span>
                </div>

                <button 
                  @click="selectOutfit(outfit)"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-theme-btn-bg text-theme-btn-text hover:scale-[1.02] transition-all duration-500 font-bold text-xs shrink-0 shadow-sm"
                >
                  <Eye class="w-3.5 h-3.5" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- MIX & MATCH INTERACTIVE COMPONENT -->
      <section>
        <MixMatchCard />
      </section>

      <!-- ACCESSORIES PICKS OF THE DAY -->
      <section class="space-y-6">
        <div class="text-left space-y-1">
          <h3 class="text-2xl font-black text-theme-text-primary tracking-tight">Accessories Picks</h3>
          <p class="text-xs text-theme-text-secondary font-semibold">Cari aksesoris terbaik untuk melengkapi estetika pakaian harian Anda.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div 
            v-for="acc in accessories" 
            :key="acc.id"
            class="group rounded-3xl bg-theme-glass-bg border border-theme-glass-border p-3.5 hover:border-theme-logo-from/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
          >
            <div class="relative w-full h-36 rounded-2xl overflow-hidden mb-3 shrink-0">
              <img :src="acc.image" :alt="acc.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
            </div>

            <div class="flex-1 flex flex-col justify-between space-y-1">
              <div>
                <span class="text-[8px] font-black text-theme-logo-from uppercase tracking-widest bg-theme-logo-from/15 px-2 py-0.5 rounded border border-theme-logo-from/20">
                  {{ acc.category }}
                </span>
                <h5 class="text-xs font-black text-theme-text-primary mt-1 line-clamp-1 leading-tight">{{ acc.name }}</h5>
              </div>
              
              <div class="pt-2 border-t border-theme-glass-border/30 flex items-center justify-between mt-2 shrink-0">
                <span class="text-xs font-black text-theme-text-primary">${{ acc.price }}</span>
                <button class="w-6.5 h-6.5 rounded-lg bg-theme-bg border border-theme-glass-border flex items-center justify-center text-theme-text-secondary hover:text-theme-logo-from hover:border-theme-logo-from/50 hover:scale-105 transition-all">
                  <ArrowRight class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- WEATHER-BASED OUTFIT CARDS -->
      <section class="space-y-6">
        <div class="text-left space-y-1">
          <h3 class="text-2xl font-black text-theme-text-primary tracking-tight flex items-center gap-2">
            <CloudSun class="w-6 h-6 text-theme-logo-from animate-pulse" />
            Weather Based Guides
          </h3>
          <p class="text-xs text-theme-text-secondary font-semibold">Paduan pakaian andalan berdasarkan suhu cuaca hari ini.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div 
            v-for="w in WEATHER_COLLECTIONS" 
            :key="w.id"
            @click="handleQuickFilter('weather', w.id)"
            class="group rounded-[2.25rem] bg-theme-glass-bg border p-5 cursor-pointer shadow-md hover:shadow-xl hover:border-theme-logo-from/40 transition-all duration-300 text-left flex flex-col justify-between min-h-[300px]"
            :class="filters.weather === w.id ? 'border-theme-logo-from ring-1 ring-theme-logo-from/50 bg-theme-logo-from/5' : 'border-theme-glass-border'"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-3xl">{{ w.icon }}</span>
                <span class="text-[9px] font-black uppercase tracking-widest text-theme-text-secondary bg-theme-bg border border-theme-glass-border px-2 py-0.5 rounded">{{ w.badge }}</span>
              </div>
              <div>
                <h4 class="text-base font-black text-theme-text-primary group-hover:text-theme-logo-from transition-colors leading-tight mb-2">{{ w.name }}</h4>
                <p class="text-[10px] text-theme-text-secondary leading-relaxed font-semibold">
                  {{ w.description }}
                </p>
              </div>
            </div>

            <div class="pt-4 border-t border-theme-glass-border/30">
              <div class="text-[8px] text-theme-text-secondary font-black uppercase tracking-wider mb-2">Must Have Pieces:</div>
              <div class="flex flex-wrap gap-1.5">
                <span 
                  v-for="(piece, pIdx) in w.pieces.slice(0, 2)" 
                  :key="pIdx"
                  class="text-[9px] font-bold text-theme-text-secondary bg-theme-bg/60 border border-theme-glass-border/60 px-2 py-0.5 rounded-md"
                >
                  {{ piece }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SEASONAL COLLECTION GUIDES -->
      <section class="space-y-6">
        <div class="text-left space-y-1">
          <h3 class="text-2xl font-black text-theme-text-primary tracking-tight flex items-center gap-2">
            <Calendar class="w-6 h-6 text-theme-logo-from" />
            Season Collections
          </h3>
          <p class="text-xs text-theme-text-secondary font-semibold">Ekspresikan diri Anda dalam visual musim yang menawan sepanjang tahun.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="s in SEASON_COLLECTIONS" 
            :key="s.id"
            @click="handleQuickFilter('season', s.id)"
            class="group h-80 rounded-[2.5rem] relative overflow-hidden cursor-pointer border shadow-lg hover:shadow-2xl transition-all duration-500"
            :class="filters.season === s.id ? 'border-theme-logo-from scale-[1.02]' : 'border-theme-glass-border hover:border-theme-logo-from/35'"
          >
            <!-- Background Image -->
            <img :src="s.bgImage" :alt="s.name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-105" />
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent"></div>

            <!-- Content -->
            <div class="absolute inset-0 p-6 flex flex-col justify-end text-left space-y-3">
              <span class="w-max px-2.5 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest bg-gradient-to-r" :class="s.accentColor">
                {{ s.badge }}
              </span>
              <div>
                <h4 class="text-lg font-black text-white leading-tight mb-2">{{ s.name }}</h4>
                <p class="text-[10px] text-white/70 leading-relaxed font-semibold line-clamp-2">
                  {{ s.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- AI RECOMMENDED LOOKS (Activity Guides) -->
      <section class="space-y-6">
        <div class="text-left space-y-1">
          <h3 class="text-2xl font-black text-theme-text-primary tracking-tight flex items-center gap-2">
            <Zap class="w-6 h-6 text-theme-logo-from animate-bounce" />
            AI Recommended Activity Looks
          </h3>
          <p class="text-xs text-theme-text-secondary font-semibold">Inspirasi look otomatis yang dirancang khusus untuk mendukung produktivitas aktivitas Anda.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div 
            v-for="act in ACTIVITY_COLLECTIONS" 
            :key="act.id"
            @click="handleQuickFilter('activity', act.id)"
            class="group glass rounded-[2.25rem] border hover:border-theme-logo-from/40 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
            :class="filters.activity === act.id ? 'border-theme-logo-from bg-theme-logo-from/5' : 'border-theme-glass-border'"
          >
            <div>
              <!-- Thumbnail -->
              <div class="relative w-full h-32 shrink-0">
                <img :src="act.image" :alt="act.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <span class="absolute bottom-2 left-3 text-2xl">{{ act.icon }}</span>
              </div>

              <div class="p-4 space-y-2">
                <span class="text-[8px] font-black text-theme-text-secondary uppercase tracking-widest">{{ act.badge }}</span>
                <h4 class="text-sm font-black text-theme-text-primary group-hover:text-theme-logo-from transition-colors leading-tight">{{ act.name }}</h4>
                <p class="text-[9px] text-theme-text-secondary leading-relaxed font-semibold line-clamp-3">
                  {{ act.description }}
                </p>
              </div>
            </div>

            <div class="p-4 pt-0">
              <span class="inline-flex items-center gap-1 text-[8px] font-black text-theme-logo-from uppercase tracking-widest">
                Explore Outfits
                <ArrowRight class="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- DETAIL MODAL DRAWER -->
      <transition name="fade">
        <div v-if="selectedOutfit" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm" @click.self="selectOutfit(null)">
          <div class="glass max-w-3xl w-full rounded-[2.5rem] border border-theme-glass-border overflow-hidden shadow-2xl p-8 relative animate-fade-in grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
            
            <!-- Close Button -->
            <button 
              @click="selectOutfit(null)" 
              class="absolute top-6 right-6 w-10 h-10 rounded-full bg-theme-bg/60 border border-theme-glass-border flex items-center justify-center text-theme-text-secondary hover:text-theme-text-primary hover:scale-105 active:scale-95 transition-all z-20"
            >
              <X class="w-5 h-5" />
            </button>

            <!-- Product Image Thumbnail (Left) -->
            <div class="md:col-span-5 h-[320px] md:h-[450px] rounded-3xl overflow-hidden relative shadow-inner shrink-0">
              <img :src="selectedOutfit.image" :alt="selectedOutfit.name" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span class="bg-theme-logo-from text-white text-[9px] font-black tracking-widest px-3 py-1.5 rounded-lg border border-white/10 uppercase">{{ selectedOutfit.category }}</span>
                <span class="text-white text-xs font-bold flex items-center gap-1">
                  <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {{ selectedOutfit.rating }}
                </span>
              </div>
            </div>

            <!-- Product Details (Right) -->
            <div class="md:col-span-7 flex flex-col justify-between space-y-6 py-2">
              <div class="space-y-4">
                <div>
                  <span class="text-[9px] font-black text-theme-logo-from uppercase tracking-widest bg-theme-logo-from/15 px-2.5 py-1 rounded-md border border-theme-logo-from/20">Style Spotlight</span>
                  <h3 class="text-2xl font-black text-theme-text-primary tracking-tight mt-2 leading-tight">{{ selectedOutfit.name }}</h3>
                  <div class="flex items-center gap-2 mt-1.5">
                    <span class="text-xs text-theme-text-secondary font-bold">Vibe: {{ selectedOutfit.style }}</span>
                    <span class="text-xs text-theme-text-secondary/50">•</span>
                    <span class="text-xs text-theme-text-secondary font-bold uppercase tracking-wider">{{ selectedOutfit.gender }}</span>
                  </div>
                </div>

                <!-- Pieces list -->
                <div class="space-y-2">
                  <h5 class="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest leading-none">Anatomi Outfit Layer:</h5>
                  <ul class="space-y-1.5">
                    <li 
                      v-for="(piece, pIdx) in selectedOutfit.pieces" 
                      :key="pIdx"
                      class="px-4 py-2.5 rounded-xl bg-theme-bg/60 border border-theme-glass-border text-xs font-bold text-theme-text-primary flex items-center gap-2.5"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-theme-logo-from"></span>
                      {{ piece }}
                    </li>
                  </ul>
                </div>

                <!-- Curation logic -->
                <div class="p-4 rounded-2xl bg-theme-logo-from/5 border-l-4 border-theme-logo-from text-xs text-theme-text-secondary leading-relaxed font-semibold">
                  Gaya {{ selectedOutfit.name }} dirancang khusus untuk kenyamanan Anda pada saat kondisi cuaca cenderung <span class="text-theme-logo-from uppercase font-black">{{ selectedOutfit.weather }}</span> di musim {{ selectedOutfit.season }}.
                </div>

                <!-- Matching accessories visual section -->
                <div v-if="outfitMatchesAccessories.length > 0" class="space-y-2 pt-2">
                  <h5 class="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest leading-none">Aksesoris Pelengkap:</h5>
                  <div class="grid grid-cols-3 gap-3">
                    <div 
                      v-for="acc in outfitMatchesAccessories" 
                      :key="acc.id"
                      class="rounded-xl border border-theme-glass-border bg-theme-bg/40 p-2 flex flex-col items-center justify-between text-center"
                    >
                      <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0 mb-1">
                        <img :src="acc.image" :alt="acc.name" class="w-full h-full object-cover" />
                      </div>
                      <span class="text-[9px] font-black text-theme-text-primary truncate w-full" :title="acc.name">{{ acc.name }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cart/Favorite Actions -->
              <div class="pt-4 border-t border-theme-glass-border/30 flex items-center justify-between gap-4">
                <button class="flex-1 py-3.5 rounded-xl bg-theme-btn-bg text-theme-btn-text hover:scale-[1.02] transition-all duration-500 font-bold text-xs shadow-md">
                  Collect Entire Look
                </button>
                <button class="w-12 h-12 rounded-xl bg-theme-bg/60 border border-theme-glass-border flex items-center justify-center text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all shrink-0">
                  <Heart class="w-5 h-5 fill-rose-500" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </transition>

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

/* Animations */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0px;
  opacity: 0;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
