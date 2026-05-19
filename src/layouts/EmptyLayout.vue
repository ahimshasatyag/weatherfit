<script setup lang="ts">
// Empty Layout digunakan untuk halaman yang tidak membutuhkan Navbar/Footer (seperti 404, Login, dll)
</script>

<template>
  <main class="min-h-screen w-full relative bg-slate-900 text-white selection:bg-sky-500/30">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
