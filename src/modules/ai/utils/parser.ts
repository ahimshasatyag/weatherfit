import type { OutfitCard } from '../types/ai.types'

export const parseMarkdown = (text: string): string => {
  let html = text

  // 1. Convert Image Markdown: ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full rounded-xl my-2 max-h-48 object-cover border border-slate-200 dark:border-slate-700 shadow-sm" />')

  // 2. Convert Link Markdown: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-[#0ea5e9] hover:underline font-semibold">$1</a>')

  // 3. Convert Bold Markdown: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')

  // 4. Convert Bullet points (* item or - item)
  html = html.replace(/^\s*[\*\-]\s+(.+)$/gm, '<div class="pl-4 py-0.5 relative before:content-[\'•\'] before:absolute before:left-0 before:text-[#6b21a8] dark:before:text-sky-400">$1</div>')

  // 5. Replace double newlines with spacing, and single newlines with break
  html = html.replace(/\n/g, '<br>')

  return html
}

export const parseOutfitBlock = (text: string): OutfitCard | null => {
  const match = text.match(/\[OUTFIT_START\]([\s\S]+?)\[OUTFIT_END\]/)
  if (!match || !match[1]) return null

  const block = match[1].trim()
  const lines = block.split('\n')
  const items: any[] = []
  let recommendation = ''

  lines.forEach(line => {
    const trimmed = line.trim()
    if (trimmed.startsWith('Category:')) {
      const parts = trimmed.split('|')
      const item: any = {}
      parts.forEach(p => {
        const colonIndex = p.indexOf(':')
        if (colonIndex > -1) {
          const key = p.substring(0, colonIndex).trim().toLowerCase()
          const val = p.substring(colonIndex + 1).trim()
          if (key === 'category') item.category = val
          else if (key === 'name') item.name = val
          else if (key === 'color') item.color = val
          else if (key === 'image') item.image = val
        }
      })
      if (item.category && item.name) {
        items.push(item)
      }
    } else if (trimmed.startsWith('Recommendation:')) {
      recommendation = trimmed.replace('Recommendation:', '').trim()
    }
  })

  return { items, recommendation }
}
