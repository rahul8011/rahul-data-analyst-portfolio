import { useEffect } from 'react'

/**
 * Mouse ke peeche chalne wali halki roshni (background spotlight).
 * Sirf CSS variables --mx / --my update karta hai; baaki kaam CSS (.spot) karta hai.
 */
export function usePointerSpotlight() {
  useEffect(() => {
    let frame = 0

    const onMove = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', e.clientX + 'px')
        document.documentElement.style.setProperty('--my', e.clientY + 'px')
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}
