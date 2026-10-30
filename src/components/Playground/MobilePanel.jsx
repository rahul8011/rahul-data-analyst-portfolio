import { useState } from 'react'
import { mobileData } from '../../data/mobileData'
import { CHART_COLORS } from './chartColors'

const YEARS = [2022, 2023, 2024]

/**
 * Mobile sales: quarter chuno (Q1/Q2/Q3), teen saal ki bars dekho,
 * aur har saal pichle saal se kitna badha/ghata (YoY %) wo badge me dikhta hai.
 *
 * "Zoom the axis" checkbox: bars ko zero se na shuru karke chhote difference bade dikhata hai
 * (honest chart ke liye default me zero se shuru hota hai).
 */
export default function MobilePanel() {
  const [quarter, setQuarter] = useState('Q1')
  const [zoomAxis, setZoomAxis] = useState(false)

  const values = mobileData.quarters[quarter] // { 2022: ..., 2023: ..., 2024: ... }
  const list = YEARS.map((year) => values[year])
  const highest = Math.max(...list)
  const lowest = Math.min(...list)

  // bars ki "zero line": normal me 0, zoom me lowest se thoda neeche (million me round)
  const axisFloor = zoomAxis ? Math.floor((lowest * 0.9) / 1e6) * 1e6 : 0

  // pichle saal ke mukable % change (pehle saal ka koi pichla saal nahi, isliye null)
  const yoyChange = YEARS.map((year, i) => {
    if (i === 0) return null
    const previous = values[YEARS[i - 1]]
    return ((values[year] - previous) / previous) * 100
  })

  return (
    <div className="ex-grid">
      <div className="ex-card wide">
        <div className="ex-head">
          <h4>Same period last year, by quarter</h4>
          <span className="ex-total">
            {(mobileData.total / 1e6).toFixed(1)}M <small>total sales</small>
          </span>
        </div>

        <div className="row-between">
          <div className="chips">
            {Object.keys(mobileData.quarters).map((q) => (
              <button key={q} className={'chip' + (q === quarter ? ' on' : '')} onClick={() => setQuarter(q)}>
                {q}
              </button>
            ))}
          </div>

          <label className="switch">
            <input type="checkbox" checked={zoomAxis} onChange={(e) => setZoomAxis(e.target.checked)} />
            <span>Zoom the axis to see the differences</span>
          </label>
        </div>

        <div className="vbars" role="img" aria-label={`Total sales for ${quarter} in 2022, 2023 and 2024`}>
          {YEARS.map((year, i) => {
            const value = values[year]
            // bar ki height % me (kam se kam 4% taaki bar dikhe)
            const heightPercent = Math.max(4, ((value - axisFloor) / (highest - axisFloor)) * 100)

            return (
              <div className="vb" key={year}>
                <div className="vb-top">
                  <b>{(value / 1e6).toFixed(2)}M</b>
                  {yoyChange[i] !== null && (
                    <span className={'badge ' + (yoyChange[i] >= 0 ? 'up' : 'down')}>
                      {yoyChange[i] >= 0 ? '▲' : '▼'} {Math.abs(yoyChange[i]).toFixed(1)}% vs {YEARS[i - 1]}
                    </span>
                  )}
                </div>
                <div className="vb-col">
                  <div className="vb-fill" style={{ height: `${heightPercent}%`, background: CHART_COLORS[i] }} />
                </div>
                <span className="vb-year">{year}</span>
              </div>
            )
          })}
        </div>

        <p className="ex-note">
          {zoomAxis ? 'Axis is zoomed in, so bar heights exaggerate the gaps. ' : 'Axis starts at zero, so the bars are honest but close. '}
          Figures from the quarterly table in my Power BI report (Total_Sales and Same_period_last_year).
        </p>
      </div>
    </div>
  )
}
