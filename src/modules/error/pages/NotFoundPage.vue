<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-900" />
    <div class="absolute inset-0 backdrop-blur-3xl" />
    
    <!-- Floating Orbs -->
    <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl" />
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

    <!-- Content -->
    <div class="relative z-10 glass rounded-3xl p-12 max-w-lg w-full mx-6 text-center shadow-[0_0_50px_rgba(0,0,0,0.3)]">
      <h1 class="text-8xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
        404
      </h1>
      <h2 class="text-2xl font-bold text-white mb-4">Page Not Found</h2>
      <p class="text-slate-300 mb-8 leading-relaxed">
        Oops! The page you are looking for seems to have vanished into thin air.
      </p>
      
      <BaseButton variant="primary" class="w-full text-lg" @click="goHome">
        Return Home
      </BaseButton>
    </div>
  </div>
</template>
