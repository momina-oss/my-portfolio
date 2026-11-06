import { useState, useEffect, useRef } from 'react'
import styles from './tvapp.module.css'

const continueWatching = [
  { id: 1, title: 'Deep Focus: Rain on Glass', progress: 62, duration: '45 min', color: '#37e2ff' },
  { id: 2, title: 'The Science of Attention', progress: 30, duration: '18 min', color: '#7c6cff' },
  { id: 3, title: 'Lo-fi Study Session', progress: 85, duration: '60 min', color: '#ff8a5c' },
]

const trending = [
  { id: 4, title: 'Morning Deep Work Ritual', color: '#4dff88' },
  { id: 5, title: 'Forest Ambience 4K', color: '#5a6b47' },
  { id: 6, title: 'Building an Undistracted Life', color: '#ff5fa2' },
  { id: 7, title: 'The 90-Minute Cycle', color: '#ffb84d' },
  { id: 8, title: 'Silent Coding Session', color: '#9b8cff' },
]

const newlyAdded = [
  { id: 9, title: 'Coffee Shop Ambience', color: '#c98a3e' },
  { id: 10, title: 'Attention Residue Explained', color: '#37b8e2' },
  { id: 11, title: 'Night Rain + Thunder', color: '#3a5a7a' },
  { id: 12, title: 'Focus Sprints for Teams', color: '#ff7a7a' },
  { id: 13, title: 'Ocean Waves — 8 Hours', color: '#2e9a9a' },
]

const rows = [
  { id: 'continue', label: 'Continue Watching', items: continueWatching, isContinue: true },
  { id: 'trending', label: 'Trending Now', items: trending },
  { id: 'new', label: 'Recently Added', items: newlyAdded },
]

const hero = {
  title: 'The Deep Work Protocol',
  desc: 'A 6-part guided series on building an undistractable daily rhythm — featuring real focus sessions, breathing cues, and ambient soundscapes.',
  tag: 'New Series',
}

export default function TVApp() {
  const [focusedRow, setFocusedRow] = useState(0)
  const [focusedCol, setFocusedCol] = useState(0)
  const [playerOpen, setPlayerOpen] = useState(null)
  const [muted, setMuted] = useState(false)
  const [ccOn, setCcOn] = useState(true)
  const [volume, setVolume] = useState(70)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleKey = (e) => {
      if (playerOpen) {
        if (e.key === 'Escape') setPlayerOpen(null)
        return
      }
      if (e.key === 'ArrowRight') {
        setFocusedCol((c) => Math.min(c + 1, rows[focusedRow].items.length - 1))
      } else if (e.key === 'ArrowLeft') {
        setFocusedCol((c) => Math.max(c - 1, 0))
      } else if (e.key === 'ArrowDown') {
        setFocusedRow((r) => {
          const next = Math.min(r + 1, rows.length - 1)
          setFocusedCol((c) => Math.min(c, rows[next].items.length - 1))
          return next
        })
      } else if (e.key === 'ArrowUp') {
        setFocusedRow((r) => {
          const next = Math.max(r - 1, 0)
          setFocusedCol((c) => Math.min(c, rows[next].items.length - 1))
          return next
        })
      } else if (e.key === 'Enter') {
        setPlayerOpen(rows[focusedRow].items[focusedCol])
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [focusedRow, focusedCol, playerOpen])

  return (
    <div className={styles.page} ref={containerRef} tabIndex={0}>
      {/* Top nav */}
      <div className={styles.topNav}>
        <div className={styles.logo}>◆ Flowmode TV</div>
        <nav className={styles.navLinks}>
          <span className={styles.navActive}>Home</span>
          <span>Focus Sessions</span>
          <span>Soundscapes</span>
          <span>Talks</span>
          <span>My List</span>
        </nav>
        <div className={styles.profileDot}>MK</div>
      </div>

      {/* Hero */}
      <div className={styles.hero} style={{ background: 'linear-gradient(120deg, #1a1430, #0b0b16 65%)' }}>
        <div className={styles.heroGlow} />
        <span className={styles.heroTag}>{hero.tag}</span>
        <h1>{hero.title}</h1>
        <p>{hero.desc}</p>
        <div className={styles.heroActions}>
          <button className={styles.playBtn} onClick={() => setPlayerOpen({ title: hero.title, color: '#7c6cff' })}>
            ▶ Play
          </button>
          <button className={styles.infoBtn}>ⓘ More Info</button>
        </div>
      </div>

      {/* Rows */}
      <div className={styles.rows}>
        {rows.map((row, rowIndex) => (
          <div className={styles.rowBlock} key={row.id}>
            <div className={styles.rowLabel}>{row.label}</div>
            <div className={styles.rowScroll}>
              {row.items.map((item, colIndex) => {
                const isFocused = focusedRow === rowIndex && focusedCol === colIndex
                return (
                  <button
                    key={item.id}
                    className={`${styles.card} ${row.isContinue ? styles.cardWide : ''} ${isFocused ? styles.cardFocused : ''}`}
                    onMouseEnter={() => { setFocusedRow(rowIndex); setFocusedCol(colIndex) }}
                    onClick={() => setPlayerOpen(item)}
                    style={{ '--card-color': item.color }}
                  >
                    <div className={styles.cardArt} style={{ background: `linear-gradient(160deg, ${item.color}, #101018)` }} />
                    {row.isContinue && (
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${item.progress}%` }} />
                      </div>
                    )}
                    <span className={styles.cardTitle}>{item.title}</span>
                    {item.duration && <span className={styles.cardMeta}>{item.duration} left</span>}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.hint}>Use ← → ↑ ↓ to navigate · Enter to play</div>

      {/* ---- Player overlay ---- */}
      {playerOpen && (
        <div className={styles.playerOverlay}>
          <div className={styles.playerVisual} style={{ background: `linear-gradient(160deg, ${playerOpen.color}44, #0b0b16)` }}>
            <button className={styles.closeBtn} onClick={() => setPlayerOpen(null)}>✕</button>
            <h2>{playerOpen.title}</h2>
            <div className={styles.playerCenter}>▶</div>
          </div>

          <div className={styles.playerControls}>
            <div className={styles.seekTrack}>
              <div className={styles.seekFill} style={{ width: '38%' }} />
            </div>
            <div className={styles.controlsRow}>
              <div className={styles.controlsLeft}>
                <button className={styles.ctrlBtn}>⏮</button>
                <button className={styles.ctrlBtnBig}>⏸</button>
                <button className={styles.ctrlBtn}>⏭</button>
                <div className={styles.volumeGroup}>
                  <button className={styles.ctrlBtn} onClick={() => setMuted((m) => !m)}>
                    {muted || volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}
                  </button>
                  <input
                    type="range"
                    min="0" max="100"
                    value={muted ? 0 : volume}
                    onChange={(e) => { setVolume(+e.target.value); setMuted(false) }}
                    className={styles.volSlider}
                  />
                </div>
              </div>
              <div className={styles.controlsRight}>
                <button
                  className={`${styles.ccBtn} ${ccOn ? styles.ccBtnActive : ''}`}
                  onClick={() => setCcOn((c) => !c)}
                >
                  CC
                </button>
                <button className={styles.langBtn}>🌐 English</button>
                <button className={styles.ctrlBtn}>⛶</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}