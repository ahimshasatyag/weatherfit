<script setup lang="ts">
import { ref } from 'vue'
import { weatherApi } from '@/modules/weather/api/weather.api'
import { useTheme } from '@/shared/composables/useTheme'

const city = ref('')
const isLoading = ref(false)
const weatherData = ref<any>(null)
const errorMessage = ref('')

const { changeTheme, Theme } = useTheme()

const updateThemeBasedOnWeather = (weatherCondition: string) => {
  const condition = weatherCondition.toLowerCase()
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder')) {
    changeTheme(Theme.RAINY)
  } else if (condition.includes('clear') || condition.includes('sun')) {
    changeTheme(Theme.SUNNY)
  } else if (condition.includes('cloud')) {
    changeTheme(Theme.LIGHT)
  } else {
    changeTheme(Theme.DARK)
  }
}

const fetchWeather = async () => {
  if (!city.value.trim()) return

  isLoading.value = true
  errorMessage.value = ''
  weatherData.value = null

  try {
    const response = await weatherApi.get('/weather', {
      params: {
        q: city.value
      }
    })
    weatherData.value = response.data
    
    // Automatically change the visual theme based on the weather condition
    if (response.data.weather && response.data.weather.length > 0) {
      updateThemeBasedOnWeather(response.data.weather[0].main)
    }

  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Gagal mengambil data cuaca'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen relative overflow-hidden">
    
    <!-- Content -->
    <section
      class="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-12 px-6 text-center"
    >
      <div class="glass rounded-3xl p-10 max-w-xl w-full transition-all duration-500">

        <h1 class="text-5xl font-bold leading-tight mb-4 text-theme-text-primary transition-colors duration-500">
          WeatherFit
        </h1>

        <p class="text-theme-text-secondary mb-8 transition-colors duration-500">
          AI-powered outfit recommendations based on weather conditions.
        </p>

        <div class="space-y-4">
          <input
            v-model="city"
            @keyup.enter="fetchWeather"
            type="text"
            placeholder="Enter your city..."
            class="w-full px-4 py-3 rounded-2xl bg-theme-glass-bg border border-theme-glass-border outline-none text-theme-text-primary placeholder-theme-text-secondary focus:ring-2 focus:ring-theme-btn-bg/50 transition-all duration-500"
          />

          <button
            @click="fetchWeather"
            :disabled="isLoading"
            class="w-full py-3 rounded-2xl bg-theme-btn-bg text-theme-btn-text font-semibold hover:scale-[1.02] transition-all duration-500 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
          >
            {{ isLoading ? 'Loading...' : 'Generate Outfit' }}
          </button>
        </div>

        <!-- Feedback Area -->
        <div v-if="errorMessage" class="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 font-bold shadow-sm">
          {{ errorMessage }}
        </div>

        <div v-if="weatherData" class="mt-6 p-6 rounded-2xl glass text-left animate-fade-in transition-all duration-500">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold text-theme-text-primary transition-colors duration-500">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
            <img :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" :alt="weatherData.weather[0].description" class="w-16 h-16" />
          </div>
          <div class="text-4xl font-light text-theme-text-primary mb-4 transition-colors duration-500">
            {{ Math.round(weatherData.main.temp - 273.15) }}°C
          </div>
          <p class="text-theme-text-secondary capitalize transition-colors duration-500">{{ weatherData.weather[0].description }}</p>
          <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-theme-glass-border text-sm text-theme-text-secondary transition-colors duration-500">
            <div>Feels like: {{ Math.round(weatherData.main.feels_like - 273.15) }}°C</div>
            <div>Humidity: {{ weatherData.main.humidity }}%</div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>