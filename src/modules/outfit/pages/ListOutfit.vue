<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { ArrowLeft, SlidersHorizontal, Star, CloudRain, Sun, Thermometer, ChevronDown, Sparkles } from 'lucide-vue-next'

const props = defineProps<{
  category: { id: string; name: string; description: string; image: string }
}>()

const emit = defineEmits(['back'])

const isLoading = ref(true)
const items = ref<any[]>([])

// Filter States
const filters = ref({
  weather: 'all',
  color: 'all',
  sort: 'popular'
})

// Mock Data Generators
const generateMockData = (categoryId: string) => {
  const baseData = []
  const count = 12
  
  for (let i = 0; i < count; i++) {
    let title = ''
    let price = Math.floor(Math.random() * 100) + 20
    let rating = (Math.random() * 1 + 4).toFixed(1)
    let image = props.category.image // Fallback
    let pieces: string[] = []
    
    if (categoryId === 'streetwear') {
      title = `Urban Street Look ${i + 1}`
      pieces = ['Oversized Hoodie', 'Cargo Pants', 'Chunky Sneakers', 'Beanie']
      image = `https://images.unsplash.com/photo-1523398002811-999aa8e95d1e?q=80&w=600&auto=format&fit=crop`
    } else if (categoryId === 'casual') {
      title = `Casual Essential ${i + 1}`
      pieces = ['Basic T-Shirt', 'Denim Jeans', 'White Sneakers']
      image = `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop`
    } else if (categoryId === 'formal') {
      title = `Elegant Formal ${i + 1}`
      pieces = ['Tailored Blazer', 'Dress Shirt', 'Trousers', 'Leather Oxfords']
      image = `https://images.unsplash.com/photo-1594938298598-71ee5994659e?q=80&w=600&auto=format&fit=crop`
    } else if (categoryId === 'sporty') {
      title = `Athleisure Fit ${i + 1}`
      pieces = ['Performance Top', 'Joggers', 'Running Shoes']
      image = `https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=600&auto=format&fit=crop`
    } else if (categoryId === 'vintage') {
      title = `Retro Classic ${i + 1}`
      pieces = ['Corduroy Jacket', 'Vintage Tee', 'Flared Pants', 'Retro Sneakers']
      image = `https://images.unsplash.com/photo-1550614000-4b95d4ebf951?q=80&w=600&auto=format&fit=crop`
    }

    const weathers = ['sunny', 'rainy', 'cloudy', 'cold']
    const colors = ['dark', 'light', 'colorful', 'earth']
    
    baseData.push({
      id: i,
      title,
      price,
      rating,
      image,
      pieces,
      weather: weathers[Math.floor(Math.random() * weathers.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      popular: Math.random() > 0.5
    })
  }
  return baseData
}

const loadData = () => {
  isLoading.value = true
  setTimeout(() => {
    items.value = generateMockData(props.category.id)
    isLoading.value = false
  }, 1200) // Simulate network request loading time
}

onMounted(() => {
  loadData()
})

watch(() => props.category, () => {
  loadData()
})

const filteredItems = computed(() => {
  let result = items.value

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
  <div class="max-w-7xl mx-auto">
    <!-- Header Navigation -->
    <div class="flex items-center gap-4 mb-10">
      <button @click="emit('back')" class="w-12 h-12 rounded-xl bg-theme-glass-bg border border-theme-glass-border flex items-center justify-center text-theme-text-primary hover:bg-theme-logo-from hover:text-white transition-all shadow-md hover:shadow-theme-logo-from/20 group">
        <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      </button>
      <div>
        <h2 class="text-3xl font-black tracking-tight text-theme-text-primary flex items-center gap-3">
          {{ category.name }} Collection
        </h2>
        <p class="text-sm text-theme-text-secondary font-medium">{{ category.description }}</p>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="flex flex-col lg:flex-row gap-8">
      
      <!-- Sidebar Filters -->
      <aside class="w-full lg:w-72 shrink-0 space-y-6">
        <div class="p-6 rounded-3xl bg-theme-glass-bg border border-theme-glass-border shadow-lg lg:sticky lg:top-28 transition-colors duration-500">
          <div class="flex items-center gap-3 mb-6 text-theme-text-primary font-bold border-b border-theme-glass-border pb-4">
            <div class="w-8 h-8 rounded-lg bg-theme-logo-from/10 flex items-center justify-center text-theme-logo-from">
              <SlidersHorizontal class="w-4 h-4" />
            </div>
            Refine Search
          </div>

          <!-- Weather Compatibility -->
          <div class="mb-8">
            <h4 class="text-sm font-bold text-theme-text-primary mb-4 uppercase tracking-wider">Weather Compatibility</h4>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" v-model="filters.weather" value="all" class="hidden" />
                <div class="w-5 h-5 rounded-full border-2 border-theme-text-secondary flex items-center justify-center group-hover:border-theme-logo-from transition-colors" :class="{'border-theme-logo-from': filters.weather === 'all'}">
                  <div class="w-2.5 h-2.5 rounded-full bg-theme-logo-from transition-transform scale-0" :class="{'scale-100': filters.weather === 'all'}"></div>
                </div>
                <span class="text-sm font-semibold text-theme-text-secondary group-hover:text-theme-text-primary transition-colors" :class="{'text-theme-text-primary': filters.weather === 'all'}">Any Weather</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" v-model="filters.weather" value="sunny" class="hidden" />
                <div class="w-5 h-5 rounded-full border-2 border-theme-text-secondary flex items-center justify-center group-hover:border-theme-logo-from transition-colors" :class="{'border-theme-logo-from': filters.weather === 'sunny'}">
                  <div class="w-2.5 h-2.5 rounded-full bg-theme-logo-from transition-transform scale-0" :class="{'scale-100': filters.weather === 'sunny'}"></div>
                </div>
                <div class="flex items-center gap-2 text-sm font-semibold text-theme-text-secondary group-hover:text-theme-text-primary transition-colors" :class="{'text-theme-text-primary': filters.weather === 'sunny'}">
                  <Sun class="w-4 h-4" /> Sunny & Warm
                </div>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" v-model="filters.weather" value="rainy" class="hidden" />
                <div class="w-5 h-5 rounded-full border-2 border-theme-text-secondary flex items-center justify-center group-hover:border-theme-logo-from transition-colors" :class="{'border-theme-logo-from': filters.weather === 'rainy'}">
                  <div class="w-2.5 h-2.5 rounded-full bg-theme-logo-from transition-transform scale-0" :class="{'scale-100': filters.weather === 'rainy'}"></div>
                </div>
                <div class="flex items-center gap-2 text-sm font-semibold text-theme-text-secondary group-hover:text-theme-text-primary transition-colors" :class="{'text-theme-text-primary': filters.weather === 'rainy'}">
                  <CloudRain class="w-4 h-4" /> Rainy & Wet
                </div>
              </label>
            </div>
          </div>

          <!-- Color Tone -->
          <div class="mb-8">
            <h4 class="text-sm font-bold text-theme-text-primary mb-4 uppercase tracking-wider">Color Tone</h4>
            <div class="flex flex-wrap gap-2">
              <button @click="filters.color = 'all'" class="px-4 py-2 rounded-xl text-xs font-bold transition-all border border-transparent" :class="filters.color === 'all' ? 'bg-theme-logo-from text-white shadow-md shadow-theme-logo-from/20' : 'bg-theme-bg text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-glass-border'">All</button>
              <button @click="filters.color = 'dark'" class="px-4 py-2 rounded-xl text-xs font-bold transition-all border border-transparent" :class="filters.color === 'dark' ? 'bg-theme-logo-from text-white shadow-md shadow-theme-logo-from/20' : 'bg-theme-bg text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-glass-border'">Dark</button>
              <button @click="filters.color = 'light'" class="px-4 py-2 rounded-xl text-xs font-bold transition-all border border-transparent" :class="filters.color === 'light' ? 'bg-theme-logo-from text-white shadow-md shadow-theme-logo-from/20' : 'bg-theme-bg text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-glass-border'">Light</button>
              <button @click="filters.color = 'earth'" class="px-4 py-2 rounded-xl text-xs font-bold transition-all border border-transparent" :class="filters.color === 'earth' ? 'bg-theme-logo-from text-white shadow-md shadow-theme-logo-from/20' : 'bg-theme-bg text-theme-text-secondary hover:text-theme-text-primary hover:border-theme-glass-border'">Earth</button>
            </div>
          </div>

          <!-- Sort -->
          <div>
            <h4 class="text-sm font-bold text-theme-text-primary mb-4 uppercase tracking-wider">Sort By</h4>
            <div class="relative">
              <select v-model="filters.sort" class="w-full appearance-none bg-theme-bg border border-theme-glass-border rounded-xl px-4 py-3 text-sm font-semibold text-theme-text-primary outline-none focus:border-theme-logo-from transition-colors cursor-pointer shadow-inner">
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
      <main class="flex-1">
        <!-- Modern Skeletons -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="`skel-${i}`" class="rounded-3xl bg-theme-glass-bg border border-theme-glass-border p-4 animate-pulse shadow-sm">
            <div class="w-full h-72 bg-theme-bg/50 rounded-2xl mb-5"></div>
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
            v-for="item in filteredItems" 
            :key="item.id"
            class="group rounded-3xl bg-theme-glass-bg border border-theme-glass-border p-4 hover:border-theme-logo-from/50 hover:shadow-2xl hover:shadow-theme-logo-from/10 transition-all duration-500"
          >
            <!-- Image Thumbnail -->
            <div class="relative w-full h-72 rounded-2xl overflow-hidden mb-5">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-white text-xs font-bold border border-white/10 shadow-lg">
                <Star class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                {{ item.rating }}
              </div>
            </div>

            <!-- Info -->
            <div class="mb-4 px-1">
              <h3 class="text-lg font-black text-theme-text-primary mb-1.5 line-clamp-1 group-hover:text-theme-logo-from transition-colors">{{ item.title }}</h3>
              <p class="text-xs text-theme-text-secondary font-medium line-clamp-2 leading-relaxed">{{ item.pieces.join(' • ') }}</p>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-5 px-1">
              <span class="px-3 py-1.5 rounded-lg bg-theme-bg border border-theme-glass-border text-[10px] font-bold text-theme-text-secondary uppercase tracking-widest flex items-center gap-1.5">
                <Thermometer class="w-3 h-3" />
                {{ item.weather }}
              </span>
              <span class="px-3 py-1.5 rounded-lg bg-theme-bg border border-theme-glass-border text-[10px] font-bold text-theme-text-secondary uppercase tracking-widest">
                {{ item.color }}
              </span>
            </div>

            <!-- Footer -->
            <div class="flex justify-between items-center pt-4 px-1 border-t border-theme-glass-border">
              <div class="text-xl font-black text-theme-text-primary">${{ item.price }}</div>
              <button class="w-10 h-10 rounded-full bg-theme-text-primary text-theme-bg flex items-center justify-center hover:scale-110 hover:bg-theme-logo-from hover:text-white transition-all shadow-md">
                <Sparkles class="w-4 h-4" />
              </button>
            </div>
          </div>
        </transition-group>

        <!-- Empty State -->
        <div v-if="!isLoading && filteredItems.length === 0" class="text-center py-24 px-4 bg-theme-glass-bg border border-theme-glass-border rounded-3xl mt-4">
          <div class="w-24 h-24 mx-auto bg-theme-bg rounded-full flex items-center justify-center mb-6 border border-theme-glass-border shadow-inner">
            <Sparkles class="w-10 h-10 text-theme-text-secondary opacity-50" />
          </div>
          <h3 class="text-2xl font-black text-theme-text-primary mb-3">No outfits match your style</h3>
          <p class="text-sm text-theme-text-secondary max-w-sm mx-auto mb-8 leading-relaxed">Try adjusting your filters, color tone, or weather compatibility to explore more aesthetic options.</p>
          <button @click="filters.weather = 'all'; filters.color = 'all'" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-theme-logo-from to-theme-logo-to text-white font-bold text-sm hover:shadow-lg hover:shadow-theme-logo-from/30 hover:scale-105 active:scale-95 transition-all">
            Reset Filters
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}
.list-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
