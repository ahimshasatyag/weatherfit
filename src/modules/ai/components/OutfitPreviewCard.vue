<script setup lang="ts">
import type { ChatMessage } from '../types/ai.types'

defineProps<{
  msg: ChatMessage
  isFav: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleFav', msg: ChatMessage): void
  (e: 'regenerate', text: string): void
}>()
</script>

<template>
  <div v-if="msg.outfitCard" class="mt-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden w-full max-w-full animate-fade-in text-left">
    
    <!-- Card Header -->
    <div class="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 px-3 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
      <span class="text-[11px] font-bold text-violet-600 dark:text-sky-400 flex items-center gap-1">
        ✨ Rekomendasi Outfit
      </span>
      <button 
        @click="emit('toggleFav', msg)"
        class="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        title="Simpan Outfit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" :fill="isFav ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" :class="isFav ? 'text-red-500' : ''">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <!-- Card Items Grid -->
    <div class="p-2.5 space-y-2">
      <div 
        v-for="item in msg.outfitCard.items" 
        :key="item.name"
        class="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-700 shadow-sm"
      >
        <div class="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-750">
          <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[9px] font-bold text-violet-500 dark:text-sky-400 uppercase tracking-wider">{{ item.category }}</div>
          <div class="text-xs font-bold text-slate-800 dark:text-slate-250 truncate">{{ item.name }}</div>
          <div class="text-[10px] text-slate-500 dark:text-slate-400">Warna: {{ item.color }}</div>
        </div>
      </div>
    </div>

    <!-- Mix & Match Recommendation -->
    <div class="px-3.5 py-3 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-700 text-left">
      <div class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">💡 Tips Padu Padan</div>
      <p class="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
        {{ msg.outfitCard.recommendation }}
      </p>
    </div>

    <!-- Action Button: Generate Another Style -->
    <div v-if="msg.isRegenerateable" class="p-2 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <button 
        @click="emit('regenerate', msg.text)"
        class="w-full py-1.5 rounded-lg border border-violet-100 hover:border-violet-300 dark:border-slate-700 dark:hover:bg-slate-750 text-xs font-bold text-violet-650 dark:text-sky-400 hover:bg-violet-50 transition-colors flex items-center justify-center gap-1.5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
        </svg>
        Generate Another Style (Opsi Lain)
      </button>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
