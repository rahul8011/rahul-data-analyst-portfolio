import { useEffect, useRef, useState } from 'react'
import { sqlExamples } from '../../data/sqlExamples'
import { formatNumber } from '../../utils/formatNumber'
import './SqlPlayground.css'

// SQL keywords jinhe violet color me dikhana hai
const KEYWORDS = /\b(SELECT|FROM|GROUP|BY|ORDER|DESC|ASC|AS|SUM|ROUND|OVER|CASE|WHEN|THEN|END|YEAR|MONTH|MONTHNAME|LIMIT|WHERE|JOIN|ON|LEFT|AND|OR)\b/g

/**
 * Simple syntax highlighting.
 * Text me keywords aur numbers dhundhta hai aur unhe <span className="kw|num"> me lapet deta hai.
 * Baaki text jaisa hai waisa rehta hai.
 */
function highlight(sql) {
  const pieces = []
  const pattern = new RegExp(`${KEYWORDS.source}|\\b\\d+(?:\\.\\d+)?\\b`, 'g')
  let lastEnd = 0
  let match
  let key = 0

  while ((match = pattern.exec(sql))) {
    if (match.index > lastEnd) pieces.push(sql.slice(lastEnd, match.index)) // match se pehle ka normal text
    const className = /^\d/.test(match[0]) ? 'num' : 'kw'
    pieces.push(
      <span key={key++} className={className}>
        {match[0]}
      </span>,
    )
    lastEnd = match.index + match[0].length
  }
  if (lastEnd < sql.length) pieces.push(sql.slice(lastEnd))
  return pieces
}

/** Result table ke ek cell ko readable text me badalta hai. */
function formatCell(cell) {
  if (cell === null) return <i className="null">NULL</i>
  if (typeof cell === 'number') return cell % 1 ? cell.toFixed(1) : formatNumber(cell)
  return cell
}

/**
 * Fake SQL editor:
 *  1. query type hoti hai (typing animation)
 *  2. "Run" dabao -> thodi der "Running..." -> result table
 *
 * phase: "typing" -> "ready" -> "running" -> "done"
 * Queries aur results: src/data/sqlExamples.js
 */
export default function SqlPlayground() {
  const [exampleId, setExampleId] = useState(sqlExamples[0].id)
  const example = sqlExamples.find((e) => e.id === exampleId)

  const [typedSql, setTypedSql] = useState('') // abhi tak type hua text
  const [phase, setPhase] = useState('typing')
  const typingTimer = useRef(0)

  // jab bhi nayi query chuni jaye, typing animation phir se shuru
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPhase('typing')
    setTypedSql('')

    if (reduceMotion) {
      setTypedSql(example.sql)
      setPhase('ready')
      return
    }

    let charsShown = 0
    const typeNextChunk = () => {
      charsShown += 3 // ek baar me 3 letters (tez typing)
      setTypedSql(example.sql.slice(0, charsShown))

      if (charsShown >= example.sql.length) {
        setTypedSql(example.sql)
        setPhase('ready')
        return
      }
      typingTimer.current = window.setTimeout(typeNextChunk, 16)
    }
    typingTimer.current = window.setTimeout(typeNextChunk, 120)

    return () => window.clearTimeout(typingTimer.current)
  }, [example])

  const runQuery = () => {
    // agar typing abhi chal rahi thi to use pehle poora kar do
    if (phase === 'typing') {
      window.clearTimeout(typingTimer.current)
      setTypedSql(example.sql)
    }
    setPhase('running')
    window.setTimeout(() => setPhase('done'), 650) // fake "query chal rahi hai" delay
  }

  // Jab sirf 2 columns hon to number wale column me chhoti progress bar dikhate hain
  const numberColumn = example.cols.findIndex((_, i) => i > 0 && typeof example.rows[0][i] === 'number')
  const showMiniBars = example.cols.length === 2
  const maxValue = Math.max(...example.rows.map((row) => (typeof row[numberColumn] === 'number' ? row[numberColumn] : 0)))

  return (
    <div className="sql">
      {/* ---------- left: query list ---------- */}
      <div className="sql-side">
        <p className="muted">Pick a query, then hit Run. Results are the real numbers from my Road Accident PivotTables.</p>
        {sqlExamples.map((e) => (
          <button key={e.id} className={'sql-pick' + (e.id === exampleId ? ' on' : '')} onClick={() => setExampleId(e.id)}>
            <span className="dot" /> {e.label}
          </button>
        ))}
      </div>

      <div className="sql-main">
        {/* ---------- editor ---------- */}
        <div className="editor">
          <div className="editor-bar">
            <span className="file">query.sql</span>
            <button className="run" onClick={runQuery} disabled={phase === 'running'}>
              {phase === 'running' ? 'Running…' : phase === 'done' ? '↻ Run again' : '▶ Run'}
            </button>
          </div>
          <pre aria-label="SQL query">
            <code>
              {highlight(typedSql)}
              {phase === 'typing' && <span className="caret" />}
            </code>
          </pre>
        </div>

        {/* ---------- result table ---------- */}
        <div className="results" aria-live="polite">
          {phase === 'done' ? (
            <table>
              <thead>
                <tr>
                  {example.cols.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {example.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} style={{ animationDelay: `${rowIndex * 60}ms` }}>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className={typeof cell === 'number' ? 'n' : ''}>
                        {formatCell(cell)}
                        {showMiniBars && colIndex === numberColumn && typeof cell === 'number' && <span className="mini" style={{ width: `${(cell / maxValue) * 100}%` }} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="placeholder">{phase === 'running' ? 'Executing query…' : 'Result set appears here after you run the query.'}</div>
          )}
          {phase === 'done' && <p className="rowcount">{example.rows.length} rows returned</p>}
        </div>
      </div>
    </div>
  )
}
