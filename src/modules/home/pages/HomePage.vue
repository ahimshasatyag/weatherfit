<script setup lang="ts">
import AnimatedWeatherBg from '../components/AnimatedWeatherBg.vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import WeatherGlassCard from '../components/WeatherGlassCard.vue'
import OutfitRecommendationGrid from '../components/OutfitRecommendationGrid.vue'
import FashionTips from '../components/FashionTips.vue'
import TrendingOutfits from '../components/TrendingOutfits.vue'
import WeeklyForecast from '../components/WeeklyForecast.vue'
import ColorPalette from '../components/ColorPalette.vue'
import OutfitFilters from '../components/OutfitFilters.vue'
import CommunityGallery from '../components/CommunityGallery.vue'

const mockWeatherData = {
  temp: 24,
  location: 'Jakarta, ID',
  humidity: 65,
  wind: 12,
  uv: 4,
  condition: 'partly cloudy',
  icon: '⛅'
}
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
            <WeatherGlassCard v-bind="mockWeatherData" />
            <ColorPalette />
            <FashionTips />
          </div>
        </div>

        <!-- Right Column: Recommendations -->
        <div class="lg:col-span-8">
          
          <!-- Weekly Forecast Horizontal Slider -->
          <div class="animate-slide-up" style="animation-delay: 0.4s">
            <WeeklyForecast />
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
