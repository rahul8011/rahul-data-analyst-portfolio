import { useEffect, useRef } from 'react'
import { sphereSkills } from '../../data/skills'

/**
 * 3D ghoomta hua skill-word sphere (plain <canvas>, koi library nahi).
 *
 * Idea: har word ko ek gole (sphere) ki surface par ek 3D point (x, y, z) diya jata hai.
 * Har frame me sab points ko thoda ghumate hain, phir 3D -> 2D screen position nikalte hain.
 * Jo points "peeche" hain (z chhota) wo halke aur chhote dikhte hain => 3D jaisa ehsaas.
 *
 * Mouse sphere ke upar le jao to wo us taraf ghoomta hai; kisi word par ruko to wo chamakta hai.
 */
export default function SkillSphere() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ---------- 1) Words ko sphere par barabar failao (Fibonacci sphere) ----------
    const total = sphereSkills.length
    const points = sphereSkills.map((label, i) => {
      const y = 1 - (i / (total - 1)) * 2 // +1 (upar) se -1 (neeche)
      const ringRadius = Math.sqrt(1 - y * y)
      const angle = i * Math.PI * (3 - Math.sqrt(5)) // "golden angle"
      return {
        label,
        x: Math.cos(angle) * ringRadius,
        y,
        z: Math.sin(angle) * ringRadius,
        screenX: 0, // screen par final position (neeche calculate hoti hai)
        screenY: 0,
        depth: 0, // 0 = sabse peeche, 1 = sabse aage
      }
    })

    // ---------- 2) Canvas size (sharp dikhne ke liye devicePixelRatio) ----------
    let width = 0
    let height = 0
    let radius = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      radius = Math.min(width, height) * 0.43
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)

    // ---------- 3) Mouse se rotation control ----------
    const IDLE_SPIN_X = 0.0035 // mouse na ho tab ki dheemi apni-aap rotation
    const IDLE_SPIN_Y = 0.004
    let spinX = IDLE_SPIN_X // abhi ki speed
    let spinY = IDLE_SPIN_Y
    let targetSpinX = IDLE_SPIN_X // jis speed tak pahunchna hai (mouse se tay hoti hai)
    let targetSpinY = IDLE_SPIN_Y
    let hovering = false
    let mouse = { x: -999, y: -999 }
    let hoveredIndex = -1

    const onPointerMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      mouse = { x: px, y: py }
      hovering = true
      // mouse center se jitna door, utni tez rotation us taraf
      targetSpinX = ((py - height / 2) / height) * 0.03 * -1
      targetSpinY = ((px - width / 2) / width) * 0.04
    }
    const onPointerLeave = () => {
      hovering = false
      mouse = { x: -999, y: -999 }
      targetSpinX = IDLE_SPIN_X
      targetSpinY = IDLE_SPIN_Y
    }
    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerleave', onPointerLeave)

    // sphere screen se bahar ho to drawing rok do
    let visible = true
    const visibilityObserver = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    visibilityObserver.observe(wrap)

    // ---------- 4) Har frame ki drawing ----------
    let frameId = 0
    const draw = () => {
      frameId = requestAnimationFrame(draw)
      if (!visible) return

      // theme ke hisaab se colors (CSS variables se padhe)
      const styles = getComputedStyle(document.documentElement)
      const textColor = styles.getPropertyValue('--text').trim() || '#e8ecf8'
      const accentColor = styles.getPropertyValue('--cyan').trim() || '#22d3ee'
      const violetColor = styles.getPropertyValue('--violet').trim() || '#8b5cf6'

      // rotation speed ko target ki taraf smoothly le jao
      if (reduceMotion) {
        spinX = 0
        spinY = 0
      } else {
        spinX += (targetSpinX - spinX) * 0.05
        spinY += (targetSpinY - spinY) * 0.05
      }
      const cosX = Math.cos(spinX)
      const sinX = Math.sin(spinX)
      const cosY = Math.cos(spinY)
      const sinY = Math.sin(spinY)

      ctx.clearRect(0, 0, width, height)
      const centerX = width / 2
      const centerY = height / 2

      // halke gol rings (globe jaisa look)
      ctx.lineWidth = 1
      ctx.strokeStyle = textColor
      ctx.globalAlpha = 0.07
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, radius, radius * 0.32, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, radius * 0.32, radius, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1

      // --- har point ko ghumao, phir 2D screen position nikalo ---
      hoveredIndex = -1
      let closest = Infinity
      points.forEach((p, i) => {
        // X axis ke around rotate
        const y1 = p.y * cosX - p.z * sinX
        let z1 = p.y * sinX + p.z * cosX
        // Y axis ke around rotate
        const x1 = p.x * cosY + z1 * sinY
        z1 = -p.x * sinY + z1 * cosY
        p.x = x1
        p.y = y1
        p.z = z1

        // perspective: jo point paas (z bada) hai wo bada dikhta hai
        const perspective = (1 / (1.9 - p.z * 0.55)) * 1.9
        p.screenX = centerX + p.x * radius * perspective * 0.82
        p.screenY = centerY + p.y * radius * perspective * 0.82
        p.depth = (p.z + 1) / 2

        // mouse kis word ke sabse paas hai (sirf aage wale words)
        const distance = Math.hypot(mouse.x - p.screenX, mouse.y - p.screenY)
        if (hovering && distance < 34 && distance < closest && p.z > -0.3) {
          closest = distance
          hoveredIndex = i
        }
      })

      // peeche wale pehle draw karo, aage wale unke upar (painter's algorithm)
      const drawOrder = points.map((_, i) => i).sort((a, b) => points[a].z - points[b].z)
      for (const i of drawOrder) {
        const p = points[i]
        const isHovered = i === hoveredIndex
        const fontSize = 11 + p.depth * 9

        ctx.font = `${isHovered ? 600 : 500} ${isHovered ? fontSize + 4 : fontSize}px "Space Grotesk", system-ui, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.globalAlpha = isHovered ? 1 : 0.28 + p.depth * 0.72 // peeche = halka
        ctx.fillStyle = isHovered ? accentColor : p.depth > 0.62 ? textColor : violetColor

        if (isHovered) {
          ctx.shadowColor = accentColor
          ctx.shadowBlur = 18 // glow
        }
        ctx.fillText(p.label, p.screenX, p.screenY)
        ctx.shadowBlur = 0
      }
      ctx.globalAlpha = 1
      canvas.style.cursor = hoveredIndex >= 0 ? 'pointer' : 'grab'
    }
    draw()

    // ---------- 5) Cleanup ----------
    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <div className="sphere" ref={wrapRef}>
      <canvas ref={canvasRef} aria-label="Rotating 3D cloud of my skills" role="img" />
    </div>
  )
}
