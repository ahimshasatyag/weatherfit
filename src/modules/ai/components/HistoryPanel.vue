<script setup lang="ts">
import type { ChatMessage } from '../types/ai.types'

defineProps<{
  history: any[]
}>()

const emit = defineEmits<{
  (e: 'deleteItem', id: string): void
  (e: 'clearAll'): void
  (e: 'openInChat', msg: ChatMessage): void
}>()
</script>

<template>
  <div class="p-4 space-y-3 text-left">
    <h4 class="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
      <span>📜 Riwayat Rekomendasi</span>
      <button 
        v-if="history.length > 0"
        @click="emit('clearAll')"
        type="button"
        class="text-[10px] font-bold text-red-500 hover:underline"
      >
        Hapus Semua
      </button>
    </h4>

    <div v-if="history.length === 0" class="py-12 text-center text-slate-450 dark:text-slate-550 flex flex-col items-center gap-2">
      <span class="text-3xl">⏱️</span>
      <p class="text-xs font-semibold">Belum ada riwayat konsultasi.</p>
    </div>

    <div v-else class="space-y-3">
      <div 
        v-for="hist in history" 
        :key="hist.id"
        class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:border-violet-300 dark:hover:border-sky-900 transition-all space-y-2 relative"
      >
        <div class="flex justify-between items-start">
          <div class="font-bold text-xs text-slate-850 dark:text-white truncate max-w-[70%]">
            "{{ hist.prompt }}"
          </div>
          <span class="text-[9px] text-slate-400 dark:text-slate-500 shrink-0">
            {{ new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </span>
        </div>

        <p v-if="hist.aiResponse" class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {{ hist.aiResponse.text }}
        </p>

        <div class="flex justify-end gap-3 pt-1">
          <button 
            @click="emit('openInChat', hist.aiResponse)"
            type="button"
            class="text-[10px] font-bold text-[#6b21a8] dark:text-sky-400 hover:underline"
          >
            Buka
          </button>
          <button 
            @click="emit('deleteItem', hist.id)"
            type="button"
            class="text-[10px] font-bold text-red-500 hover:underline"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
