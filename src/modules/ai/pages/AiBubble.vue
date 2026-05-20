<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useAiStore } from '../stores/ai.store'
import { useWeatherStore } from '../../weather/stores/weather.store'
import { storeToRefs } from 'pinia'
import { parseMarkdown } from '../utils/parser'
import { useSpeechRecognition } from '../composables/useSpeechRecognition'
import FilterPanel from '../components/FilterPanel.vue'
import FavoritesPanel from '../components/FavoritesPanel.vue'
import HistoryPanel from '../components/HistoryPanel.vue'
import OutfitPreviewCard from '../components/OutfitPreviewCard.vue'

const aiStore = useAiStore()
const weatherStore = useWeatherStore()

const { isOpen, messages, isTyping, activeTab, preferences, favorites, history } = storeToRefs(aiStore)
const { 
  toggleChat, 
  sendMessage, 
  selectOption, 
  regenerateStyle, 
  toggleFavorite, 
  isFavorite, 
  deleteHistoryItem, 
  clearAllHistory 
} = aiStore

const userInput = ref('')
const chatContainer = ref<HTMLElement | null>(null)
const showTooltip = ref(false) // Hidden initially, will show after 2 mins

const initialTimeoutId = ref<number | null>(null)
const reappearTimeoutId = ref<number | null>(null)

// Image upload references
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)

