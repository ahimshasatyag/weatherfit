<script setup lang="ts">
// Dummy props for the weather card
defineProps<{
  temp: number
  location: string
  humidity: number
  wind: number
  uv: number
  condition: string
  icon: string
}>()
</script>

<template>
  <div class="glass rounded-3xl p-8 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(56,189,248,0.2)] transition-all duration-500 hover:-translate-y-2">
    <!-- Decorative Glow -->
    <div class="absolute -top-20 -right-20 w-40 h-40 bg-sky-400/20 rounded-full blur-3xl group-hover:bg-sky-400/30 transition-colors" />

    <div class="flex justify-between items-start mb-8 relative z-10">
      <div>
        <h3 class="text-slate-400 text-sm font-semibold tracking-widest uppercase mb-1">Current Location</h3>
        <h2 class="text-2xl font-bold text-theme-text-primary">{{ location }}</h2>
      </div>
      <div class="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center animate-float">
        <span class="text-4xl">{{ icon }}</span>
      </div>
    </div>

    <div class="mb-8 relative z-10">
      <div class="flex items-end gap-2">
        <span class="text-7xl font-light text-theme-text-primary tracking-tighter">{{ temp }}°</span>
        <span class="text-xl text-theme-text-secondary pb-2 capitalize">{{ condition }}</span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 relative z-10 border-t border-theme-glass-border pt-6 mt-6">
      <div>
        <div class="text-slate-400 text-xs uppercase tracking-wider mb-1">Humidity</div>
        <div class="text-theme-text-primary font-semibold">{{ humidity }}%</div>
      </div>
      <div>
        <div class="text-slate-400 text-xs uppercase tracking-wider mb-1">Wind</div>
        <div class="text-theme-text-primary font-semibold">{{ wind }} km/h</div>
      </div>
      <div>
        <div class="text-slate-400 text-xs uppercase tracking-wider mb-1">UV Index</div>
        <div class="text-theme-text-primary font-semibold">{{ uv }}</div>
      </div>
    </div>
  </div>
</template>
