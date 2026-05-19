import { computed } from 'vue'
import { useThemeStore } from '../stores/theme.store'
import { Theme } from '../constants/theme.constants'

export const useTheme = () => {
  const themeStore = useThemeStore()

  const currentTheme = computed(() => themeStore.activeTheme)

  const changeTheme = (theme: Theme) => {
    themeStore.setTheme(theme)
  }

  const toggleLightDark = () => {
    if (currentTheme.value === Theme.LIGHT) {
      changeTheme(Theme.DARK)
    } else {
      changeTheme(Theme.LIGHT)
    }
  }

  return {
    currentTheme,
    changeTheme,
    toggleLightDark,
    Theme
  }
}
