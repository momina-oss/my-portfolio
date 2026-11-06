import { useState, useEffect } from 'react'
import styles from './locationtracker.module.css'

const people = [
  {
    id: 1,
    name: 'Amir R.',
    color: '#ff8a5c',
    x: 42, y: 38,
    status: 'At Flowmode HQ',
    eta: null,
    lastUpdate: 'Live',
    battery: 82,
  },
  {
    id: 2,
    name: 'Nadia K.',
    color: '#4dff88',
    x: 68, y: 55,
    status: 'Driving',
    eta: '8 min away',
    lastUpdate: 'Live',
    battery: 46,
  },
  {
    id: 3,
    name: 'Sara T.',
    color: '#ff5fa2',
    x: 25, y: 68,
    status: 'At home',
    eta: null,
    lastUpdate: '12 min ago',
    battery: 91,
  },
]

const me = { x: 50, y: 50 }

export default function LocationTracker() {
  const [selected, setSelected] = useState(people[0].id)
  const [sheetExpanded, setSheetExpanded] = useState(false)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => p + 1), 2000)
    return () => clearInterval(t)
  }, [])

  const active = people.find((p) => p.id === selected)

  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        {/* Fake map */}
        <div className={styles.map}>
          <svg className={styles.streets} viewBox="0 0 400 400" preserveAspectRatio="none">
            <rect width="400" height="400" fill="#12151c" />
            {/* street grid */}
            {[60, 140, 220, 300].map((v) => (
              <line key={'h' + v} x1="0" y1={v} x2="400" y2={v} className={styles.street} />
            ))}
            {[80, 170, 260, 340].map((v) => (
              <line key={'v' + v} x1={v} y1="0" x2={v} y2="400" className={styles.street} />
            ))}
            {/* diagonal avenue */}
            <line x1="0" y1="400" x2="400" y2="0" className={styles.avenue} />
            {/* park blob */}
            <ellipse cx="290" cy="120" rx="70" ry="55" className={styles.park} />
            {/* water */}
            <path d="M0,340 Q100,300 200,350 T400,320 V400 H0 Z" className={styles.water} />
          </svg>

          {/* Me marker */}
          <div className={styles.meMarker} style={{ left: `${me.x}%`, top: `${me.y}%` }}>
            <div className={styles.meDot} />
            <div className={styles.meRing} />
          </div>

          {/* Friend pins */}
          {people.map((p) => (
            <button
              key={p.id}
              className={`${styles.pin} ${selected === p.id ? styles.pinActive : ''}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onClick={() => { setSelected(p.id); setSheetExpanded(true) }}
            >
              <span className={styles.pinPulse} style={{ background: p.color, animationDelay: `${p.id * 0.3}s` }} />
              <span className={styles.pinAvatar} style={{ background: p.color }}>
                {p.name[0]}
              </span>
              {selected === p.id && (
                <span className={styles.pinLabel}>{p.name.split(' ')[0]}</span>
              )}
            </button>
          ))}
        </div>

        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarTitle}>
            <span className={styles.liveDot} />
            Live Locations
          </div>
          <button className={styles.recenterBtn}>⊙</button>
        </div>

        {/* Bottom sheet */}
        <div className={`${styles.sheet} ${sheetExpanded ? styles.sheetExpanded : ''}`}>
          <button className={styles.sheetHandle} onClick={() => setSheetExpanded((s) => !s)} />

          {/* Selected person summary — always visible */}
          <div className={styles.selectedCard}>
            <span className={styles.selectedAvatar} style={{ background: active.color }}>
              {active.name[0]}
            </span>
            <div className={styles.selectedInfo}>
              <span className={styles.selectedName}>{active.name}</span>
              <span className={styles.selectedStatus}>
                {active.status}{active.eta && ` · ${active.eta}`}
              </span>
            </div>
            <div className={styles.selectedMeta}>
              <span className={styles.batteryTag}>🔋 {active.battery}%</span>
              <span className={styles.updateTag}>{active.lastUpdate}</span>
            </div>
          </div>

          {/* Full list — visible when expanded */}
          <div className={styles.peopleList}>
            {people.map((p) => (
              <button
                key={p.id}
                className={`${styles.personRow} ${selected === p.id ? styles.personRowActive : ''}`}
                onClick={() => setSelected(p.id)}
              >
                <span className={styles.rowAvatar} style={{ background: p.color }}>{p.name[0]}</span>
                <div className={styles.rowInfo}>
                  <span className={styles.rowName}>{p.name}</span>
                  <span className={styles.rowStatus}>{p.status}</span>
                </div>
                {p.eta && <span className={styles.rowEta}>{p.eta}</span>}
              </button>
            ))}

            <button className={styles.shareBtn}>📍 Share my location</button>
          </div>
        </div>
      </div>
    </div>
  )
}