import { useReveal } from '../../hooks/useReveal'

/**
 * Har section ka common wrapper: chhota label (eyebrow), bada heading,
 * aur ek line ka lead text. Andar ka content `children` me aata hai.
 * Styles: src/styles/layout.css
 */
export default function Section({ id, eyebrow, title, lead, children }) {
  const revealRef = useReveal()

  return (
    <section id={id} className="section">
      <div className="wrap">
        <header className="sec-head reveal" ref={revealRef}>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {lead && <p className="lead">{lead}</p>}
        </header>

        {children}
      </div>
    </section>
  )
}
