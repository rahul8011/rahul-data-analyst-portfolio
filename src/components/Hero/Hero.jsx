import Hero3D from './Hero3D'
import Typed from './Typed'
import { profile } from '../../data/profile'
import './Hero.css'

// Typing effect me jo lines ghoomengi - yahan badal sakte ho
const TYPED_WORDS = ['Data & Analytics Analyst', 'Power BI Developer', 'SQL & Python problem solver', 'dashboard storyteller']

/**
 * Pehli screen. Peeche 3D chart (Hero3D), aage naam, typing line aur buttons.
 * Props: theme - Hero3D ko chahiye (grid ka color).
 */
export default function Hero({ theme }) {
  return (
    <section id="top" className="hero">
      <Hero3D theme={theme} />
      {/* text ke peeche halka fade, taaki padhne me dikkat na ho */}
      <div className="hero-fade" aria-hidden />

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow pulse">Open to data &amp; BI roles · {profile.location}</span>

          <h1>
            Hi, I'm <span className="grad">Rahul&nbsp;Kumar</span>
          </h1>

          <p className="role">
            I'm a <Typed words={TYPED_WORDS} />
          </p>

          <p className="hero-sub">
            I turn raw tables into dashboards people actually use: Power BI, DAX, SQL, Python and advanced Excel, designed end to end.
          </p>

          <div className="btn-row">
            <a className="btn primary" href="#work">
              See my dashboards <span aria-hidden>↓</span>
            </a>
            <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>

          <p className="hint">
            <span className="mouse" aria-hidden /> Move your mouse (or finger) over the 3D chart, it reacts.
          </p>
        </div>
      </div>
    </section>
  )
}
