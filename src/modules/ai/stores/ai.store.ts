import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { ChatMessage, UserPreference } from '../types/ai.types'
import { aiChatService } from '../services/ai.service'
import { weatherApi } from '../../weather/api/weather.api'
import { useWeatherStore } from '../../weather/stores/weather.store'
import { generateId } from '../utils/id'
import { parseOutfitBlock } from '../utils/parser'

export const useAiStore = defineStore('aiStore', () => {
  const isOpen = ref(false)
  const isTyping = ref(false)
  const activeTab = ref<'chat' | 'filter' | 'favorites' | 'history'>('chat')

  const preferences = ref<UserPreference>(
    JSON.parse(localStorage.getItem('satya_preferences') || 'null') || {
      gender: 'Unisex',
      age: 23,
      stylePreference: 'Casual',
      favoriteColor: 'Navy',
      budget: 'Mid'
    }
  )

  const favorites = ref<ChatMessage[]>(
    JSON.parse(localStorage.getItem('satya_favorites') || '[]')
  )

  const history = ref<any[]>(
    JSON.parse(localStorage.getItem('satya_history') || '[]')
  )

  const messages = ref<ChatMessage[]>([])

  // Persist preferences in localStorage
  watch(preferences, (newVal) => {
    localStorage.setItem('satya_preferences', JSON.stringify(newVal))
  }, { deep: true })

  const toggleChat = () => {
    isOpen.value = !isOpen.value
  }

  const toggleFavorite = (msg: ChatMessage) => {
    const idx = favorites.value.findIndex(f => f.id === msg.id)
    if (idx > -1) {
      favorites.value.splice(idx, 1)
    } else {
      favorites.value.push(msg)
    }
    localStorage.setItem('satya_favorites', JSON.stringify(favorites.value))
  }

  const isFavorite = (msgId: string) => {
    return favorites.value.some(f => f.id === msgId)
  }

  const deleteHistoryItem = (id: string) => {
    const idx = history.value.findIndex(h => h.id === id)
    if (idx > -1) {
      history.value.splice(idx, 1)
      localStorage.setItem('satya_history', JSON.stringify(history.value))
    }
  }

  const clearAllHistory = () => {
    history.value = []
    localStorage.removeItem('satya_history')
  }

  const sendMessage = async (text: string, base64Image?: string) => {
    if (!text.trim() && !base64Image) return

    // Add user message
    const userMsgId = generateId()
    messages.value.push({
      id: userMsgId,
      sender: 'user',
      text: text.trim() || "Mengunggah foto pakaian...",
      timestamp: new Date(),
      base64Image: base64Image
    })

    isTyping.value = true

    try {
      // Gather real-time weather & user preferences
      const weatherStore = useWeatherStore()
      const weatherInfo = `Cuaca saat ini: ${weatherStore.condition}, suhu sekitar ${weatherStore.temperature}°C.`
      const prefInfo = `Preferensi pengguna: Gender: ${preferences.value.gender}, Umur: ${preferences.value.age} tahun, Preferensi Style: ${preferences.value.stylePreference}, Warna Favorit: ${preferences.value.favoriteColor}, Budget Tier: ${preferences.value.budget}.`

      const promptContext = `${weatherInfo}\n${prefInfo}\n\nPastikan mematuhi preferensi ini saat menjawab.\nFormat kartu outfit di bagian paling akhir balasan Anda tepat di dalam tag [OUTFIT_START] dan [OUTFIT_END] dengan menyertakan Category, Name, Color, dan Image (gunakan URL Unsplash riil yang relevan dari pustaka kurasi fashion) serta Recommendation. Formatnya harus mengikuti baris ini:\nCategory: [Atasan/Bawahan/Sepatu/Aksesori] | Name: [Nama barang] | Color: [Warna] | Image: [URL Gambar]\nRecommendation: [Rangkuman mix and match]\n\nGunakan tautan gambar Unsplash yang aesthetic berikut sebagai pustaka gambar Anda:\n- Kaos/Kemeja/Outer: https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=300\n- Celana/Bawahan: https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=300\n- Jaket/Winter: https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300\n- Gaun/Dress: https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300\n- Sepatu/Sneakers: https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300\n- Tas/Topi: https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300\n- Mantel Hujan: https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=300\n\nUser message: ${text}`

      // Fetch AI response
      const responseText = await aiChatService.getResponse(promptContext, base64Image)
      
      // Parse outfit block if present
      const outfitCard = parseOutfitBlock(responseText)
      const cleanText = responseText.replace(/\[OUTFIT_START\][\s\S]+?\[OUTFIT_END\]/, '').trim()

      const aiMsg: ChatMessage = {
        id: generateId(),
        sender: 'ai',
        text: cleanText,
        timestamp: new Date(),
        outfitCard: outfitCard || undefined,
        isRegenerateable: true
      }

      messages.value.push(aiMsg)

      // Add to history
      history.value.unshift({
        id: generateId(),
        prompt: text || "Mengunggah foto pakaian...",
        aiResponse: aiMsg,
        timestamp: new Date()
      })
      localStorage.setItem('satya_history', JSON.stringify(history.value))

    } catch (error: any) {
      messages.value.push({
        id: generateId(),
        sender: 'ai',
        text: `Sorry, I'm having trouble connecting to my styling database right now. (Error: ${error.message || error})`,
        timestamp: new Date()
      })
    } finally {
      isTyping.value = false
    }
  }

  const regenerateStyle = async (originalPrompt: string) => {
    isTyping.value = true

    try {
      const weatherStore = useWeatherStore()
      const weatherInfo = `Cuaca saat ini: ${weatherStore.condition}, suhu sekitar ${weatherStore.temperature}°C.`
      const prefInfo = `Preferensi pengguna: Gender: ${preferences.value.gender}, Umur: ${preferences.value.age} tahun, Preferensi Style: ${preferences.value.stylePreference}, Warna Favorit: ${preferences.value.favoriteColor}, Budget Tier: ${preferences.value.budget}.`

      const promptContext = `${weatherInfo}\n${prefInfo}\n\nBerikan REKOMENDASI OUTFIT ALTERNATIF (opsi kedua) berdasarkan preferensi ini.\nFormat kartu outfit di bagian paling akhir balasan Anda tepat di dalam tag [OUTFIT_START] dan [OUTFIT_END] dengan menyertakan Category, Name, Color, dan Image (gunakan URL Unsplash riil yang relevan dari pustaka kurasi fashion) serta Recommendation. Formatnya harus mengikuti baris ini:\nCategory: [Atasan/Bawahan/Sepatu/Aksesori] | Name: [Nama barang] | Color: [Warna] | Image: [URL Gambar]\nRecommendation: [Rangkuman mix and match]\n\nGunakan pustaka gambar Unsplash di atas.\n\nOriginal request: ${originalPrompt}`

      const responseText = await aiChatService.getResponse(promptContext)
      
      const outfitCard = parseOutfitBlock(responseText)
      const cleanText = responseText.replace(/\[OUTFIT_START\][\s\S]+?\[OUTFIT_END\]/, '').trim()

      const aiMsg: ChatMessage = {
        id: generateId(),
        sender: 'ai',
        text: cleanText,
        timestamp: new Date(),
        outfitCard: outfitCard || undefined,
        isRegenerateable: true
      }

      messages.value.push(aiMsg)

      // Add to history
      history.value.unshift({
        id: generateId(),
        prompt: `Alternatif: ${originalPrompt}`,
        aiResponse: aiMsg,
        timestamp: new Date()
      })
      localStorage.setItem('satya_history', JSON.stringify(history.value))

    } catch (error: any) {
      messages.value.push({
        id: generateId(),
        sender: 'ai',
        text: `Sorry, I couldn't generate an alternative style. (Error: ${error.message || error})`,
        timestamp: new Date()
      })
    } finally {
      isTyping.value = false
    }
  }

  const selectOption = async (messageId: string, option: string) => {
    // Clear options of the selected message so they cannot be clicked again
    const msg = messages.value.find(m => m.id === messageId)
    if (msg) {
      msg.options = undefined
    }

    if (option === '🌍 Cek cuaca lokasi Anda') {
      isTyping.value = true
      // Add user indicator
      messages.value.push({
        id: generateId(),
        sender: 'user',
        text: 'Cek cuaca lokasi saya saat ini',
        timestamp: new Date()
      })

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'))
          } else {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0
            })
          }
        })

        const { latitude, longitude } = position.coords

        // Fetch weather from OpenWeatherMap API using lat/lon
        const response = await weatherApi.get('/weather', {
          params: {
            lat: latitude,
            lon: longitude
          }
        })

        const weather = response.data
        const tempCelsius = Math.round(weather.main.temp - 273.15)
        const condition = weather.weather[0]?.description || 'cerah'
        const city = weather.name

        // Set weather in the store so it syncs real-time
        const weatherStore = useWeatherStore()
        weatherStore.temperature = tempCelsius
        weatherStore.condition = weather.weather[0]?.main || 'Sunny'

        // Formulate request
        const requestText = `Rekomendasi pakaian untuk cuaca saat ini di ${city} (${condition}, ${tempCelsius}°C)`
        await sendMessage(requestText)

      } catch (error: any) {
        console.error("Gagal mendapatkan lokasi/cuaca:", error)
        let errorMsg = "Maaf, saya tidak dapat mengakses lokasi Anda. Silakan ketik nama kota Anda secara manual (contoh: 'cuaca Jakarta') agar saya bisa memberikan rekomendasi pakaian!"
        
        if (error.code === 1) { // PERMISSION_DENIED
          errorMsg = "Akses lokasi ditolak. Silakan ketik nama kota Anda secara manual (contoh: 'cuaca Jakarta') agar saya bisa merekomendasikan pakaian yang sesuai!"
        } else if (error.code === 3) { // TIMEOUT
          errorMsg = "Koneksi pencarian lokasi terputus (timeout). Silakan ketik nama kota Anda secara manual (contoh: 'cuaca Bandung')."
        }

        messages.value.push({
          id: generateId(),
          sender: 'ai',
          text: errorMsg,
          timestamp: new Date()
        })
        isTyping.value = false
      }
    } else {
      await sendMessage(option)
    }
  }

  return {
    isOpen,
    isTyping,
    messages,
    activeTab,
    preferences,
    favorites,
    history,
    toggleChat,
    sendMessage,
    selectOption,
    regenerateStyle,
    toggleFavorite,
    isFavorite,
    deleteHistoryItem,
    clearAllHistory
  }
})
