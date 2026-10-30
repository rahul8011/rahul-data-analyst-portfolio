import { useState } from 'react'
import Lightbox from './Lightbox'
import { useReveal } from '../../hooks/useReveal'
import { useTilt } from '../../hooks/useTilt'

/**
 * Ek project ka poora block: left me text + links, right me screenshot frame.
 *
 * Props:
 *   project - src/data/projects.js ka ek object
 *   flip    - true ho to text right me aur screenshot left me (alternate look)
 */
export default function ProjectCard({ project, flip }) {
  const revealRef = useReveal()
  const tilt = useTilt(6)

  const [shotIndex, setShotIndex] = useState(0) // kaunsa screenshot dikh raha hai
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const shot = project.shots[shotIndex]

  return (
    // --accent: is project ka color; CSS me var(--accent) se use hota hai
    <article className={'project reveal' + (flip ? ' flip' : '')} ref={revealRef} style={{ '--accent': project.accent }}>
      {/* ---------- left: text ---------- */}
      <div className="p-info">
        <span className="p-tool">{project.tool}</span>
        <h3>{project.title}</h3>
        <p className="p-sum">{project.summary}</p>

        <ul className="p-points">
          {project.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="p-actions">
          <a className="btn primary" href={project.repo} target="_blank" rel="noreferrer">
            View on GitHub <span aria-hidden>↗</span>
          </a>
          <button className="btn ghost" onClick={() => setLightboxOpen(true)}>
            Open full screenshot
          </button>
        </div>
      </div>

      {/* ---------- right: screenshot ---------- */}
      <div className="p-visual">
        {/* browser-window jaisa frame, mouse ke saath tilt hota hai */}
        <div className="frame" {...tilt}>
          <div className="frame-bar">
            <i />
            <i />
            <i />
            <span>
              {project.tool} · {shot.caption.split(':')[0]}
            </span>
          </div>
          <button className="frame-shot" onClick={() => setLightboxOpen(true)} aria-label="Open screenshot full size">
            <img key={shot.src} src={shot.src} alt={shot.caption} loading="lazy" />
            <span className="glare" />
            <span className="zoom-hint">Click to enlarge</span>
          </button>
        </div>

        {/* chhote thumbnails - click karke screenshot badlo */}
        <div className="thumbs" role="tablist" aria-label="Screenshots">
          {project.shots.map((s, i) => (
            <button key={s.src} role="tab" aria-selected={i === shotIndex} className={i === shotIndex ? 'on' : ''} onClick={() => setShotIndex(i)} title={s.caption}>
              <img src={s.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
        <p className="cap">{shot.caption}</p>
      </div>

      {lightboxOpen && <Lightbox shots={project.shots} index={shotIndex} onClose={() => setLightboxOpen(false)} onIndex={setShotIndex} />}
    </article>
  )
}
