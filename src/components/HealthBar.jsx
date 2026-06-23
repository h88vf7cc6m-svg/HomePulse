import { useEffect, useState } from 'react'

export default function HealthBar({ score }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(score), 100)
    return () => clearTimeout(t)
  }, [score])

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700 }}>
          🏠 Home Health Score
        </span>
        <span style={{ color: 'var(--teal)', fontSize: 14, fontWeight: 900 }}>{score}%</span>
      </div>

      <div className="health-bar-track">
        <div className="health-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}
