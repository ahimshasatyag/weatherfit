<script setup lang="ts">
const filters = ['All Seasons', 'Summer', 'Winter', 'Monsoon']
const styles = ['Any Style', 'Streetwear', 'Casual', 'Formal', 'Sport']
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 mb-8">
    <div class="relative flex-1">
      <input 
        type="text" 
        placeholder="Search brands, styles, or occasions..." 
        class="w-full bg-theme-glass-bg border border-theme-glass-border rounded-2xl pl-12 pr-4 py-3.5 text-theme-text-primary outline-none focus:ring-2 focus:ring-sky-400/50 transition-all shadow-sm"
      />
      <div class="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-secondary">
        🔍
      </div>
    </div>
    
    <div class="flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
      <select class="bg-theme-glass-bg border border-theme-glass-border rounded-xl px-4 py-3 text-theme-text-primary outline-none focus:ring-2 focus:ring-sky-400/50 cursor-pointer text-sm">
        <option v-for="f in filters" :key="f">{{ f }}</option>
      </select>
      <select class="bg-theme-glass-bg border border-theme-glass-border rounded-xl px-4 py-3 text-theme-text-primary outline-none focus:ring-2 focus:ring-sky-400/50 cursor-pointer text-sm">
        <option v-for="s in styles" :key="s">{{ s }}</option>
      </select>
    </div>
  </div>
</template>
