<script setup lang="ts">
import type { ChatMessage } from '../types/ai.types'

defineProps<{
  favorites: ChatMessage[]
}>()

const emit = defineEmits<{
  (e: 'toggleFav', msg: ChatMessage): void
  (e: 'openInChat', msg: ChatMessage): void
}>()
</script>

<template>
  <div class="p-4 space-y-3 text-left">
    <h4 class="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
      <span>❤️ Outfit Tersimpan</span>
      <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-650 dark:bg-red-950/50 dark:text-red-400">{{ favorites.length }}</span>
    </h4>

    <div v-if="favorites.length === 0" class="py-12 text-center text-slate-450 dark:text-slate-550 flex flex-col items-center gap-2">
      <span class="text-3xl">🗂️</span>
      <p class="text-xs font-semibold">Belum ada outfit yang disimpan.</p>
      <button @click="emit('openInChat', null as any)" type="button" class="text-xs text-[#6b21a8] dark:text-sky-400 font-bold hover:underline">Ayo cari outfit terbaik!</button>
    </div>

    <div v-else class="space-y-3">
      <div 
        v-for="fav in favorites" 
        :key="fav.id"
        class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:border-red-300 dark:hover:border-red-900 transition-all space-y-2.5 relative"
      >
        <!-- Items list summary -->
        <div v-if="fav.outfitCard" class="flex gap-1.5 overflow-x-auto shrink-0 py-1">
          <div 
            v-for="item in fav.outfitCard.items" 
            :key="item.name"
            class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-750 shrink-0 text-[10px]"
          >
            <span class="font-bold text-[#6b21a8] dark:text-sky-400 uppercase">{{ item.category.substring(0, 3) }}</span>
            <span class="font-semibold text-slate-700 dark:text-slate-350 truncate max-w-20">{{ item.name }}</span>
          </div>
        </div>

        <!-- Text Body -->
        <p class="text-[11px] text-slate-600 dark:text-slate-350 line-clamp-3 leading-normal font-semibold">
          {{ fav.text }}
        </p>

        <!-- Actions -->
        <div class="flex justify-between items-center pt-2 border-t border-slate-150 dark:border-slate-750">
          <span class="text-[9px] text-slate-450 dark:text-slate-550">{{ new Date(fav.timestamp).toLocaleDateString() }}</span>
          <div class="flex gap-2">
            <button 
              @click="emit('openInChat', fav)"
              type="button"
              class="text-xs font-bold text-[#6b21a8] dark:text-sky-400 hover:underline"
            >
              Buka di Obrolan
            </button>
            <button 
              @click="emit('toggleFav', fav)"
              type="button"
              class="text-xs font-bold text-red-500 hover:underline"
            >
              Hapus
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
