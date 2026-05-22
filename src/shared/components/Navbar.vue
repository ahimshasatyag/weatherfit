<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { NAV_LINKS } from '@/shared/utils/constants'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { useTheme } from '@/shared/composables/useTheme'

const route = useRoute()
const { currentTheme, Theme, changeTheme } = useTheme()
const isMenuOpen = ref(false)

const handleThemeToggle = () => {
  changeTheme(currentTheme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK)
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-6 py-4">
    <nav class="max-w-4xl mx-auto glass rounded-2xl px-2 py-2 flex flex-col md:flex-row md:items-center justify-between shadow-lg transition-all duration-300">
      <!-- Top Row: Logo & Mobile Menu Controls -->
      <div class="w-full flex items-center justify-between md:w-auto">
        <!-- Logo -->
        <div class="px-4 text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-theme-logo-from to-theme-logo-to cursor-pointer hover:scale-105 transition-all duration-500">
          TempStyle
        </div>

        <!-- Mobile Controls (Theme Toggle & Hamburger Button) -->
        <div class="flex items-center gap-2 md:hidden px-2">
          <button 
            @click="handleThemeToggle" 
            class="w-10 h-10 rounded-full glass flex items-center justify-center text-theme-text-primary hover:scale-110 transition-transform cursor-pointer"
            :title="currentTheme === Theme.DARK ? 'Switch to Light' : 'Switch to Dark'"
          >
            <span v-if="currentTheme === Theme.DARK">☀️</span>
            <span v-else>🌙</span>
          </button>
          
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="w-10 h-10 rounded-xl glass flex flex-col items-center justify-center gap-1.5 text-theme-text-primary hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            <span 
              class="w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center"
              :class="isMenuOpen ? 'rotate-45 translate-y-2' : ''"
            />
            <span 
              class="w-5 h-0.5 bg-current rounded transition-all duration-300"
              :class="isMenuOpen ? 'opacity-0 scale-x-0' : ''"
            />
            <span 
              class="w-5 h-0.5 bg-current rounded transition-all duration-300 origin-center"
              :class="isMenuOpen ? '-rotate-45 -translate-y-2' : ''"
            />
          </button>
        </div>
      </div>

      <!-- Navigation Links (Desktop Only) -->
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

      <!-- Desktop Action & Theme Toggle (Hidden on Mobile) -->
      <div class="hidden md:flex px-2 items-center gap-3">
        <button 
          @click="handleThemeToggle" 
          class="w-10 h-10 rounded-full glass flex items-center justify-center text-theme-text-primary hover:scale-110 transition-transform cursor-pointer"
          :title="currentTheme === Theme.DARK ? 'Switch to Light' : 'Switch to Dark'"
        >
          <span v-if="currentTheme === Theme.DARK">☀️</span>
          <span v-else>🌙</span>
        </button>
        <BaseButton variant="primary">
          Sign In
        </BaseButton>
      </div>

      <!-- Mobile Dropdown Menu -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="max-h-0 opacity-0 overflow-hidden"
        enter-to-class="max-h-[400px] opacity-100 overflow-hidden"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="max-h-[400px] opacity-100 overflow-hidden"
        leave-to-class="max-h-0 opacity-0 overflow-hidden"
      >
        <div 
          v-if="isMenuOpen"
          class="w-full md:hidden flex flex-col gap-4 mt-4 px-4 pb-4 border-t border-theme-glass-border/30 pt-4"
        >
          <ul class="flex flex-col gap-2">
            <li v-for="link in NAV_LINKS" :key="link.name">
              <router-link
                :to="link.path"
                @click="isMenuOpen = false"
                class="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-theme-glass-bg/50 border border-transparent hover:border-theme-glass-border"
                :class="route.path === link.path ? 'text-theme-text-primary bg-theme-glass-bg/60 border-theme-glass-border shadow-sm' : 'text-theme-text-secondary hover:text-theme-text-primary'"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
          <BaseButton variant="primary" class="w-full flex items-center justify-center">
            Sign In
          </BaseButton>
        </div>
      </transition>
    </nav>
  </header>
</template>
