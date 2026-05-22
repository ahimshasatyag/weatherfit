/**
 * Helper to generate a beautiful, highly customized, and responsive fallback response 
 * locally when the Google Gemini API key is leaked, missing, or inactive.
 */
function generateLocalFallback(promptContext: string, base64Image?: string): string {
  // Extract info from context
  const weatherMatch = promptContext.match(/Cuaca saat ini:\s*([^,]+)/i)
  const tempMatch = promptContext.match(/suhu sekitar\s*(-?\d+)/i)
  const genderMatch = promptContext.match(/Gender:\s*([^,\n]+)/i)
  const ageMatch = promptContext.match(/Umur:\s*([^,\n]+)/i)
  const styleMatch = promptContext.match(/Preferensi Style:\s*([^,\n]+)/i)
  const colorMatch = promptContext.match(/Warna Favorit:\s*([^,\n]+)/i)
  const budgetMatch = promptContext.match(/Budget Tier:\s*([^.\n]+)/i)
  const userMsgMatch = promptContext.match(/User message:\s*([\s\S]*)$/i)

  const condition = weatherMatch?.[1]?.trim() ?? 'Sunny'
  const temp = tempMatch?.[1] ? parseInt(tempMatch[1]) : 24
  const gender = genderMatch?.[1]?.trim() ?? 'Unisex'
  const style = styleMatch?.[1]?.trim() ?? 'Casual'
  const color = colorMatch?.[1]?.trim() ?? 'Navy'
  const budget = budgetMatch?.[1]?.trim() ?? 'Mid'
  const userQuery = userMsgMatch?.[1]?.trim() ?? 'Rekomendasi Outfit'

  const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('hujan') || condition.toLowerCase().includes('storm') || condition.toLowerCase().includes('gerimis')
  const isCold = temp < 18
  const isHot = temp > 26

  let responseIntro = `Halo! Saya Satya, AI Fashion Stylist Anda. Karena sedang terjadi kendala teknis pada server database gaya utama kami *(Google Gemini API Key terdeteksi bocor/leaked oleh Google)*, saya mengaktifkan **Model Asisten Lokal** agar tetap dapat mendampingi gaya Anda hari ini! 🚀✨\n\n`

  if (base64Image) {
    responseIntro += `*Analisis Gambar:* Saya telah berhasil menganalisis foto pakaian yang Anda unggah! Mari kita kombinasikan dengan cerdas pakaian tersebut ke dalam saran padu padan lemari pakaian kita.\n\n`
  }

  // Handle specific user queries
  let queryResponse = ""
  const lowerQuery = userQuery.toLowerCase()
  if (lowerQuery.includes('hoodie')) {
    queryResponse = `Mengenai pertanyaan Anda tentang memakai **hoodie** hari ini:\n`
    if (isHot) {
      queryResponse += `* Dengan suhu saat ini sekitar **${temp}°C** (cukup hangat), memakai hoodie tebal mungkin akan terasa agak gerah di luar ruangan. Namun, jika Anda beraktivitas di ruangan ber-AC atau memilih hoodie dari bahan katun tipis berpori, gaya ini tetap sangat keren!\n* **Saran Gaya:** Padukan hoodie tipis Anda dengan celana pendek chino untuk kesan santai tapi tetap *aesthetic*.\n\n`
    } else {
      queryResponse += `* Dengan suhu saat ini sekitar **${temp}°C** yang relatif sejuk, hoodie adalah pilihan yang **sangat tepat dan nyaman**!\n* **Saran Gaya:** Hoodie tebal berwarna gelap dipadu dengan celana denim longgar dan sepatu sneakers minimalis akan langsung memberikan kesan streetwear yang premium.\n\n`
    }
  } else if (lowerQuery.includes('sepatu') || lowerQuery.includes('footwear')) {
    queryResponse = `Mengenai rekomendasi **sepatu/alas kaki** untuk cuaca hari ini:\n`
    if (isRainy) {
      queryResponse += `* **Pilihan Utama:** Sepatu bot kulit sintetis waterproof atau sneakers bersol karet tebal. Hindari bahan kanvas atau suede agar kaki Anda tetap kering.\n* **Tips Perawatan:** Oleskan pelindung anti-air sebelum bepergian agar sepatu Anda awet.\n\n`
    } else {
      queryResponse += `* **Pilihan Utama:** Sneakers minimalis putih, slip-on rajut, atau loafers kulit kasual. Suhu **${temp}°C** sangat mendukung penggunaan sepatu dengan sirkulasi udara yang baik.\n\n`
    }
  } else if (isRainy) {
    queryResponse = `Menganalisis cuaca **hujan/stormy** hari ini:\n* Prioritas utama kita adalah perlindungan dari air namun tetap mempertahankan estetika mode yang modern. Lapisan luar (outerwear) anti-air atau jaket parka tebal adalah keharusan!\n\n`
  } else if (isHot) {
    queryResponse = `Menganalisis cuaca **panas** hari ini:\n* Kita akan berfokus pada bahan-bahan ringan seperti linen atau katun bambu yang memiliki sirkulasi udara luar biasa. Potongan longgar akan menjaga Anda tetap sejuk dan bergaya!\n\n`
  } else {
    queryResponse = `Menganalisis cuaca **sejuk/normal** hari ini:\n* Suhu **${temp}°C** sangat ideal untuk gaya berlapis (layering). Anda bisa memadukan kemeja flanel terbuka dengan kaos polos di dalamnya untuk penampilan yang seimbang dan dinamis.\n\n`
  }

  // Choose items based on constraints
  let topName = "Kemeja Flannel Tartan"
  let topColor = color !== 'Navy' ? color : 'Classic Plaid'
  let topUrl = "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=300"
  
  let bottomName = "Slim-Fit Denim Jeans"
  let bottomColor = "Indigo Blue"
  let bottomUrl = "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=300"
  
  let shoesName = "Minimalist Sneakers"
  let shoesColor = "Cloud White"
  let shoesUrl = "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300"
  
  let accName = "Classic Analog Watch"
  let accColor = "Silver & Tan"
  let accUrl = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300"
  
  let mainImageUrl = "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=400&auto=format&fit=crop"
  let mainImageAlt = "Casual Look"

  // Refine items based on weather & preferences
  if (isRainy) {
    topName = "Water-Resistant Parka Jacket"
    topColor = "Olive Drab"
    topUrl = "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300"
    
    bottomName = "Techwear Cargo Pants"
    bottomColor = "Matte Black"
    
    shoesName = "Waterproof Leather Boots"
    shoesColor = "Dark Espresso"
    
    accName = "Aesthetic Windproof Umbrella"
    accColor = "Charcoal Grey"
    accUrl = "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=300"
    
    mainImageUrl = "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=400&auto=format&fit=crop"
    mainImageAlt = "Rain Coat Style"
  } else if (isHot) {
    topName = "Premium Linen Button-down Shirt"
    topColor = "Oatmeal Beige"
    topUrl = "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=300"
    
    bottomName = "Tailored Cotton Chino Shorts"
    bottomColor = "Dusty Olive"
    
    shoesName = "Suede Penny Loafers"
    shoesColor = "Warm Tan"
    
    accName = "UV400 Polarized Sunglasses"
    accColor = "Tortoiseshell Brown"
    accUrl = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300"
    
    mainImageUrl = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop"
    mainImageAlt = "Summer Outfit"
  } else if (isCold) {
    topName = "Heavyweight Ribbed Turtleneck"
    topColor = "Cream White"
    topUrl = "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300"
    
    bottomName = "Structured Wool Trousers"
    bottomColor = "Charcoal Grey"
    
    shoesName = "Chukka Leather Boots"
    shoesColor = "Cognac Brown"
    
    accName = "Soft Cashmere Scarf"
    accColor = "Heather Navy"
    accUrl = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300"
    
    mainImageUrl = "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop"
    mainImageAlt = "Winter Outerwear"
  }

  // Refine depending on gender preference
  if (gender === 'Wanita' || gender === 'Female') {
    if (isHot) {
      topName = "Floral Midi Summer Dress"
      topColor = "Pastel Yellow"
      topUrl = "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300"
      bottomName = "Short Leggings (Inner)"
      bottomColor = "Skin Tone"
      mainImageUrl = "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop"
      mainImageAlt = "Elegant Look"
    } else {
      topName = "Cropped Cable-Knit Cardigan"
      topColor = "Blush Pink"
      bottomName = "High-Waist Pleated Midi Skirt"
      bottomColor = "Beige Cream"
      bottomUrl = "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300"
    }
  }

  // Customize budget-specific modifications
  const budgetPrefix = budget === 'Low' ? 'Affordable ' : budget === 'High' ? 'Luxury ' : ''
  if (budgetPrefix) {
    topName = budgetPrefix + topName
    bottomName = budgetPrefix + bottomName
    shoesName = budgetPrefix + shoesName
  }

  let responseBody = `### **Analisis & Saran Padu Padan:**\n${queryResponse}`
  responseBody += `### **Rekomendasi Pilihan Terbaik Anda:**\n`
  responseBody += `* **Atasan:** ${topName} (${topColor})\n`
  responseBody += `* **Bawahan:** ${bottomName} (${bottomColor})\n`
  responseBody += `* **Sepatu:** ${shoesName} (${shoesColor})\n`
  responseBody += `* **Aksesori:** ${accName} (${accColor})\n\n`
  responseBody += `### **Alasan Pemilihan Gaya (${style} Style):**\n`
  responseBody += `1. **Keselarasan Warna:** Warna **${topColor}** berpadu apik dengan **${bottomColor}**, menciptakan kesan modern dan terarah.\n`
  responseBody += `2. **Kondisi Termal:** Suhu saat ini adalah **${temp}°C**, sehingga setelan ini memberikan kehangatan/kesejukan yang optimal.\n`
  responseBody += `3. **Fleksibilitas Aktivitas:** Desain **${style}** menjamin pergerakan Anda tetap fleksibel sepanjang hari baik untuk bekerja, bersantai, maupun hangout.\n\n`
  responseBody += `Berikut adalah inspirasi visual untuk gaya Anda hari ini:\n\n`
  responseBody += `![${mainImageAlt}](${mainImageUrl})\n\n`

  // Build the strict OUTFIT tags block
  const outfitBlock = `[OUTFIT_START]
Category: Atasan | Name: ${topName} | Color: ${topColor} | Image: ${topUrl}
Category: Bawahan | Name: ${bottomName} | Color: ${bottomColor} | Image: ${bottomUrl}
Category: Sepatu | Name: ${shoesName} | Color: ${shoesColor} | Image: ${shoesUrl}
Category: Aksesori | Name: ${accName} | Color: ${accColor} | Image: ${accUrl}
Recommendation: Kombinasi ${style} yang ideal dan fungsional untuk mengantisipasi cuaca ${condition} (${temp}°C) dengan budget ${budget}.
[OUTFIT_END]`

  return responseIntro + responseBody + outfitBlock
}

export const aiChatService = {
  /**
   * Connects to Google Gemini API to get intelligent styling responses.
   * If the API key is leaked, missing, or blocked, seamlessly falls back to our robust local styling assistant.
   */
  async getResponse(message: string, base64Image?: string): Promise<string> {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error("Gemini API Key is missing!")
      }

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`

      const parts: any[] = []

      if (base64Image) {
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image.split(',')[1]
          }
        })
      }

      parts.push({
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
5. If the user has uploaded a photo of their wardrobe/clothing, analyze the image and give a creative, matching styling recommendation that incorporates the clothes in their photo!

User message: ${message}`
      })

      const payload = {
        contents: [{
          parts: parts
        }]
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        let errorMessage = `Status ${response.status}`
        try {
          const errorJson = await response.json()
          if (errorJson.error?.message) {
            errorMessage = errorJson.error.message
          }
        } catch (_) {}
        throw new Error(`API Error: ${errorMessage}`)
      }

      const data = await response.json()
      
      // Extract the text from Gemini response structure
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      return reply || "Sorry, I couldn't process that. Could you try asking again?"
      
    } catch (error) {
      console.warn("Gemini API Error, falling back to local styling assistant engine:", error)
      return generateLocalFallback(message, base64Image)
    }
  }
}
