<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { aiApi, type AIOutfitRecommendation } from '@/modules/ai/api/ai.api'

const props = defineProps<{
  currentTemp: number
  currentCondition: string
}>()

const isLoading = ref(false)
const recommendation = ref<AIOutfitRecommendation | null>(null)

const gender = ref<'Male' | 'Female' | 'Unisex'>('Unisex')
const occasion = ref<'Casual' | 'Formal' | 'Sport' | 'Party'>('Casual')
const stylePref = ref('Minimalist')

const generateSmartOutfit = async () => {
  isLoading.value = true
  recommendation.value = null
  
  try {
    recommendation.value = await aiApi.generateOutfit({
      weatherCondition: props.currentCondition,
      temperature: props.currentTemp,
      gender: gender.value,
      occasion: occasion.value,
      stylePreference: stylePref.value
    })
  } catch (error) {
    console.error("AI Generation failed", error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="glass rounded-3xl p-8 relative overflow-hidden">
    <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
    
    <h2 class="text-2xl font-bold text-theme-text-primary mb-6 flex items-center gap-2">
      <span class="text-3xl">✨</span> AI Smart Outfit
    </h2>

    <!-- Controls -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10">
      <div>
        <label class="block text-xs uppercase tracking-wider text-theme-text-secondary mb-2 font-bold">Gender</label>
        <select v-model="gender" class="w-full bg-theme-glass-bg border border-theme-glass-border rounded-xl px-4 py-2.5 text-theme-text-primary outline-none focus:ring-2 focus:ring-sky-400/50">
          <option>Unisex</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <div>
        <label class="block text-xs uppercase tracking-wider text-theme-text-secondary mb-2 font-bold">Occasion</label>
        <select v-model="occasion" class="w-full bg-theme-glass-bg border border-theme-glass-border rounded-xl px-4 py-2.5 text-theme-text-primary outline-none focus:ring-2 focus:ring-sky-400/50">
          <option>Casual</option>
          <option>Formal</option>
          <option>Sport</option>
          <option>Party</option>
        </select>
      </div>
      <div>
        <label class="block text-xs uppercase tracking-wider text-theme-text-secondary mb-2 font-bold">Style</label>
        <input v-model="stylePref" type="text" placeholder="e.g. Minimalist, Vintage" class="w-full bg-theme-glass-bg border border-theme-glass-border rounded-xl px-4 py-2.5 text-theme-text-primary outline-none focus:ring-2 focus:ring-sky-400/50" />
      </div>
    </div>

    <BaseButton @click="generateSmartOutfit" :disabled="isLoading" variant="primary" class="w-full mb-8 relative z-10 py-3 text-lg">
      {{ isLoading ? 'AI is thinking...' : 'Generate AI Outfit' }}
    </BaseButton>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="space-y-4 animate-pulse relative z-10">
      <div class="h-4 bg-theme-glass-border rounded w-3/4"></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="h-12 bg-theme-glass-border rounded-xl"></div>
        <div class="h-12 bg-theme-glass-border rounded-xl"></div>
        <div class="h-12 bg-theme-glass-border rounded-xl"></div>
        <div class="h-12 bg-theme-glass-border rounded-xl"></div>
      </div>
      <div class="h-8 bg-theme-glass-border rounded w-1/2 mt-4"></div>
    </div>

    <!-- AI Result -->
    <div v-else-if="recommendation" class="animate-slide-up relative z-10">
      <div class="p-6 rounded-2xl bg-theme-glass-bg border border-theme-glass-border shadow-inner">
        <p class="text-theme-text-primary italic mb-6 leading-relaxed">
          "{{ recommendation.reasoning }}"
        </p>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div class="text-xs text-theme-text-secondary uppercase tracking-widest mb-1">Top</div>
            <div class="font-bold text-theme-text-primary">{{ recommendation.top }}</div>
          </div>
          <div class="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div class="text-xs text-theme-text-secondary uppercase tracking-widest mb-1">Bottom</div>
            <div class="font-bold text-theme-text-primary">{{ recommendation.bottom }}</div>
          </div>
          <div class="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div class="text-xs text-theme-text-secondary uppercase tracking-widest mb-1">Footwear</div>
            <div class="font-bold text-theme-text-primary">{{ recommendation.footwear }}</div>
          </div>
          <div class="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div class="text-xs text-theme-text-secondary uppercase tracking-widest mb-1">Accessories</div>
            <div class="font-bold text-theme-text-primary">{{ recommendation.accessories.join(', ') }}</div>
          </div>
        </div>

        <!-- Color Palette Snippet -->
        <div>
          <div class="text-xs text-theme-text-secondary uppercase tracking-widest mb-2">Suggested Palette: {{ recommendation.colorPalette.name }}</div>
          <div class="flex gap-2">
            <div 
              v-for="color in recommendation.colorPalette.colors" 
              :key="color"
              class="w-8 h-8 rounded-full shadow-sm border border-white/10 hover:scale-110 transition-transform cursor-pointer"
              :style="{ backgroundColor: color }"
              :title="color"
            />
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
