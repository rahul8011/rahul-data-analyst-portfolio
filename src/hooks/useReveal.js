import { useEffect, useRef } from 'react'

/**
 * Scroll-reveal.
 * Element screen par aate hi uspe "in" class laga deta hai,
 * aur CSS (.reveal.in) us class se fade + slide animation chalata hai.
 *
 * Use:
 *   const ref = useReveal()
 *   <div className="reveal" ref={ref}>...</div>
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Purane browser me IntersectionObserver nahi hota - seedha dikha do.
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          observer.disconnect() // ek hi baar chalana hai
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