// Integrate modular speech recognition composable
const { isListening, toggleSpeech } = useSpeechRecognition((resultText) => {
  userInput.value = resultText
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handlePhotoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const removeImagePreview = () => {
  imagePreview.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Triggers the tooltip to disappear and set a 5-minute timer to reappear
const handleCloseTooltip = () => {
  showTooltip.value = false
  if (reappearTimeoutId.value) clearTimeout(reappearTimeoutId.value)
  
  reappearTimeoutId.value = window.setTimeout(() => {
    if (!isOpen.value) {
      showTooltip.value = true
    }
  }, 300000) // 5 minutes in ms
}

onMounted(() => {
  initialTimeoutId.value = window.setTimeout(() => {
    if (!isOpen.value) {
      showTooltip.value = true
    }
  }, 120000) // 2 minutes in ms
})

onBeforeUnmount(() => {
  if (initialTimeoutId.value) clearTimeout(initialTimeoutId.value)
  if (reappearTimeoutId.value) clearTimeout(reappearTimeoutId.value)
})

watch(isOpen, (newVal) => {
  if (newVal) {
    showTooltip.value = false
    if (reappearTimeoutId.value) clearTimeout(reappearTimeoutId.value)
  } else {
    handleCloseTooltip()
  }
})

// Auto-scroll to bottom when messages change or tabs change
watch([messages, activeTab], async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}, { deep: true })

const submitMessage = () => {
  if (userInput.value.trim() || imagePreview.value) {
    sendMessage(userInput.value, imagePreview.value || undefined)
    userInput.value = ''
    imagePreview.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const handleOptionClick = (msgId: string, opt: string) => {
  selectOption(msgId, opt)
}

const selectQuickAction = (action: string) => {
  sendMessage(action)
}

// Quick Actions list
const quickActions = [
  'Rekomendasi Outfit Hari Ini',
  'Outfit untuk Hujan',
  'Style untuk Cuaca Panas',
  'Outfit Kerja',
  'Outfit Nongkrong',
  'Travel Outfit',
  'Fashion Minimalis'
]

// Suggestion Cards list
const suggestionCards = [
  { text: 'Apa cocok pakai hoodie hari ini?', prompt: 'Apakah cuaca hari ini cocok jika saya memakai hoodie? Berikan analisis mode!' },
  { text: 'Sepatu terbaik untuk cuaca hujan?', prompt: 'Rekomendasikan jenis sepatu terbaik dan stylish yang tahan air untuk dipakai saat cuaca hujan.' },
  { text: 'Outfit aesthetic untuk malam dingin', prompt: 'Rekomendasikan outfit aesthetic, tebal, dan hangat untuk hangout di malam hari yang dingin.' }
]
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    
    <!-- Chat Window -->
    <transition name="chat-scale">
      <div v-if="isOpen" class="mb-4 w-[360px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-[#6b21a8] to-[#4c1d95] p-4 flex items-center justify-between shadow-md z-10 relative">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
              <img src="https://ui-avatars.com/api/?name=Satya&background=0D8ABC&color=fff" alt="Satya" class="w-full h-full object-cover" />
            </div>
            <div>
              <h3 class="text-white font-bold text-sm">Satya</h3>
              <p class="text-white/70 text-xs">AI Styling Assistant</p>
            </div>
          </div>

          <!-- Real-Time Weather Sync Panel -->
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-bold shadow-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{{ weatherStore.condition === 'Sunny' ? '☀️' : weatherStore.condition.includes('Rain') ? '🌧️' : '☁️' }} {{ weatherStore.temperature }}°C</span>
          </div>

          <button @click="toggleChat" class="text-white/70 hover:text-white transition-colors ml-1" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Navigation Tabs Bar -->
        <div class="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 backdrop-blur-md shrink-0 text-xs font-bold text-slate-500 dark:text-slate-400">
          <button 
            @click="activeTab = 'chat'" 
            class="flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1"
            :class="activeTab === 'chat' ? 'text-[#6b21a8] border-[#6b21a8] dark:text-[#38bdf8] dark:border-[#38bdf8]' : 'border-transparent hover:text-slate-800 dark:hover:text-slate-200'"
            type="button"
          >
            <span>💬 Chat</span>
          </button>
          <button 
            @click="activeTab = 'filter'" 
            class="flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1"
            :class="activeTab === 'filter' ? 'text-[#6b21a8] border-[#6b21a8] dark:text-[#38bdf8] dark:border-[#38bdf8]' : 'border-transparent hover:text-slate-800 dark:hover:text-slate-200'"
            type="button"
          >
            <span>🎛️ Filter</span>
          </button>
          <button 
            @click="activeTab = 'favorites'" 
            class="flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1"
            :class="activeTab === 'favorites' ? 'text-[#6b21a8] border-[#6b21a8] dark:text-[#38bdf8] dark:border-[#38bdf8]' : 'border-transparent hover:text-slate-800 dark:hover:text-slate-200'"
            type="button"
          >
            <span>❤️ Favorit</span>
          </button>
          <button 
            @click="activeTab = 'history'" 
            class="flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1"
            :class="activeTab === 'history' ? 'text-[#6b21a8] border-[#6b21a8] dark:text-[#38bdf8] dark:border-[#38bdf8]' : 'border-transparent hover:text-slate-800 dark:hover:text-slate-200'"
            type="button"
          >
            <span>📜 Riwayat</span>
          </button>
        </div>

        <!-- Scrollable Content Panel -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
          
          <!-- 1. CHAT TAB PANEL -->
          <div v-if="activeTab === 'chat'" class="p-4 space-y-4">
            
            <!-- Quick Action Buttons -->
            <div v-if="messages.length <= 1" class="space-y-2 mb-3 text-left">
              <span class="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">⚡ Akses Cepat</span>
              <div class="flex flex-wrap gap-1.5">
                <button 
                  v-for="act in quickActions" 
                  :key="act"
                  @click="selectQuickAction(act)"
                  class="px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-350 border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:text-[#6b21a8] dark:hover:text-sky-400 dark:hover:border-sky-450 shadow-sm transition-all"
                  type="button"
                >
                  {{ act }}
                </button>
              </div>
            </div>

            <!-- Smart Suggestion Cards -->
            <div v-if="messages.length <= 1" class="space-y-2 mb-4 text-left">
              <span class="text-[10px] font-bold text-slate-400 dark:text-slate-555 uppercase tracking-wider">💡 Tanya AI</span>
              <div class="grid grid-cols-1 gap-2">
                <div 
                  v-for="card in suggestionCards" 
                  :key="card.text"
                  @click="sendMessage(card.prompt)"
                  class="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:scale-[1.01] hover:border-violet-300 dark:hover:border-sky-500 cursor-pointer transition-all flex items-center justify-between"
                >
                  <span class="text-xs font-bold text-slate-750 dark:text-slate-300">{{ card.text }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-450 dark:text-sky-455" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Message List -->
            <div 
              v-for="msg in messages" 
              :key="msg.id"
              class="flex items-end gap-2 max-w-[90%]"
              :class="msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''"
            >
              <!-- AI Avatar -->
              <div v-if="msg.sender === 'ai'" class="w-6 h-6 rounded-full overflow-hidden shrink-0 mb-1">
                <img src="https://ui-avatars.com/api/?name=Satya&background=0D8ABC&color=fff&size=64" alt="Satya" class="w-full h-full object-cover" />
              </div>
              
              <div class="flex flex-col items-start gap-1 w-full">
                <!-- User Uploaded Image Preview in Chat -->
                <div v-if="msg.base64Image" class="w-32 h-32 rounded-xl overflow-hidden mb-1 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <img :src="msg.base64Image" class="w-full h-full object-cover" />
                </div>

                <div 
                  class="px-4 py-2.5 rounded-2xl text-sm leading-relaxed w-full text-left"
                  :class="msg.sender === 'user' 
                    ? 'bg-[#6b21a8] text-white rounded-br-sm shadow-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-sm'"
                  v-html="parseMarkdown(msg.text)"
                >
                </div>

                <!-- Suggestion Options -->
                <div 
                  v-if="msg.sender === 'ai' && msg.options && msg.options.length > 0" 
                  class="mt-2 flex flex-col gap-1.5 w-full max-w-full animate-fade-in"
                >
                  <button 
                    v-for="opt in msg.options" 
                    :key="opt"
                    @click="handleOptionClick(msg.id, opt)"
                    class="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold bg-violet-50 text-[#6b21a8] border border-violet-100 hover:bg-violet-100 active:scale-[0.98] transition-all dark:bg-slate-800 dark:text-violet-300 dark:border-slate-700 dark:hover:bg-slate-750 shadow-sm flex items-center gap-2"
                    type="button"
                  >
                    <span class="truncate">{{ opt }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 shrink-0 ml-auto text-violet-400 dark:text-violet-550" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <!-- Premium Outfit Preview Card (Modular Component) -->
                <OutfitPreviewCard 
                  v-if="msg.sender === 'ai' && msg.outfitCard"
                  :msg="msg"
                  :is-fav="isFavorite(msg.id)"
                  @toggle-fav="toggleFavorite"
                  @regenerate="regenerateStyle"
                />

              </div>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isTyping" class="flex items-end gap-2 max-w-[85%] animate-pulse">
              <div class="w-6 h-6 rounded-full overflow-hidden shrink-0 mb-1">
                 <img src="https://ui-avatars.com/api/?name=Satya&background=0D8ABC&color=fff&size=64" alt="Satya" class="w-full h-full object-cover" />
              </div>
              <div class="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-sm flex gap-1">
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>

          </div>

          <!-- 2. FILTER TAB PANEL -->
          <FilterPanel 
            v-if="activeTab === 'filter'"
            :preferences="preferences"
            @apply="activeTab = 'chat'; sendMessage('Kombinasikan rekomendasi pakaian berdasarkan preferensi filter baru saya!')"
          />

          <!-- 3. FAVORITES TAB PANEL -->
          <FavoritesPanel 
            v-if="activeTab === 'favorites'"
            :favorites="favorites"
            @toggle-fav="toggleFavorite"
            @open-in-chat="(msg) => { if (msg) { messages.push(msg); activeTab = 'chat' } else { activeTab = 'chat' } }"
          />

          <!-- 4. HISTORY TAB PANEL -->
          <HistoryPanel 
            v-if="activeTab === 'history'"
            :history="history"
            @delete-item="deleteHistoryItem"
            @clear-all="clearAllHistory"
            @open-in-chat="(msg) => { messages.push(msg); activeTab = 'chat' }"
          />

        </div>

        <!-- Horizontal Image Upload Preview (Above Input Area) -->
        <div v-if="imagePreview" class="p-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center gap-2">
          <div class="w-12 h-12 rounded-lg overflow-hidden border border-slate-350 dark:border-slate-750 relative shrink-0">
            <img :src="imagePreview" class="w-full h-full object-cover" />
            <button 
              @click="removeImagePreview" 
              class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-700 hover:bg-slate-900 text-white flex items-center justify-center text-[8px]"
              type="button"
            >
              ✕
            </button>
          </div>
          <span class="text-[10px] font-bold text-slate-550 dark:text-slate-400 text-left">Pakaian Anda siap dikombinasikan dengan AI wardrobe</span>
        </div>

        <!-- Interactive Input Area (Matches modern requirements) -->
        <div class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form @submit.prevent="submitMessage" class="flex items-center gap-2">
            
            <!-- Voice Input Button -->
            <button 
              type="button"
              @click="toggleSpeech"
              class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 hover:bg-slate-100 transition-colors"
              :class="isListening ? 'bg-red-500 border-red-500 text-white animate-pulse-mic' : ''"
              title="Input Suara"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            <!-- Photo Upload Button -->
            <button 
              type="button"
              @click="triggerFileInput"
              class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 hover:bg-slate-100 transition-colors"
              title="Unggah Foto Wardrobe"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2.5 2.5 0 013.414 0L17 16m-2-2l2.586-2.586a2.5 2.5 0 013.414 0L21 14m-7-2a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <input 
              ref="fileInput" 
              type="file" 
              accept="image/*" 
              class="hidden" 
              @change="handlePhotoUpload" 
            />

            <!-- TextInput Box -->
            <input 
              v-model="userInput" 
              type="text" 
              placeholder="Ask AI Anything..." 
              class="flex-1 min-w-0 w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#6b21a8]/50 transition-shadow"
            />

            <!-- Send Message Button -->
            <button 
              type="submit" 
              :disabled="(!userInput.trim() && !imagePreview) || isTyping"
              class="w-10 h-10 rounded-full bg-[#6b21a8] text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#581c87] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Proactive Styling Hint Bubble -->
    <transition name="chat-scale">
      <div 
        v-if="!isOpen && showTooltip" 
        class="mb-4 mr-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl flex items-center gap-3 w-72 relative cursor-pointer hover:scale-[1.02] transition-transform duration-200"
        @click="isOpen = true"
      >
        <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
          <img src="https://ui-avatars.com/api/?name=Satya&background=0D8ABC&color=fff" alt="Satya" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 text-left">
          <div class="text-xs font-bold text-[#6b21a8] dark:text-[#38bdf8] mb-0.5">Satya</div>
          <p class="text-xs text-slate-650 dark:text-slate-350 leading-normal font-semibold">
            Bantu padu padan outfit aesthetic berdasarkan cuaca hari ini?
          </p>
        </div>
        <!-- Close Button for Tooltip -->
        <button 
          @click.stop="handleCloseTooltip" 
          class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350 border border-slate-200 dark:border-slate-700 shadow-sm"
          type="button"
        >
          <span class="text-[9px]">✕</span>
        </button>
      </div>
    </transition>

    <!-- Floating Button (Matches premium looks) -->
    <button 
      @click="toggleChat"
      class="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
      :class="isOpen ? 'bg-[#6b21a8]' : 'bg-gradient-to-tr from-[#0ea5e9] to-[#38bdf8]'"
      type="button"
    >
      <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.chat-scale-enter-active,
.chat-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: bottom right;
}
.chat-scale-enter-from,
.chat-scale-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.animate-pulse-mic {
  animation: pulse-mic 1.5s infinite ease-in-out;
}

@keyframes pulse-mic {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
