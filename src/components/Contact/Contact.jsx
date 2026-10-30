import { useState } from 'react'
import { profile } from '../../data/profile'
import { useReveal } from '../../hooks/useReveal'
import './Contact.css'

/**
 * Contact section: left me quick links, right me message form.
 *
 * Form ka "Send" kisi server ko nahi jata. Ye visitor ka email app khol deta hai
 * (mailto:) jisme subject aur message pehle se bhare hote hain.
 */
export default function Contact() {
  const revealRef = useReveal()
  const [form, setForm] = useState({ name: '', email: '', msg: '' })

  // input ke name ("name" / "email" / "msg") ke hisaab se sahi field update karo
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault() // page reload mat karo
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.msg}\n\n${form.name}${form.email ? ' (' + form.email + ')' : ''}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="contact reveal" ref={revealRef}>
      {/* ---------- left: links ---------- */}
      <div className="c-links">
        <a href={`mailto:${profile.email}`} className="c-link">
          <span>Email</span>
          <b>{profile.email}</b>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="c-link">
          <span>LinkedIn</span>
          <b>rahul-kumar980</b>
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="c-link">
          <span>GitHub</span>
          <b>rahul8011</b>
        </a>
        <a href={profile.resume} download className="c-link">
          <span>Resume</span>
          <b>Download PDF</b>
        </a>
      </div>

      {/* ---------- right: form ---------- */}
      <form className="c-form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" required />
        </label>
        <label>
          Your email
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" />
        </label>
        <label>
          Message
          <textarea name="msg" rows="4" value={form.msg} onChange={handleChange} placeholder="Tell me about the data problem you are solving…" required />
        </label>

        <button className="btn primary" type="submit">
          Send message <span aria-hidden>→</span>
        </button>
        <small className="muted">This opens your email app with the message ready to send.</small>
      </form>
    </div>
  )
}
