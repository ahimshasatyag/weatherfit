<script setup lang="ts">
// LoadingPage digunakan sebagai tampilan transisi saat memuat data dari API
// atau saat menggunakan <Suspense> untuk lazy-loading komponen.
</script>

<template>
  <div class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
    <!-- Animated Background Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-sky-900/40 via-slate-900 to-indigo-900/40 animate-pulse" />
    <div class="absolute inset-0 backdrop-blur-2xl" />

    <div class="relative z-10 flex flex-col items-center">
      <!-- Premium Animated Spinner -->
      <div class="relative w-24 h-24 mb-8">
        <!-- Static Track -->
        <div class="absolute inset-0 border-4 border-white/5 rounded-full" />
        <!-- Spinning Gradient Ring -->
        <div class="absolute inset-0 border-4 border-t-sky-400 border-r-indigo-400 border-b-transparent border-l-transparent rounded-full animate-spin [animation-duration:1s]" />
        <!-- Inner Beating Core -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-8 h-8 bg-gradient-to-tr from-sky-400 to-indigo-400 rounded-full blur-md animate-pulse" />
          <div class="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]" />
        </div>
      </div>
      
      <!-- Typography -->
      <h2 class="text-3xl font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 animate-pulse">
        TEMPSTYLE
      </h2>
      <p class="mt-4 text-slate-400 text-xs font-semibold tracking-[0.3em] uppercase">
        Preparing Experience
      </p>
    </div>
  </div>
</template>
