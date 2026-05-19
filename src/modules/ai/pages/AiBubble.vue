<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useAiStore } from '../stores/ai.store'
import { storeToRefs } from 'pinia'

const aiStore = useAiStore()
const { isOpen, messages, isTyping } = storeToRefs(aiStore)
const { toggleChat, sendMessage } = aiStore

const userInput = ref('')
const chatContainer = ref<HTMLElement | null>(null)
const showTooltip = ref(false) // Hidden initially, will show after 2 mins

const initialTimeoutId = ref<number | null>(null)
const reappearTimeoutId = ref<number | null>(null)

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
    // If closed, trigger the 5-minute wait cycle
    handleCloseTooltip()
  }
})

// Basic Markdown & Bullet Point Formatter
const parseMarkdown = (text: string) => {
  let html = text

  // 1. Convert Image Markdown: ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full rounded-xl my-2 max-h-48 object-cover border border-slate-200 dark:border-slate-700 shadow-sm" />')

  // 2. Convert Link Markdown: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-sky-400 hover:underline font-semibold">$1</a>')

  // 3. Convert Bold Markdown: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')

  // 4. Convert Bullet points (* item or - item)
  // Ensures clean separation and lists them vertically
  html = html.replace(/^\s*[\*\-]\s+(.+)$/gm, '<div class="pl-4 py-0.5 relative before:content-[\'•\'] before:absolute before:left-0 before:text-[#6b21a8] dark:before:text-sky-400">$1</div>')

  // 5. Replace double newlines with spacing, and single newlines with break
  html = html.replace(/\n/g, '<br>')

  return html
}

// Auto-scroll to bottom when messages change
watch(messages, async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}, { deep: true })

const submitMessage = () => {
  if (userInput.value.trim()) {
    sendMessage(userInput.value)
    userInput.value = ''
  }
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    
    <!-- Chat Window -->
    <transition name="chat-scale">
      <div v-if="isOpen" class="mb-4 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
        
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
          <button @click="toggleChat" class="text-white/70 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Message List -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
          <div 
            v-for="msg in messages" 
            :key="msg.id"
            class="flex items-end gap-2 max-w-[85%]"
            :class="msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''"
          >
            <!-- AI Avatar for received messages -->
            <div v-if="msg.sender === 'ai'" class="w-6 h-6 rounded-full overflow-hidden shrink-0 mb-1">
               <img src="https://ui-avatars.com/api/?name=Satya&background=0D8ABC&color=fff&size=64" alt="Satya" class="w-full h-full object-cover" />
            </div>
            
            <div 
              class="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
              :class="msg.sender === 'user' 
                ? 'bg-[#6b21a8] text-white rounded-br-sm' 
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-sm'"
              v-html="parseMarkdown(msg.text)"
            >
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex items-end gap-2 max-w-[85%]">
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

        <!-- Input Area -->
        <div class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <form @submit.prevent="submitMessage" class="flex items-center gap-2">
            <input 
              v-model="userInput" 
              type="text" 
              placeholder="Type your style request..." 
              class="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#6b21a8]/50 transition-shadow"
            />
            <button 
              type="submit" 
              :disabled="!userInput.trim() || isTyping"
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
        <div class="flex-1">
          <div class="text-xs font-bold text-[#6b21a8] dark:text-sky-400 mb-0.5">Satya</div>
          <p class="text-xs text-slate-650 dark:text-slate-300 leading-normal font-medium">
            Jika merasa kesusahan saya bisa bantu Anda
          </p>
        </div>
        <!-- Close Button for Tooltip -->
        <button 
          @click.stop="handleCloseTooltip" 
          class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <span class="text-[9px]">✕</span>
        </button>
      </div>
    </transition>

    <!-- Floating Button (Matches the image: blue gradient with chat icon or X when open) -->
    <button 
      @click="toggleChat"
      class="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
      :class="isOpen ? 'bg-[#6b21a8]' : 'bg-gradient-to-tr from-[#0ea5e9] to-[#38bdf8]'"
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
</style>
