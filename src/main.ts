import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
import { useThemeStore } from '@/shared/stores/theme.store'

// New modular CSS entry point
import './styles/tailwind.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize the theme system globally
const themeStore = useThemeStore(pinia)
themeStore.initTheme()

app.mount('#app')