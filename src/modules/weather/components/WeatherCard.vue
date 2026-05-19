<script setup lang="ts">
defineProps<{
  temperature: number
  condition: string
}>()
</script>

<template>
  <div class="glass rounded-3xl p-6">
    
    <h2 class="text-4xl font-bold">
      {{ temperature }}°
    </h2>

    <p class="text-slate-300 mt-2">
      {{ condition }}
    </p>

  </div>
</template>