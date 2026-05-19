<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="{
      'bg-theme-btn-bg text-theme-btn-text hover:scale-105 shadow-md hover:shadow-lg active:scale-95': variant === 'primary',
      'bg-theme-glass-bg text-theme-text-primary hover:brightness-110 active:scale-95': variant === 'secondary',
      'border border-theme-text-primary text-theme-text-primary hover:bg-theme-glass-bg active:scale-95': variant === 'outline',
    }"
  >
    <slot />
  </button>
</template>
