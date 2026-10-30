import { useState } from 'react'
import { roadData } from '../../data/roadData'
import { CHART_COLORS, YEAR_COLORS } from './chartColors'
import { formatNumber } from '../../utils/formatNumber'

// ---- line chart ka size (SVG viewBox units, screen size ke hisaab se scale hota hai) ----
const W = 640
const H = 250
const PAD = { left: 46, right: 14, top: 16, bottom: 30 }

/**
 * Road accident data ke do interactive charts:
 *   1) Horizontal bars - dimension chip (Severity, Vehicle...) chuno, bars badal jaate hain
 *   2) Line chart - 2021 vs 2022 monthly casualties, hover karke month compare karo
 */
export default function RoadPanel() {
  const [dimension, setDimension] = useState('Severity') // kaunsa chip selected hai
  const [hoveredBar, setHoveredBar] = useState(null) // kaunsi bar par mouse hai
  const [visibleYears, setVisibleYears] = useState({ 2021: true, 2022: true }) // line on/off
  const [hoverMonth, setHoverMonth] = useState(null) // line chart par kaunsa month

  // ================= Chart 1: horizontal bars =================
  const { rows, note } = roadData.dims[dimension]
  const maxValue = Math.max(...rows.map((row) => row[1]))
  const rowsTotal = rows.reduce((sum, row) => sum + row[1], 0)

  // ================= Chart 2: line chart math =================
  const allValues = [...roadData.y2021, ...roadData.y2022]
  const yMax = Math.ceil(Math.max(...allValues) / 5000) * 5000 // 5000 ke multiple tak round up
  // month index (0-11) -> x position
  const xAt = (i) => PAD.left + (i * (W - PAD.left - PAD.right)) / 11
  // value -> y position (SVG me y neeche ki taraf badhta hai, isliye 1 - ...)
  const yAt = (v) => PAD.top + (1 - v / yMax) * (H - PAD.top - PAD.bottom)
  // numbers ki list -> SVG path string ("M x,y L x,y ...")
  const toPath = (values) => values.map((v, i) => `${i ? 'L' : 'M'}${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' ')
  const gridTicks = [0, 5000, 10000, 15000, 20000, 25000].filter((t) => t <= yMax)

  // mouse ki x position se nikalo ki kaunsa month sabse paas hai
  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * W
    const month = Math.round(((x - PAD.left) / (W - PAD.left - PAD.right)) * 11)
    setHoverMonth(Math.max(0, Math.min(11, month)))
  }

  const total2021 = roadData.y2021.reduce((a, b) => a + b, 0)
  const total2022 = roadData.y2022.reduce((a, b) => a + b, 0)
  const yoyChange = ((total2022 - total2021) / total2021) * 100

  return (
    <div className="ex-grid">
      {/* ================= Card 1: slice the casualties ================= */}
      <div className="ex-card">
        <div className="ex-head">
          <h4>Slice the casualties</h4>
          <span className="ex-total">
            {formatNumber(roadData.total)} <small>total</small>
          </span>
        </div>

        <div className="chips" role="tablist" aria-label="Choose a dimension">
          {Object.keys(roadData.dims).map((name) => (
            <button key={name} role="tab" aria-selected={name === dimension} className={'chip' + (name === dimension ? ' on' : '')} onClick={() => setDimension(name)}>
              {name}
            </button>
          ))}
        </div>

        <p className="ex-note">{note}</p>

        <ul className="hbars">
          {rows.map(([label, value], i) => (
            <li
              key={dimension + label}
              className={hoveredBar === i ? 'hot' : ''}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
              onFocus={() => setHoveredBar(i)}
              onBlur={() => setHoveredBar(null)}
              tabIndex={0}
            >
              <span className="hb-label">{label}</span>
              <span className="hb-track">
                <span className="hb-fill" style={{ width: `${(value / maxValue) * 100}%`, background: CHART_COLORS[i % CHART_COLORS.length], animationDelay: `${i * 70}ms` }} />
              </span>
              <span className="hb-val">
                {formatNumber(value)} <em>{((value / rowsTotal) * 100).toFixed(1)}%</em>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= Card 2: monthly line chart ================= */}
      <div className="ex-card">
        <div className="ex-head">
          <h4>Monthly casualties, 2021 vs 2022</h4>

          {/* year on/off buttons */}
          <div className="chips small">
            {[2021, 2022].map((year) => (
              <button
                key={year}
                className={'chip' + (visibleYears[year] ? ' on' : '')}
                style={visibleYears[year] ? { '--chip': YEAR_COLORS[year] } : undefined}
                aria-pressed={visibleYears[year]}
                onClick={() => setVisibleYears((v) => ({ ...v, [year]: !v[year] }))}
              >
                <i style={{ background: YEAR_COLORS[year] }} /> {year}
              </button>
            ))}
          </div>
        </div>

        <div className="linewrap">
          <svg viewBox={`0 0 ${W} ${H}`} onPointerMove={handlePointerMove} onPointerLeave={() => setHoverMonth(null)} role="img" aria-label="Line chart of monthly road casualties for 2021 and 2022">
            {/* horizontal grid lines + y-axis labels */}
            {gridTicks.map((tick) => (
              <g key={tick}>
                <line x1={PAD.left} x2={W - PAD.right} y1={yAt(tick)} y2={yAt(tick)} className="gridline" />
                <text x={PAD.left - 8} y={yAt(tick) + 4} textAnchor="end" className="axis">
                  {tick / 1000}k
                </text>
              </g>
            ))}

            {/* x-axis month names */}
            {roadData.months.map((month, i) => (
              <text key={month} x={xAt(i)} y={H - 8} textAnchor="middle" className="axis">
                {month}
              </text>
            ))}

            {/* dono lines */}
            {visibleYears[2021] && <path d={toPath(roadData.y2021)} className="line l21" />}
            {visibleYears[2022] && <path d={toPath(roadData.y2022)} className="line l22" />}

            {/* hover: vertical line + dots */}
            {hoverMonth !== null && (
              <g>
                <line x1={xAt(hoverMonth)} x2={xAt(hoverMonth)} y1={PAD.top} y2={H - PAD.bottom} className="cursor" />
                {visibleYears[2021] && <circle cx={xAt(hoverMonth)} cy={yAt(roadData.y2021[hoverMonth])} r="5" fill={YEAR_COLORS[2021]} />}
                {visibleYears[2022] && <circle cx={xAt(hoverMonth)} cy={yAt(roadData.y2022[hoverMonth])} r="5" fill={YEAR_COLORS[2022]} />}
              </g>
            )}
          </svg>

          {/* chart ke neeche tooltip line */}
          <div className="tip">
            {hoverMonth === null ? (
              <span className="muted">Move over the chart to compare a month.</span>
            ) : (
              <>
                <b>{roadData.months[hoverMonth]}</b>
                {visibleYears[2021] && <span className="t21">2021: {formatNumber(roadData.y2021[hoverMonth])}</span>}
                {visibleYears[2022] && <span className="t22">2022: {formatNumber(roadData.y2022[hoverMonth])}</span>}
                {visibleYears[2021] && visibleYears[2022] && (
                  <span className="muted">change: {(((roadData.y2022[hoverMonth] - roadData.y2021[hoverMonth]) / roadData.y2021[hoverMonth]) * 100).toFixed(1)}%</span>
                )}
              </>
            )}
          </div>
        </div>

        <p className="ex-note">
          Year totals: <b className="t21">2021 = {formatNumber(total2021)}</b> · <b className="t22">2022 = {formatNumber(total2022)}</b> ({yoyChange.toFixed(1)}% YoY)
        </p>
      </div>
    </div>
  )
}
