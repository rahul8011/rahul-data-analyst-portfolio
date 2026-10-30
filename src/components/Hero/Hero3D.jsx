import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * 3D bar-chart "data city" (Three.js).
 *
 * 15 x 15 = 225 bars ek grid me. Har bar ki height wave ki tarah upar-neeche hoti hai,
 * aur mouse ke paas wale bars upar uthte hain (ripple). Sirf decoration hai - koi fake data nahi.
 *
 * Props: theme ("dark" | "light") - sirf grid ka color badalne ke liye.
 */

// ---- settings jo aap badal sakte ho ----
const GRID_SIZE = 15 // 15 x 15 bars
const GAP = 1.25 // bars ke beech ka distance
const COLOR_LOW = '#22d3ee' // chhote bars (cyan)
const COLOR_MID = '#8b5cf6' // beech wale (violet)
const COLOR_HIGH = '#f59e0b' // sabse unche (amber)
const MODES=['bars','line','donut']

export default function Hero3D({ theme }) {
  const mountRef = useRef(null) // wo div jisme canvas lagega
  const gridRef = useRef(null) // floor grid (theme change par color badalta hai)

  // ============ 1) Scene ek baar banao ============
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // WebGL na chale (purane device) to chupchap skip
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch (e) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0) // transparent background
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'
    renderer.domElement.setAttribute('aria-hidden', 'true')

    // ---- scene, camera, lights ----
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200)

    scene.add(new THREE.AmbientLight(0xffffff, 0.75))
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.9)
    keyLight.position.set(8, 16, 6)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 1.2)
    rimLight.position.set(-10, 6, -8)
    scene.add(rimLight)

    // group = pura chart; isse ghumane se sab bars saath ghoomte hain
    const group = new THREE.Group()
    scene.add(group)

    // ---- bars: InstancedMesh = ek hi box ki 225 copies (fast) ----
    const count = GRID_SIZE * GRID_SIZE
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    boxGeometry.translate(0, 0.5, 0) // box ka neeche ka hissa y=0 par, taaki height badhne par upar uthe
    const material = new THREE.MeshStandardMaterial({ roughness: 0.38, metalness: 0.25 })
    const bars = new THREE.InstancedMesh(boxGeometry, material, count)
    bars.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    group.add(bars)

    // ---- neeche ka grid (floor) ----
    const floorGrid = new THREE.GridHelper(GRID_SIZE * GAP + 6, GRID_SIZE + 5, 0x22d3ee, 0x22d3ee)
    floorGrid.material.transparent = true
    floorGrid.material.opacity = 0.22
    floorGrid.position.y = -0.02
    group.add(floorGrid)
    gridRef.current = floorGrid

    // har bar ki (x, z) jagah
    const positions = []
    const half = ((GRID_SIZE - 1) * GAP) / 2
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        positions.push({ x: i * GAP - half, z: j * GAP - half })
      }
    }
    const heights = new Float32Array(count) // abhi ki height (smooth movement ke liye)

    // ---- helper objects (har frame naye na banane padein) ----
    const colorLow = new THREE.Color(COLOR_LOW)
    const colorMid = new THREE.Color(COLOR_MID)
    const colorHigh = new THREE.Color(COLOR_HIGH)
    const tempColor = new THREE.Color()
    const dummy = new THREE.Object3D()

    // ---- mouse tracking ----
    const pointer = { x: 0, y: 0, active: false }
    const ripple = new THREE.Vector3(999, 0, 999) // mouse floor par kahan hai (999 = door, koi asar nahi)
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const raycaster = new THREE.Raycaster()
    const hitPoint = new THREE.Vector3()
    const inverseMatrix = new THREE.Matrix4()

    // ---- size: container ke hisaab se canvas aur camera set karo ----
    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = w / h

      // chhoti screen par camera peeche khicho taaki poora chart dikhe
      const zoomOut = w < 640 ? 1.55 : w < 980 ? 1.25 : 1.14
      camera.position.set(17 * zoomOut, 15 * zoomOut, 17 * zoomOut)
      camera.lookAt(0, 1.2, 0)
      camera.updateProjectionMatrix()
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)

    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect()
      // -1 se +1 ke range me (Three.js ko yahi chahiye)
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    mount.addEventListener('pointerleave', onPointerLeave)

    // chart screen se bahar ho to animation rok do (battery bachti hai)
    let visible = true
    const visibilityObserver = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    visibilityObserver.observe(mount)

    // ============ 2) Animation loop (har frame) ============
    const clock = new THREE.Clock()
    let frameId = 0
    let spin = 0.6 // chart ka ghumaav (radians)

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!visible) return

      const time = clock.getElapsedTime()
      const intro = Math.min(1, time / 1.6) // shuru me bars neeche se ugte hain
      const introEase = 1 - Math.pow(1 - intro, 3)

      if (!reduceMotion) spin += 0.0016
      group.rotation.y = spin + pointer.x * 0.35
      group.rotation.x = pointer.active ? pointer.y * 0.06 : 0
      group.updateMatrixWorld(true)

      // mouse floor par kahan hai? (ray -> floor plane se takraata hai)
      if (pointer.active) {
        raycaster.setFromCamera(new THREE.Vector2(pointer.x, pointer.y), camera)
        if (raycaster.ray.intersectPlane(floorPlane, hitPoint)) {
          inverseMatrix.copy(group.matrixWorld).invert()
          ripple.copy(hitPoint).applyMatrix4(inverseMatrix)
        }
      } else {
        ripple.set(999, 0, 999)
      }

      const mode=MODES[Math.floor(time/5)%MODES.length]
      // bars morph into line & donut
      for (let k = 0; k < count; k++) {
        const { x, z } = positions[k]

        // do sine waves milake natural wave jaisa pattern
        const wave = 0.5 + 0.5 * Math.sin(x * 0.45 + time * 0.9) * Math.cos(z * 0.4 - time * 0.7)
        const swell = 0.5 + 0.5 * Math.sin((x + z) * 0.22 - time * 0.5)
        let target = 0.5 + wave * 2.4 + swell * 1.6

        // mouse ke paas wale bars upar uthte hain (gaussian bump)
        const dx = x - ripple.x
        const dz = z - ripple.z
        target += 4.2 * Math.exp(-(dx * dx + dz * dz) / 7)

        if(mode==="line") target=0.8+5*Math.exp(-(z*z)/6)*(0.6+0.4*Math.sin(x*0.6+time*2));
        else if(mode==="donut"){const r=Math.hypot(x,z); target=0.4+5*Math.exp(-((r-5.5)**2)/2)*(0.7+0.3*Math.sin(Math.atan2(z,x)*4+time*1.5));}
        target *= introEase
        heights[k] += (target - heights[k]) * 0.09 // smooth follow
        const height = Math.max(0.05, heights[k])

        dummy.position.set(x, 0, z)
        dummy.scale.set(0.82, height, 0.82)
        dummy.updateMatrix()
        bars.setMatrixAt(k, dummy.matrix)

        // unchi bar = amber, beech = violet, chhoti = cyan
        const f = Math.min(1, height / 7)
        if (f < 0.5) tempColor.copy(colorLow).lerp(colorMid, f / 0.5)
        else tempColor.copy(colorMid).lerp(colorHigh, (f - 0.5) / 0.5)
        bars.setColorAt(k, tempColor)
      }
      bars.instanceMatrix.needsUpdate = true
      if (bars.instanceColor) bars.instanceColor.needsUpdate = true

      renderer.render(scene, camera)
    }

    if (reduceMotion) clock.elapsedTime = 3 // intro skip
    animate()

    // ============ 3) Cleanup (component hatne par sab band) ============
    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerleave', onPointerLeave)
      boxGeometry.dispose()
      material.dispose()
      floorGrid.geometry.dispose()
      floorGrid.material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  // ============ Theme badle to sirf grid ka color badlo ============
  useEffect(() => {
    const floorGrid = gridRef.current
    if (!floorGrid) return
    floorGrid.material.color.set(theme === 'light' ? 0x5b6b8c : 0x22d3ee)
    floorGrid.material.opacity = theme === 'light' ? 0.35 : 0.22
  }, [theme])

  return <div className="hero3d" ref={mountRef} role="img" aria-label="Animated 3D bar chart that reacts to your mouse" />
}
