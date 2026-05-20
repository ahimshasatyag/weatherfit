import { ref } from 'vue'

export function useSpeechRecognition(onResultCallback?: (text: string) => void) {
  const isListening = ref(false)
  const transcript = ref('')
  
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  let recognition: any = null
  const isSupported = !!SpeechRecognition

  if (isSupported) {
    recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.lang = 'id-ID' // Default to Indonesian

    recognition.onstart = () => {
      isListening.value = true
    }

    recognition.onend = () => {
      isListening.value = false
    }

    recognition.onresult = (event: any) => {
      const resultText = event.results[0][0].transcript
      transcript.value = resultText
      if (onResultCallback) {
        onResultCallback(resultText)
      }
    }
  }

  const toggleSpeech = () => {
    if (!isSupported) {
      alert("Input suara tidak didukung di browser ini. Gunakan Google Chrome.")
      return
    }
    if (isListening.value) {
      recognition.stop()
    } else {
      recognition.start()
    }
  }

  return {
    isListening,
    transcript,
    toggleSpeech,
    isSupported
  }
}
