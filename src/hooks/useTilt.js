import { useRef } from 'react'

/**
 * 3D tilt: mouse jis taraf jaye, card us taraf thoda ghoom jata hai.
 * Glare (chamak) ke liye CSS variables --gx / --gy bhi set karta hai.
 *
 * Use:
 *   const tilt = useTilt(8)
 *   <div {...tilt}>...</div>
 */
export function useTilt(maxDegrees = 9) {
  const ref = useRef(null)

  const onPointerMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // px, py: -0.5 se +0.5 tak (card ke center se kitna door)
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5

    el.style.transform = `perspective(1000px) rotateY(${px * maxDegrees * 2}deg) rotateX(${-py * maxDegrees * 2}deg)`
    el.style.setProperty('--gx', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--gy', `${(py + 0.5) * 100}%`)
  }

  const onPointerLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
  }

  return { ref, onPointerMove, onPointerLeave }
}
