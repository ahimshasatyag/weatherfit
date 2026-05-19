import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Theme, THEME_STORAGE_KEY } from '../constants/theme.constants'

export const useThemeStore = defineStore('theme', () => {
  const activeTheme = ref<Theme>(Theme.DARK)

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
    if (savedTheme && Object.values(Theme).includes(savedTheme)) {
      setTheme(savedTheme)
    } else {
      setTheme(Theme.DARK)
    }
  }

  const setTheme = (theme: Theme) => {
    activeTheme.value = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return {
    activeTheme,
    initTheme,
    setTheme
  }
})
