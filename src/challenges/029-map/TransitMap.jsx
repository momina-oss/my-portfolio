import { useState, useMemo } from 'react'
import styles from './transitmap.module.css'

const lines = [
  { id: 'purple', name: 'Violet Line', color: '#7c6cff', stationIds: ['a1', 'a2', 'a3', 'a4', 'a5'] },
  { id: 'cyan', name: 'Azure Line', color: '#37e2ff', stationIds: ['b1', 'b2', 'a3', 'b3', 'b4'] },
  { id: 'orange', name: 'Amber Line', color: '#ff8a5c', stationIds: ['c1', 'c2', 'b3', 'c3', 'c4'] },
  { id: 'green', name: 'Cedar Line', color: '#4dff88', stationIds: ['d1', 'a1', 'd2', 'a4', 'd3'] },
]

const stations = {
  a1: { name: 'Riverside', x: 50, y: 90 },
  a2: { name: 'Market Square', x: 130, y: 90 },
  a3: { name: 'Central Junction', x: 210, y: 90 },
  a4: { name: 'University', x: 290, y: 90 },
  a5: { name: 'Harborview', x: 360, y: 90 },
  b1: { name: 'North Gate', x: 210, y: 30 },
  b2: { name: 'Old Town', x: 210, y: 60 },
  b3: { name: 'Grand Terminal', x: 210, y: 155 },
  b4: { name: 'South Meadow', x: 210, y: 215 },
  c1: { name: 'Millbrook', x: 70, y: 245 },
  c2: { name: 'Fairview', x: 140, y: 200 },
  c3: { name: 'East Ridge', x: 280, y: 200 },
  c4: { name: 'Sunset Pier', x: 345, y: 245 },
  d1: { name: 'Aspen Court', x: 65, y: 45 },
  d2: { name: 'Lakeview', x: 130, y: 145 },
  d3: { name: 'Cedar Heights', x: 355, y: 145 },
}

const arrivalsFor = (stationId) => {
  // deterministic-ish fake arrival times based on station id
  const seed = stationId.charCodeAt(0) + stationId.charCodeAt(1)
  return [2 + (seed % 4), 8 + (seed % 5), 14 + (seed % 6)]
}

