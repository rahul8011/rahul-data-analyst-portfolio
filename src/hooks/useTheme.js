import { useEffect, useState } from 'react'

/**
 * Dark / light theme.
 * - <html data-theme="dark|light"> set karta hai (CSS tokens usi se badalte hain)
 * - choice localStorage me yaad rakhta hai
 *
 * Use:
 *   const [theme, toggleTheme] = useTheme()
 */
export function useTheme() {
  // index.html ka chhota script pehle hi data-theme laga deta hai (flash se bachne ke liye)
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // private mode me storage band ho sakta hai - koi dikkat nahi
    }

    // phone ke browser ki top bar ka color
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#070a12' : '#f4f6fb')
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return [theme, toggleTheme]
}
