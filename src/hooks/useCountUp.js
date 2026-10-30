import { useEffect, useRef, useState } from 'react'

/**
 * Number ko 0 se `to` tak ginta hai, jab element pehli baar screen par dikhe.
 *
 * Use:
 *   const [ref, value] = useCountUp(417883)
 *   <b ref={ref}>{value}</b>
 */
export function useCountUp(to, duration = 1600) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Agar user ne "reduce motion" on kiya hai to animation skip.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setValue(to)
      return
    }

    let frame = 0

    const startCounting = () => {
      const startTime = performance.now()
      const step = (now) => {
        const progress = Math.min(1, (now - startTime) / duration)
        const eased = 1 - Math.pow(1 - progress, 4) // shuru me tez, end me slow
        setValue(Math.round(to * eased))
        if (progress < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to, duration])

  return [ref, value]
}
