// ============================================================
// App.jsx - poora page yahan jud-ta hai.
// Har section ka asli code apne folder me hai: src/components/<Name>/
// Yahan sirf order tay hota hai (kaunsa section pehle, kaunsa baad me).
// ============================================================

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Stats from './components/Stats/Stats'
import Section from './components/Section/Section'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Playground from './components/Playground/Playground'
import Skills from './components/Skills/Skills'
import Journey from './components/Journey/Journey'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

import { useTheme } from './hooks/useTheme'
import { useScrollProgress } from './hooks/useScrollProgress'
import { usePointerSpotlight } from './hooks/usePointerSpotlight'

export default function App() {
  const [theme, toggleTheme] = useTheme() // dark / light
  const scrollProgress = useScrollProgress() // 0-100, top ki progress line ke liye
  usePointerSpotlight() // mouse ke peeche halki roshni

  return (
    <>
      {/* top par rang-birangi scroll progress line */}
      <div className="progress" style={{ width: scrollProgress + '%' }} />
      {/* mouse spotlight (background) */}
      <div className="spot" aria-hidden="true" />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero theme={theme} />
        <Stats />

        <Section id="about" eyebrow="01 · About" title="Data, shaped into decisions." lead="A quick look at who is behind the dashboards.">
          <About />
        </Section>

        <Section id="work" eyebrow="02 · Selected work" title="Dashboards I've built" lead="Two end-to-end projects. Tilt the screens, switch the tabs, click to enlarge.">
          <Projects />
        </Section>

        <Section
          id="playground"
          eyebrow="03 · Playground"
          title="Don't just read it, explore it."
          lead="Real figures from my own dashboards, rebuilt as interactive charts. Slice them, compare them, query them."
        >
          <Playground />
        </Section>

        <Section id="skills" eyebrow="04 · Toolbox" title="What I work with" lead="Drag your pointer across the sphere to spin it, hover a skill to light it up.">
          <Skills />
        </Section>

        <Section id="journey" eyebrow="05 · Journey" title="Where I've worked and studied">
          <Journey />
        </Section>

        <Section id="contact" eyebrow="06 · Contact" title="Got data that needs a story?" lead="Send me a note, I usually reply quickly.">
          <Contact />
        </Section>
      </main>

      <Footer />
    </>
  )
}
