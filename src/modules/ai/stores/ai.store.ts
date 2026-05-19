import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChatMessage } from '../types/ai.types'
import { aiChatService } from '../services/ai.service'

const generateId = () => Math.random().toString(36).substring(2, 15)

export const useAiStore = defineStore('aiStore', () => {
  const isOpen = ref(false)
  const isTyping = ref(false)
  const messages = ref<ChatMessage[]>([
    {
      id: generateId(),
      sender: 'ai',
      text: "Hi there! I'm Satya, your AI Stylist. How can I help you dress perfectly today?",
      timestamp: new Date()
    }
  ])

  const toggleChat = () => {
    isOpen.value = !isOpen.value
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    messages.value.push({
      id: generateId(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    })

    isTyping.value = true

    try {
      // Fetch AI response
      const responseText = await aiChatService.getResponse(text)
      
      messages.value.push({
        id: generateId(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      })
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

  return {
    isOpen,
    isTyping,
    messages,
    toggleChat,
    sendMessage
  }
})
