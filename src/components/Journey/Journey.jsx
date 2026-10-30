import { experience, education } from '../../data/experience'
import { useReveal } from '../../hooks/useReveal'
import './Journey.css'

/**
 * Timeline: pehle jobs (experience), sabse neeche education.
 * Data badalne ke liye: src/data/experience.js
 */
export default function Journey() {
  const revealRef = useReveal()

  return (
    <div className="journey reveal" ref={revealRef}>
      <ol className="timeline">
        {/* ---------- jobs ---------- */}
        {experience.map((job) => (
          <li key={job.org}>
            <span className="node" />
            <div className="t-card">
              <span className="when">{job.when}</span>
              <h3>{job.role}</h3>
              <p className="org">{job.org}</p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="tags">
                {job.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}

        {/* ---------- education (amber dot) ---------- */}
        <li>
          <span className="node edu" />
          <div className="t-card">
            <span className="when">{education.when}</span>
            <h3>{education.degree}</h3>
            <p className="org">{education.school}</p>
            <p className="score">{education.score}</p>
          </div>
        </li>
      </ol>
    </div>
  )
}
