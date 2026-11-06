import { useState, useMemo } from 'react'
import styles from './analytics.module.css'

const weekData = [
  { day: 'Mon', minutes: 145, sessions: 4 },
  { day: 'Tue', minutes: 98, sessions: 3 },
  { day: 'Wed', minutes: 210, sessions: 6 },
  { day: 'Thu', minutes: 175, sessions: 5 },
  { day: 'Fri', minutes: 60, sessions: 2 },
  { day: 'Sat', minutes: 40, sessions: 1 },
  { day: 'Sun', minutes: 130, sessions: 4 },
]

const categories = [
  { label: 'Deep Work', value: 42, color: '#7c6cff' },
  { label: 'Meetings', value: 24, color: '#37e2ff' },
  { label: 'Admin', value: 18, color: '#ff8a5c' },
  { label: 'Learning', value: 16, color: '#4dff88' },
]

const stats = [
  { label: 'Total focus time', value: '14h 38m', delta: '+12%', up: true },
  { label: 'Sessions completed', value: '25', delta: '+4', up: true },
  { label: 'Avg. session length', value: '35m', delta: '-3m', up: false },
  { label: 'Longest streak', value: '6 days', delta: '+2', up: true },
]

const ranges = ['7D', '30D', '90D']

export default function Analytics() {
  const [range, setRange] = useState('7D')
  const [hoverBar, setHoverBar] = useState(null)

  const maxMinutes = Math.max(...weekData.map((d) => d.minutes))
  const chartHeight = 160
  const chartWidth = 560
  const padding = 20

  // Line chart points for the "minutes" trend
  const points = useMemo(() => {
    const stepX = (chartWidth - padding * 2) / (weekData.length - 1)
    return weekData.map((d, i) => {
      const x = padding + i * stepX
      const y = chartHeight - padding - (d.minutes / maxMinutes) * (chartHeight - padding * 2)
      return { x, y, ...d }
    })
  }, [maxMinutes])

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`

  // Donut chart geometry
  const total = categories.reduce((s, c) => s + c.value, 0)
  let cumulative = 0
  const donutSegments = categories.map((c) => {
    const startPct = cumulative / total
    cumulative += c.value
    const endPct = cumulative / total
    return { ...c, startPct, endPct }
  })
  const radius = 70
  const circumference = 2 * Math.PI * radius

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>Analytics</div>
            <h1>Your focus this week</h1>
          </div>
          <div className={styles.rangeToggle}>
            {ranges.map((r) => (
              <button
                key={r}
                className={`${styles.rangeBtn} ${range === r ? styles.rangeBtnActive : ''}`}
                onClick={() => setRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className={styles.statGrid}>
          {stats.map((s) => (
            <div className={styles.statCard} key={s.label}>
              <span className={styles.statLabel}>{s.label}</span>
              <div className={styles.statBottom}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={`${styles.statDelta} ${s.up ? styles.deltaUp : styles.deltaDown}`}>
                  {s.up ? '↑' : '↓'} {s.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Line chart: focus minutes trend */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <span className={styles.chartTitle}>Focus minutes per day</span>
            <span className={styles.chartSub}>Peak: Wednesday · 210 min</span>
          </div>

          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className={styles.lineSvg}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c6cff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#7c6cff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* gridlines */}
            {[0.25, 0.5, 0.75].map((f) => (
              <line
                key={f}
                x1={padding} x2={chartWidth - padding}
                y1={padding + f * (chartHeight - padding * 2)}
                y2={padding + f * (chartHeight - padding * 2)}
                className={styles.gridLine}
              />
            ))}

            <path d={areaPath} fill="url(#areaGrad)" />
            <path d={linePath} fill="none" stroke="#7c6cff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={hoverBar === i ? 6 : 4} fill="#7c6cff" stroke="#0b0b16" strokeWidth="2" />
                <rect
                  x={p.x - 20} y={0} width={40} height={chartHeight}
                  fill="transparent"
                  onMouseEnter={() => setHoverBar(i)}
                  onMouseLeave={() => setHoverBar(null)}
                  style={{ cursor: 'pointer' }}
                />
              </g>
            ))}
          </svg>

          <div className={styles.xLabels}>
            {weekData.map((d, i) => (
              <span key={d.day} className={hoverBar === i ? styles.xLabelActive : ''}>{d.day}</span>
            ))}
          </div>

          {hoverBar !== null && (
            <div className={styles.tooltip} style={{ left: `${(points[hoverBar].x / chartWidth) * 100}%` }}>
              <strong>{weekData[hoverBar].minutes} min</strong>
              <span>{weekData[hoverBar].sessions} sessions · {weekData[hoverBar].day}</span>
            </div>
          )}
        </div>

        <div className={styles.splitRow}>
          {/* Bar chart: sessions count */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <span className={styles.chartTitle}>Sessions per day</span>
            </div>
            <div className={styles.barChart}>
              {weekData.map((d, i) => (
                <div
                  className={styles.barCol}
                  key={d.day}
                  onMouseEnter={() => setHoverBar(100 + i)}
                  onMouseLeave={() => setHoverBar(null)}
                >
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.bar} ${hoverBar === 100 + i ? styles.barActive : ''}`}
                      style={{ height: `${(d.sessions / 6) * 100}%` }}
                    />
                  </div>
                  <span className={styles.barLabel}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut chart: category breakdown */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <span className={styles.chartTitle}>Time by category</span>
            </div>
            <div className={styles.donutRow}>
              <svg viewBox="0 0 180 180" className={styles.donutSvg}>
                <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" />
                {donutSegments.map((seg) => (
                  <circle
                    key={seg.label}
                    cx="90" cy="90" r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="18"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - (seg.endPct - seg.startPct))}
                    transform={`rotate(${-90 + seg.startPct * 360} 90 90)`}
                    strokeLinecap="round"
                  />
                ))}
                <text x="90" y="86" textAnchor="middle" className={styles.donutCenterValue}>
                  {weekData.reduce((s, d) => s + d.sessions, 0)}
                </text>
                <text x="90" y="104" textAnchor="middle" className={styles.donutCenterLabel}>
                  sessions
                </text>
              </svg>

              <div className={styles.legend}>
                {categories.map((c) => (
                  <div className={styles.legendRow} key={c.label}>
                    <span className={styles.legendDot} style={{ background: c.color }} />
                    <span className={styles.legendLabel}>{c.label}</span>
                    <span className={styles.legendValue}>{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}