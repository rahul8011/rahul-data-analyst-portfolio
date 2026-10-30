import { profile } from '../../data/profile'
import { education } from '../../data/experience'
import { useReveal } from '../../hooks/useReveal'
import { useTilt } from '../../hooks/useTilt'
import photo from '../../assets/rahul.jpg'
import './About.css'

/**
 * About section: left me photo (3D tilt card), right me intro, facts aur buttons.
 * Photo badalni ho to src/assets/rahul.jpg replace kar do (4:5 portrait best rehta hai).
 */
export default function About() {
  const tilt = useTilt(10)
  const revealRef = useReveal()

  return (
    <div className="about reveal" ref={revealRef}>
      {/* ---------- photo ---------- */}
      <div className="photo-wrap">
        <div className="photo-card" {...tilt}>
          <img src={photo} alt="Portrait of Rahul Kumar" width="720" height="900" loading="lazy" />
          <span className="glare" />
          {/* photo ke upar tairte hue skill badges */}
          <span className="float f1">Power BI</span>
          <span className="float f2">SQL</span>
          <span className="float f3">Python</span>
          <span className="float f4">Advanced Excel</span>
        </div>
      </div>

      {/* ---------- text ---------- */}
      <div className="about-text">
        <p className="big">{profile.about}</p>

        <dl className="facts">
          <div>
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>
              {education.degree}, {education.score}
            </dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Dashboards, data models, KPI storytelling</dd>
          </div>
        </dl>

        <div className="btn-row">
          <a className="btn primary" href={profile.resume} download>
            Download resume
          </a>
          <a className="btn ghost" href="#contact">
            Let's talk
          </a>
        </div>
      </div>
    </div>
  )
}
