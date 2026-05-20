<script setup lang="ts">
import type { UserPreference } from '../types/ai.types'

defineProps<{
  preferences: UserPreference
}>()

const emit = defineEmits<{
  (e: 'apply'): void
}>()

const colors = ['Navy', 'Beige', 'Cream', 'Sage Green', 'Black', 'White', 'Gray', 'Olive']
</script>

<template>
  <div class="p-4 space-y-4 text-left">
    <h4 class="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">🎛️ Preferensi Gaya Anda</h4>
    
    <!-- Gender Filter -->
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-450">Gender</label>
      <div class="flex gap-2">
        <button 
          v-for="g in ['Pria', 'Wanita', 'Unisex']" 
          :key="g"
          @click="preferences.gender = (g as any)"
          type="button"
          class="flex-1 py-2 text-xs font-bold rounded-xl border transition-all"
          :class="preferences.gender === g 
            ? 'bg-[#6b21a8] text-white border-[#6b21a8]' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'"
        >
          {{ g }}
        </button>
      </div>
    </div>

    <!-- Age Filter -->
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <label class="text-xs font-bold text-slate-500 dark:text-slate-455">Umur</label>
        <span class="text-xs font-bold text-[#6b21a8] dark:text-sky-400">{{ preferences.age }} tahun</span>
      </div>
      <input 
        v-model.number="preferences.age" 
        type="range" 
        min="12" 
        max="80" 
        class="w-full accent-[#6b21a8] dark:accent-sky-400 bg-slate-200 dark:bg-slate-700 rounded-lg h-2"
      />
    </div>

    <!-- Style Preference -->
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-455">Style Preference</label>
      <div class="grid grid-cols-2 gap-2">
        <button 
          v-for="s in ['Streetwear', 'Casual', 'Formal', 'Sporty', 'Vintage']" 
          :key="s"
          @click="preferences.stylePreference = (s as any)"
          type="button"
          class="py-2 text-xs font-bold rounded-xl border transition-all"
          :class="preferences.stylePreference === s 
            ? 'bg-[#6b21a8] text-white border-[#6b21a8]' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <!-- Favorite Color -->
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-455">Warna Favorit</label>
      <input 
        v-model="preferences.favoriteColor" 
        type="text" 
        placeholder="Masukkan warna..."
        class="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-violet-400/50"
      />
      <div class="flex gap-2 overflow-x-auto py-1 shrink-0">
        <button 
          v-for="c in colors" 
          :key="c"
          @click="preferences.favoriteColor = c"
          type="button"
          class="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-450 dark:hover:border-slate-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-350 shrink-0"
        >
          {{ c }}
        </button>
      </div>
    </div>

    <!-- Budget Level -->
    <div class="space-y-2">
      <label class="text-xs font-bold text-slate-500 dark:text-slate-455">Budget Outfit</label>
      <div class="flex gap-2">
        <button 
          v-for="b in ['Low', 'Mid', 'High']" 
          :key="b"
          @click="preferences.budget = (b as any)"
          type="button"
          class="flex-1 py-2 text-xs font-bold rounded-xl border transition-all"
          :class="preferences.budget === b 
            ? 'bg-[#6b21a8] text-white border-[#6b21a8]' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'"
        >
          {{ b }} Tier
        </button>
      </div>
    </div>

    <div class="pt-4 border-t border-slate-200 dark:border-slate-800">
      <button 
        @click="emit('apply')"
        type="button"
        class="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#6b21a8] to-[#4c1d95] text-white font-bold text-xs hover:shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
      >
        💾 Simpan & Terapkan Preferensi
      </button>
    </div>

  </div>
</template>
