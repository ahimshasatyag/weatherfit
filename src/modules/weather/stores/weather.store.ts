import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    temperature: 28,
    condition: 'Sunny',
  }),
})