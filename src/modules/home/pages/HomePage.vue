<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AnimatedWeatherBg from '../components/AnimatedWeatherBg.vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import WeatherGlassCard from '../components/WeatherGlassCard.vue'
import OutfitRecommendationGrid from '../components/OutfitRecommendationGrid.vue'
import FashionTips from '../components/FashionTips.vue'
import TrendingOutfits from '../components/TrendingOutfits.vue'
import WeeklyForecast from '../components/WeeklyForecast.vue'
import OutfitFilters from '../components/OutfitFilters.vue'
import CommunityGallery from '../components/CommunityGallery.vue'
import { weatherApi } from '@/modules/weather/api/weather.api'

// Weather Card State (initialized with sensible fallback)
const weatherData = ref({
  temp: 24,
  location: 'Jakarta, ID',
  humidity: 65,
  wind: 12,
  uv: 4,
  condition: 'partly cloudy',
  icon: '⛅'
})

// Weekly Forecast State
const weeklyForecast = ref<any[]>([])

const getEmojiIcon = (mainCondition: string) => {
  const cond = mainCondition.toLowerCase()
  if (cond.includes('rain') || cond.includes('drizzle')) return '🌧️'
  if (cond.includes('thunder')) return '⛈️'
  if (cond.includes('snow')) return '❄️'
  if (cond.includes('cloud')) return '⛅'
  if (cond.includes('clear') || cond.includes('sun')) return '☀️'
  return '🍃'
}

const getMockOutfitThumb = (mainCondition: string) => {
  const cond = mainCondition.toLowerCase()
  if (cond.includes('rain') || cond.includes('drizzle') || cond.includes('thunder')) {
    return 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=150&auto=format&fit=crop'
  }
  if (cond.includes('clear') || cond.includes('sun')) {
    return 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=150&auto=format&fit=crop'
  }
  return 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=150&auto=format&fit=crop'
}

const estimateUvIndex = (mainCondition: string) => {
  const cond = mainCondition.toLowerCase()
  if (cond.includes('clear') || cond.includes('sun')) return 8
  if (cond.includes('cloud')) return 4
  if (cond.includes('rain') || cond.includes('drizzle')) return 2
  if (cond.includes('thunder')) return 1
  return 5
}

const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    // 1. Fetch Current Weather
    const currentRes = await weatherApi.get('/weather', {
      params: { lat, lon }
    })
    const cData = currentRes.data
    weatherData.value = {
      temp: Math.round(cData.main.temp - 273.15),
      location: cData.name + (cData.sys?.country ? `, ${cData.sys.country}` : ''),
      humidity: cData.main.humidity,
      wind: Math.round(cData.wind.speed * 3.6), // Convert m/s to km/h
      uv: estimateUvIndex(cData.weather[0].main),
      condition: cData.weather[0].description,
      icon: getEmojiIcon(cData.weather[0].main)
    }

    // 2. Fetch Weekly Forecast
    const forecastRes = await weatherApi.get('/forecast', {
      params: { lat, lon }
    })
    parseForecast(forecastRes.data.list)
  } catch (error) {
    console.error('Failed to fetch weather by coords:', error)
    fetchWeatherByCity('Jakarta')
  }
}

const fetchWeatherByCity = async (cityName: string) => {
  try {
    // 1. Fetch Current Weather
    const currentRes = await weatherApi.get('/weather', {
      params: { q: cityName }
    })
    const cData = currentRes.data
    weatherData.value = {
      temp: Math.round(cData.main.temp - 273.15),
      location: cData.name + (cData.sys?.country ? `, ${cData.sys.country}` : ''),
      humidity: cData.main.humidity,
      wind: Math.round(cData.wind.speed * 3.6),
      uv: estimateUvIndex(cData.weather[0].main),
      condition: cData.weather[0].description,
      icon: getEmojiIcon(cData.weather[0].main)
    }

    // 2. Fetch Weekly Forecast
    const forecastRes = await weatherApi.get('/forecast', {
      params: { q: cityName }
    })
    parseForecast(forecastRes.data.list)
  } catch (error) {
    console.error('Failed to fetch weather by city:', error)
  }
}

const parseForecast = (list: any[]) => {
  const dailyForecasts = []
  const seenDates = new Set()
  
  for (const item of list) {
    const dateObj = new Date(item.dt * 1000)
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
    const dateStr = dateObj.toDateString()
    
    // Pick the forecast closest to midday (between 11:00 and 15:00) to represent the day
    const hour = dateObj.getHours()
    if (!seenDates.has(dateStr) && hour >= 11 && hour <= 15) {
      dailyForecasts.push({
        day: dayName,
        temp: Math.round(item.main.temp - 273.15),
        icon: getEmojiIcon(item.weather[0].main),
        outfitThumb: getMockOutfitThumb(item.weather[0].main)
      })
      seenDates.add(dateStr)
    }
  }

  // Fallback: if we didn't capture enough midday options, take the first option for each day
  if (dailyForecasts.length < 5) {
    dailyForecasts.length = 0
    seenDates.clear()
    for (const item of list) {
      const dateObj = new Date(item.dt * 1000)
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
      const dateStr = dateObj.toDateString()
      if (!seenDates.has(dateStr)) {
        dailyForecasts.push({
          day: dayName,
          temp: Math.round(item.main.temp - 273.15),
          icon: getEmojiIcon(item.weather[0].main),
          outfitThumb: getMockOutfitThumb(item.weather[0].main)
        })
        seenDates.add(dateStr)
      }
    }
  }

  weeklyForecast.value = dailyForecasts
}

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        fetchWeatherByCoords(latitude, longitude)
      },
      (error) => {
        console.warn('Geolocation failed or permission denied, using fallback city Jakarta:', error)
        fetchWeatherByCity('Jakarta')
      }
    )
  } else {
    fetchWeatherByCity('Jakarta')
  }
})
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Animated Weather Background (Parallax Layer 0) -->
    <AnimatedWeatherBg />

    <!-- Main Content Layer -->
    <main class="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto">
      
      <!-- Hero Section -->
      <section class="mb-12 relative z-20">
        <HeroCarousel />
      </section>

      <!-- Advanced Features Grid -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        <!-- Left Column: Sticky Widgets -->
        <div class="lg:col-span-4 animate-slide-up" style="animation-delay: 0.2s">
          <div class="sticky top-24 space-y-8">
            <WeatherGlassCard v-bind="weatherData" />
            <FashionTips />
          </div>
        </div>

        <!-- Right Column: Recommendations -->
        <div class="lg:col-span-8">
          
          <!-- Weekly Forecast Horizontal Slider -->
          <div class="animate-slide-up" style="animation-delay: 0.4s">
            <WeeklyForecast :forecast="weeklyForecast" />
          </div>

          <!-- Filters & Traditional Grid -->
          <div class="mt-8 mb-6 animate-slide-up" style="animation-delay: 0.5s">
            <h2 class="text-3xl font-black text-theme-text-primary mb-6">Explore Combinations</h2>
            <OutfitFilters />
          </div>
          
          <OutfitRecommendationGrid />
        </div>
      </section>

      <!-- Trending Section -->
      <section class="animate-slide-up" style="animation-delay: 0.6s">
        <TrendingOutfits />
      </section>

      <!-- Community Gallery -->
      <section>
        <CommunityGallery />
      </section>

    </main>
  </div>
</template>
