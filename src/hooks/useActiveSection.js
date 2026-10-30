import { useEffect, useState } from 'react'

/**
 * Batata hai ki abhi screen ke beech me kaunsa section hai.
 * Navbar isse current link ko highlight karta hai.
 *
 * Use:
 *   const active = useActiveSection(['top', 'about', 'work'])
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      // sirf screen ki beech ki patli patti "active" mani jaati hai
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return active
}