export default function TransitMap() {
  const [vintage, setVintage] = useState(false)
  const [selected, setSelected] = useState('a3')
  const [search, setSearch] = useState('')
  const [hoveredLine, setHoveredLine] = useState(null)

  const linesAtStation = (stationId) => lines.filter((l) => l.stationIds.includes(stationId))

  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return Object.entries(stations)
      .filter(([, s]) => s.name.toLowerCase().includes(q))
      .slice(0, 5)
  }, [search])

  const selectedStation = stations[selected]
  const selectedLines = linesAtStation(selected)

  return (
    <div className={styles.page} data-vintage={vintage}>
      <div className={styles.wrap}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>{vintage ? 'Ye Olde Transit Chart' : 'City Transit'}</div>
            <h1>{vintage ? 'A Cartographer\'s Rendering' : 'Metro Map'}</h1>
          </div>
          <button className={styles.vintageToggle} onClick={() => setVintage((v) => !v)}>
            {vintage ? '🗺️ Back to digital' : '📜 Make it old-school'}
          </button>
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <input
            type="text"
            placeholder="Search for a station..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {searchResults.length > 0 && (
            <div className={styles.searchDropdown}>
              {searchResults.map(([id, s]) => (
                <button
                  key={id}
                  className={styles.searchResult}
                  onClick={() => { setSelected(id); setSearch('') }}
                >
                  {s.name}
                  <span className={styles.searchDots}>
                    {linesAtStation(id).map((l) => (
                      <span key={l.id} className={styles.miniDot} style={{ background: l.color }} />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.layout}>
          {/* Map */}
          <div className={styles.mapCard}>
            <svg viewBox="0 0 400 290" className={styles.svgMap}>
              {vintage && (
                <>
                  <rect width="400" height="290" fill="var(--paper)" />
                  {/* faux compass rose */}
                  <g transform="translate(360, 260)" opacity="0.5">
                    <circle r="18" fill="none" stroke="var(--ink)" strokeWidth="1" />
                    <text x="0" y="-22" textAnchor="middle" fontSize="9" fill="var(--ink)">N</text>
                  </g>
                </>
              )}

              {/* Line paths */}
              {lines.map((line) => {
                const pts = line.stationIds.map((id) => stations[id])
                const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
                return (
                  <path
                    key={line.id}
                    d={d}
                    fill="none"
                    stroke={vintage ? 'var(--ink)' : line.color}
                    strokeWidth={hoveredLine === line.id ? 5 : 3.5}
                    strokeDasharray={vintage ? (line.id === 'orange' ? '2 3' : line.id === 'green' ? '1 4' : 'none') : 'none'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={hoveredLine && hoveredLine !== line.id ? 0.25 : 1}
                    style={{ transition: 'opacity 0.15s, stroke-width 0.15s' }}
                  />
                )
              })}

              {/* Stations */}
              {Object.entries(stations).map(([id, s]) => {
                const isInterchange = linesAtStation(id).length > 1
                const isSelected = id === selected
                return (
                  <g key={id} onClick={() => setSelected(id)} style={{ cursor: 'pointer' }}>
                    <circle
                      cx={s.x} cy={s.y}
                      r={isInterchange ? 7 : 5}
                      fill={vintage ? 'var(--paper)' : '#0b0b16'}
                      stroke={vintage ? 'var(--ink)' : isSelected ? '#fff' : '#7a7a8c'}
                      strokeWidth={isSelected ? 3 : isInterchange ? 2.5 : 1.5}
                    />
                    {isSelected && (
                      <circle cx={s.x} cy={s.y} r="12" fill="none" stroke={vintage ? 'var(--ink)' : '#7c6cff'} strokeWidth="1.5" opacity="0.6">
                        <animate attributeName="r" values="9;14;9" dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <text
                      x={s.x}
                      y={s.y - 12}
                      textAnchor="middle"
                      fontSize={vintage ? 8.5 : 7.5}
                      fontFamily={vintage ? 'Georgia, serif' : 'inherit'}
                      fontStyle={vintage ? 'italic' : 'normal'}
                      fill={vintage ? 'var(--ink)' : '#c4c4d2'}
                    >
                      {s.name}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Legend */}
            <div className={styles.legendCard}>
              <span className={styles.legendTitle}>Lines</span>
              {lines.map((l) => (
                <button
                  key={l.id}
                  className={styles.legendRow}
                  onMouseEnter={() => setHoveredLine(l.id)}
                  onMouseLeave={() => setHoveredLine(null)}
                >
                  <span className={styles.legendDot} style={{ background: vintage ? 'var(--ink)' : l.color }} />
                  {l.name}
                </button>
              ))}
            </div>

            {/* Station info */}
            {selectedStation && (
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Selected station</span>
                <h3>{selectedStation.name}</h3>
                <div className={styles.infoLines}>
                  {selectedLines.map((l) => (
                    <span key={l.id} className={styles.infoLineTag} style={{ borderColor: vintage ? 'var(--ink)' : l.color, color: vintage ? 'var(--ink)' : l.color }}>
                      {l.name}
                    </span>
                  ))}
                </div>
                <div className={styles.arrivalsBlock}>
                  <span className={styles.arrivalsLabel}>Next arrivals</span>
                  {arrivalsFor(selected).map((min, i) => (
                    <div className={styles.arrivalRow} key={i}>
                      <span className={styles.arrivalDot} style={{ background: vintage ? 'var(--ink)' : selectedLines[i % selectedLines.length]?.color }} />
                      <span>{selectedLines[i % selectedLines.length]?.name}</span>
                      <span className={styles.arrivalTime}>{min} min</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}