import { stats } from '../../data/stats'
import { useCountUp } from '../../hooks/useCountUp'
import { useReveal } from '../../hooks/useReveal'
import { formatNumber } from '../../utils/formatNumber'
import './Stats.css'

/** Ek single number card (0 se count-up hota hai). */
function Stat({ stat }) {
  const [ref, value] = useCountUp(stat.value)

  return (
    <div className="stat" ref={ref}>
      <b>
        {formatNumber(value)}
        {stat.suffix}
      </b>
      <span>{stat.label}</span>
    </div>
  )
}

/** Hero ke neeche chaar numbers ki strip. Data: src/data/stats.js */
export default function Stats() {
  const revealRef = useReveal()

  return (
    <div className="wrap">
      <div className="stats reveal" ref={revealRef}>
        {stats.map((stat) => (
          <Stat key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  )
}
