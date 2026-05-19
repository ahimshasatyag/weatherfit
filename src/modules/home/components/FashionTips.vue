<script setup lang="ts">
import { mockFashionTips } from '../utils/mockData'
</script>

<template>
  <div class="glass rounded-3xl p-8">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-theme-text-primary">Today's Fashion Tips</h2>
      <button class="text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors">View All</button>
    </div>
    
    <div class="space-y-4">
      <div 
        v-for="(tip, index) in mockFashionTips" 
        :key="tip.id"
        class="group p-4 rounded-2xl bg-theme-glass-bg border border-theme-glass-border hover:bg-white/5 transition-all duration-300 flex gap-4 cursor-pointer hover:translate-x-2"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 group-hover:bg-sky-400/20 transition-all">
          {{ tip.icon }}
        </div>
        <div>
          <h3 class="font-bold text-theme-text-primary mb-1">{{ tip.title }}</h3>
          <p class="text-sm text-theme-text-secondary leading-relaxed">{{ tip.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
