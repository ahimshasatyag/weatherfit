<script setup lang="ts">
import Navbar from '@/shared/components/Navbar.vue'
import Footer from '@/shared/components/Footer.vue'
import AiBubble from '@/modules/ai/pages/AiBubble.vue'
</script>

<template>
  <div class="min-h-screen w-full relative flex flex-col justify-between">
    <div class="w-full flex-1 flex flex-col">
      <!-- Premium Navbar -->
      <Navbar />

      <!-- Dynamic Page Content with Transitions -->
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" class="flex-1" />
        </transition>
      </router-view>
    </div>

    <!-- Premium Footer -->
    <Footer />

    <!-- Global AI Chat Bubble -->
    <AiBubble />
  </div>
</template>

<style>
/* Smooth Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.98);
}
</style>
