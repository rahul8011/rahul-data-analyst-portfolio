import './Footer.css'

/** Sabse neeche ki line: copyright + "Back to top" link. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} Rahul Kumar · Built with React, Three.js and plenty of coffee.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
