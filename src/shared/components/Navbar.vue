<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NAV_LINKS } from '@/shared/utils/constants'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { useTheme } from '@/shared/composables/useTheme'

const route = useRoute()
const { currentTheme, Theme, changeTheme } = useTheme()

const handleThemeToggle = () => {
  changeTheme(currentTheme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK)
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-6 py-4">
    <nav class="max-w-4xl mx-auto glass rounded-2xl px-2 py-2 flex items-center justify-between shadow-lg">
      <!-- Logo -->
      <div class="px-4 text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-theme-logo-from to-theme-logo-to cursor-pointer hover:scale-105 transition-all duration-500">
        TempStyle
      </div>

      <!-- Navigation Links -->
      <ul class="hidden md:flex items-center gap-1">
        <li v-for="link in NAV_LINKS" :key="link.name" class="relative group">
          <router-link
            :to="link.path"
            class="relative flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300"
            :class="route.path === link.path ? 'text-theme-text-primary' : 'text-theme-text-secondary hover:text-theme-text-primary'"
          >
            <span class="relative z-10">{{ link.name }}</span>
            <!-- Hover/Active Background Animation -->
            <div
              class="absolute inset-0 bg-theme-glass-bg/50 border border-transparent rounded-xl scale-90 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"
              :class="{ 'opacity-100 scale-100 border-theme-glass-border shadow-md': route.path === link.path }"
            />
          </router-link>
        </li>
      </ul>

      <!-- Action Button & Theme Toggle -->
      <div class="px-2 flex items-center gap-3">
        <button 
          @click="handleThemeToggle" 
          class="w-10 h-10 rounded-full glass flex items-center justify-center text-theme-text-primary hover:scale-110 transition-transform"
          :title="currentTheme === Theme.DARK ? 'Switch to Light' : 'Switch to Dark'"
        >
          <span v-if="currentTheme === Theme.DARK">☀️</span>
          <span v-else>🌙</span>
        </button>
        <BaseButton variant="primary">
          Sign In
        </BaseButton>
      </div>
    </nav>
  </header>
</template>
