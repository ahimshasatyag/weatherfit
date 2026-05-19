export const aiChatService = {
  /**
   * Connects to Google Gemini API to get intelligent styling responses.
   */
  async getResponse(message: string): Promise<string> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      throw new Error("Gemini API Key is missing!")
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`

    const payload = {
      contents: [{
        parts: [{ 
          text: `You are Satya, a friendly, professional AI Fashion Stylist. You help users pick outfits based on weather, occasions, and personal style. 

Rules:
1. Always respond in the language used by the user (e.g., if they ask in Indonesian, reply in Indonesian).
2. Structure your replies beautifully:
   - Use bold headers (e.g. **Pilihan Terbaik:**, **Lengkapi dengan:**).
   - Use distinct paragraphs and bullet points (* item) on new lines for neatness. Do not write everything in a single solid paragraph.
3. Suggest exactly ONE relevant image from this curated library if it matches the style/weather:
   - Summer/Sunny outfit: ![Summer Outfit](https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop)
   - Winter/Cold outfit: ![Winter Outerwear](https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop)
   - Casual style: ![Casual Look](https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=400&auto=format&fit=crop)
   - Rainy/Stormy outfit: ![Rain Coat Style](https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=400&auto=format&fit=crop)
   - Elegant fashion: ![Elegant Look](https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop)
4. Keep your answers concise, engaging, and directly related to fashion or weather. Do not break character.

User message: ${message}` 
        }]
      }]
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Extract the text from Gemini response structure
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      return reply || "Sorry, I couldn't process that. Could you try asking again?"
      
    } catch (error) {
      console.error("Gemini API Error:", error)
      throw error
    }
  }
}
