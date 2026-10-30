import { useState } from 'react'
import { NAV_LINKS } from '../../data/navLinks'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import './Navbar.css'

/**
 * Top navigation bar.
 *  - links scroll to sections (#about, #work ...)
 *  - current section highlight hota hai
 *  - theme toggle (dark/light)
 *  - phone par burger menu
 *
 * Props: theme ("dark" | "light"), onToggleTheme (function)
 */
export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(['top', ...NAV_LINKS.map(([id]) => id)])

  return (
    <header className="nav">
      <a href="#top" className="logo" aria-label="Rahul Kumar, back to top">
        {/* teen chhote bars = logo icon */}
        <span className="logo-bars" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="logo-text">
          rahul<em>.</em>
        </span>
      </a>

      <nav className={menuOpen ? 'open' : ''} aria-label="Primary">
        {NAV_LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={activeId === id ? 'on' : ''} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>

      <div className="nav-right">
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        <a className="btn small primary hide-sm" href={profile.resume} download>
          Resume
        </a>

        {/* burger sirf phone par dikhta hai (CSS se) */}
        <button className="icon-btn burger" onClick={() => setMenuOpen((open) => !open)} aria-label="Menu" aria-expanded={menuOpen}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
