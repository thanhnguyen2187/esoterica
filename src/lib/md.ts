import { marked } from 'marked'
import * as DOMPurify from 'dompurify'

marked.setOptions({
  sanitizer: DOMPurify.sanitize,
})
marked.use({
  renderer: {
    heading(
      text: string,
      level: 1 | 2 | 3 | 4 | 5 | 6,
      raw: string,
      slugger: marked.Slugger,
    ): string {
      if (level <= 3) {
        return `<h${level + 3}>${text}</h${level}>\n`;
      }
      return `${text}\n`
    }
  },
})

export function localMarked(src: string) {
  return marked(src)
}
