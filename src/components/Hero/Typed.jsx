import { useEffect, useState } from 'react'

/**
 * Typing effect: words ko ek-ek letter karke likhta aur mitata hai.
 * Props: words = ['Data Analyst', 'Power BI Developer', ...]
 */
export default function Typed({ words }) {
  const [text, setText] = useState('')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setText(words[0]) // animation nahi, seedha pehla word
      return
    }

    let wordIndex = 0 // abhi kaunsa word
    let charCount = 0 // us word ke kitne letters dikh rahe hain
    let deleting = false
    let timer

    const tick = () => {
      const word = words[wordIndex]
      charCount += deleting ? -1 : 1
      setText(word.slice(0, charCount))

      let delay = deleting ? 40 : 85 // mitana typing se tez

      if (!deleting && charCount === word.length) {
        deleting = true // word poora - thoda ruko, phir mitao
        delay = 1500
      } else if (deleting && charCount === 0) {
        deleting = false // mit gaya - agla word
        wordIndex = (wordIndex + 1) % words.length
        delay = 350
      }
      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words])

  return (
    <span className="typed">
      {text}
      <i className="caret" />
    </span>
  )
}
