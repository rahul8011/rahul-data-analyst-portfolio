import { useCallback, useEffect } from 'react'
import './Lightbox.css'

/**
 * Screenshot ko poori screen par dikhane wala popup.
 *  - kahin bhi click ya Esc dabao = band
 *  - left / right arrow (ya buttons) = agla / pichla screenshot
 *
 * Props:
 *   shots   - [{ src, caption }, ...]
 *   index   - abhi kaunsa screenshot khula hai
 *   onClose - popup band karne ka function
 *   onIndex - screenshot badalne ka function
 */
export default function Lightbox({ shots, index, onClose, onIndex }) {
  const goPrev = useCallback(() => onIndex((index - 1 + shots.length) % shots.length), [index, shots.length, onIndex])
  const goNext = useCallback(() => onIndex((index + 1) % shots.length), [index, shots.length, onIndex])

  // keyboard shortcuts + popup khula ho to peeche ka page scroll na ho
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, goPrev, goNext])

  const shot = shots[index]

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Dashboard screenshot" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {/* arrows sirf tab jab ek se zyada screenshot ho */}
      {shots.length > 1 && (
        <>
          <button
            className="lb-nav left"
            onClick={(e) => {
              e.stopPropagation() // warna popup band ho jayega
              goPrev()
            }}
            aria-label="Previous screenshot"
          >
            ‹
          </button>
          <button
            className="lb-nav right"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next screenshot"
          >
            ›
          </button>
        </>
      )}

      {/* image par click karne se popup band nahi hona chahiye */}
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={shot.src} alt={shot.caption} />
        <figcaption>
          {shot.caption}{' '}
          <span>
            ({index + 1}/{shots.length})
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
