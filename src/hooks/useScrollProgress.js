import { useEffect, useState } from 'react'

/**
 * Page kitna scroll hua, 0 se 100 (percent) me.
 * Top par jo rang-birangi progress line hai wo isse chalti hai.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const html = document.documentElement
      const maxScroll = html.scrollHeight - html.clientHeight
      setProgress(maxScroll > 0 ? (html.scrollTop / maxScroll) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}
