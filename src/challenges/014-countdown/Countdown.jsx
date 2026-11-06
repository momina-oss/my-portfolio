import { useState, useEffect, useRef, useMemo } from 'react'
import styles from './countdown.module.css'

const presets = [
  { label: '10s', seconds: 10 },
  { label: '30s', seconds: 30 },
  { label: '60s', seconds: 60 },
  { label: '2m', seconds: 120 },
]

// status callouts fired at specific T-minus thresholds, like real mission control
const callouts = [
  { at: 0.9, text: 'Terminal count is go.' },
  { at: 0.75, text: 'Fuel tanks at flight pressure.' },
  { at: 0.5, text: 'Guidance system is internal.' },
  { at: 0.3, text: 'All systems go for launch.' },
  { at: 0.15, text: 'Ignition sequence armed.' },
  { at: 0.05, text: 'Engines at full thrust.' },
]

export default function Countdown() {
  const [totalSeconds, setTotalSeconds] = useState(30)
  const [remaining, setRemaining] = useState(30)
  const [status, setStatus] = useState('idle') // idle | running | held | launched
  const [log, setLog] = useState([])
  const intervalRef = useRef(null)
  const firedRef = useRef(new Set())

  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0

  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current)
            setStatus('launched')
            setLog((l) => [{ id: Date.now(), text: '🚀 LIFTOFF! We have liftoff.' }, ...l])
            return 0
          }
          return r - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [status])

  // fire status callouts as we cross thresholds
  useEffect(() => {
    if (status !== 'running' || totalSeconds === 0) return
    const frac = remaining / totalSeconds
    callouts.forEach((c) => {
      const key = c.text
      if (frac <= c.at && !firedRef.current.has(key)) {
        firedRef.current.add(key)
        setLog((l) => [{ id: Date.now() + Math.random(), text: c.text }, ...l])
      }
    })
  }, [remaining, status, totalSeconds])

  const handlePreset = (seconds) => {
    clearInterval(intervalRef.current)
    firedRef.current = new Set()
    setTotalSeconds(seconds)
    setRemaining(seconds)
    setStatus('idle')
    setLog([])
  }

  const handleStart = () => {
    if (status === 'launched') return
    setStatus('running')
    setLog((l) => [{ id: Date.now(), text: `Countdown started — T-minus ${remaining}s.` }, ...l])
  }

  const handleHold = () => {
    setStatus('held')
    setLog((l) => [{ id: Date.now(), text: '⏸ Hold called. Countdown paused.' }, ...l])
  }

  const handleResume = () => {
    setStatus('running')
    setLog((l) => [{ id: Date.now(), text: 'Resuming count.' }, ...l])
  }

  const handleReset = () => {
    clearInterval(intervalRef.current)
    firedRef.current = new Set()
    setRemaining(totalSeconds)
    setStatus('idle')
    setLog([])
  }

  const timeDisplay = useMemo(() => {
    const m = Math.floor(remaining / 60)
    const s = remaining % 60
    return `T-${m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `00:${s.toString().padStart(2, '0')}`}`
  }, [remaining])

  const circumference = 2 * Math.PI * 130

  return (
    <div className={styles.page}>
      <div className={styles.stars} />

      <div className={styles.wrap}>
        <div className={styles.badge}>MISSION FLOWMODE-1</div>
        <h1>Launch Countdown</h1>

        {/* Duration presets */}
        <div className={styles.presetRow}>
          {presets.map((p) => (
            <button
              key={p.seconds}
              className={`${styles.presetBtn} ${totalSeconds === p.seconds ? styles.presetBtnActive : ''}`}
              onClick={() => handlePreset(p.seconds)}
              disabled={status === 'running' || status === 'held'}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Ring + rocket */}
        <div className={styles.ringScene}>
          <svg viewBox="0 0 280 280" className={styles.ringSvg}>
            <circle cx="140" cy="140" r="130" className={styles.ringTrack} />
            <circle
              cx="140" cy="140" r="130"
              className={`${styles.ringProgress} ${status === 'launched' ? styles.ringComplete : ''}`}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference * (1 - progress),
              }}
            />
          </svg>

          <div className={styles.ringCenter}>
            <div className={`${styles.timeText} ${remaining <= 5 && status === 'running' ? styles.timeUrgent : ''}`}>
              {status === 'launched' ? '🚀' : timeDisplay}
            </div>
            <div className={styles.statusText}>
              {status === 'idle' && 'Standing by'}
              {status === 'running' && 'Counting down'}
              {status === 'held' && 'HOLD'}
              {status === 'launched' && 'Liftoff!'}
            </div>
          </div>

          {/* Rocket that launches up on completion */}
          <div className={`${styles.rocket} ${status === 'launched' ? styles.rocketLaunch : ''}`}>
            🚀
            {status === 'launched' && <div className={styles.flame} />}
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {status === 'idle' && (
            <button className={styles.launchBtn} onClick={handleStart}>Start countdown</button>
          )}
          {status === 'running' && (
            <button className={styles.holdBtn} onClick={handleHold}>⏸ Hold</button>
          )}
          {status === 'held' && (
            <button className={styles.launchBtn} onClick={handleResume}>▶ Resume</button>
          )}
          {(status === 'held' || status === 'launched' || (status === 'idle' && log.length > 0)) && (
            <button className={styles.resetBtn} onClick={handleReset}>↻ Reset</button>
          )}
          {status === 'running' && (
            <button className={styles.resetBtn} onClick={handleReset}>Abort</button>
          )}
        </div>

        {/* Mission log */}
        <div className={styles.log}>
          <div className={styles.logHeader}>Mission control log</div>
          <div className={styles.logList}>
            {log.length === 0 && <div className={styles.logEmpty}>Awaiting launch sequence start...</div>}
            {log.map((entry) => (
              <div className={styles.logRow} key={entry.id}>
                <span className={styles.logDot} />
                {entry.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}