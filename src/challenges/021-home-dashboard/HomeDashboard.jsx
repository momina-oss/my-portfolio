import { useState, useEffect } from 'react'
import styles from './homedashboard.module.css'

const cameras = [
  { id: 1, name: 'Front Door', color: '#7c6cff', activity: 'Motion 4m ago' },
  { id: 2, name: 'Backyard', color: '#37e2ff', activity: 'Clear' },
  { id: 3, name: 'Garage', color: '#ff8a5c', activity: 'Clear' },
  { id: 4, name: 'Living Room', color: '#4dff88', activity: 'Clear' },
]

const sensors = [
  { id: 1, name: 'Front Door', type: 'door', state: 'closed' },
  { id: 2, name: 'Back Door', type: 'door', state: 'closed' },
  { id: 3, name: 'Living Room Window', type: 'window', state: 'open' },
  { id: 4, name: 'Garage Door', type: 'garage', state: 'closed' },
  { id: 5, name: 'Smoke Detector', type: 'smoke', state: 'ok' },
  { id: 6, name: 'Motion — Hallway', type: 'motion', state: 'idle' },
]

const initialFeed = [
  { id: 1, icon: '🚪', text: 'Front door unlocked', time: '2m ago', tone: 'info' },
  { id: 2, icon: '📹', text: 'Motion detected — Front Door camera', time: '4m ago', tone: 'warn' },
  { id: 3, icon: '🌡️', text: 'Thermostat set to 72°F', time: '38m ago', tone: 'info' },
  { id: 4, icon: '🔒', text: 'Back door locked automatically', time: '1h ago', tone: 'success' },
  { id: 5, icon: '💡', text: 'Living room lights turned off', time: '2h ago', tone: 'info' },
]

const energyData = [32, 28, 40, 45, 38, 52, 48, 60, 55, 42, 38, 44]

export default function HomeDashboard() {
  const [selectedCam, setSelectedCam] = useState(1)
  const [feed, setFeed] = useState(initialFeed)
  const [sensorStates, setSensorStates] = useState(sensors)
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1200)
    return () => clearInterval(t)
  }, [])

  const openSensors = sensorStates.filter((s) => s.state === 'open').length
  const allSecure = openSensors === 0

  const maxEnergy = Math.max(...energyData)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>Home Dashboard</div>
            <h1>Good morning, Mina</h1>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.tempPill}>☀️ 74°F outside</span>
          </div>
        </div>

        {/* Status banner — most important info, top placement */}
        <div className={`${styles.statusBanner} ${allSecure ? styles.statusSecure : styles.statusAlert}`}>
          <div className={styles.statusLeft}>
            <span className={`${styles.statusDot} ${pulse ? styles.statusDotPulse : ''}`} />
            <div>
              <span className={styles.statusTitle}>
                {allSecure ? 'All secure' : `${openSensors} sensor${openSensors > 1 ? 's' : ''} need attention`}
              </span>
              <span className={styles.statusSub}>
                {allSecure ? 'Every door, window, and sensor is reporting normal.' : 'Living Room Window has been open for 40 min.'}
              </span>
            </div>
          </div>
          <button className={styles.statusAction}>
            {allSecure ? 'View all sensors' : 'Review now →'}
          </button>
        </div>

        <div className={styles.grid}>
          {/* Cameras */}
          <div className={styles.cardWide}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Cameras</span>
              <span className={styles.cardSub}>4 online</span>
            </div>
            <div className={styles.camGrid}>
              {cameras.map((c) => (
                <button
                  key={c.id}
                  className={`${styles.camThumb} ${selectedCam === c.id ? styles.camThumbActive : ''}`}
                  onClick={() => setSelectedCam(c.id)}
                  style={{ '--cam-color': c.color }}
                >
                  <div className={styles.camPreview} style={{ background: `linear-gradient(160deg, ${c.color}33, #101018)` }}>
                    <span className={styles.liveTag}>● LIVE</span>
                  </div>
                  <div className={styles.camMeta}>
                    <span className={styles.camName}>{c.name}</span>
                    <span className={c.activity.includes('Motion') ? styles.camActivityAlert : styles.camActivity}>
                      {c.activity}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Energy usage */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Energy today</span>
              <span className={styles.cardSub}>4.2 kWh</span>
            </div>
            <div className={styles.energyChart}>
              {energyData.map((v, i) => (
                <div className={styles.energyBarTrack} key={i}>
                  <div
                    className={styles.energyBar}
                    style={{ height: `${(v / maxEnergy) * 100}%` }}
                  />
                </div>
              ))}
            </div>
            <div className={styles.energyLabels}>
              <span>12am</span>
              <span>Now</span>
            </div>
          </div>

          {/* Sensors */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Sensors</span>
              <span className={styles.cardSub}>{sensorStates.length} total</span>
            </div>
            <div className={styles.sensorList}>
              {sensorStates.map((s) => (
                <div className={styles.sensorRow} key={s.id}>
                  <span className={styles.sensorIcon}>
                    {s.type === 'door' && '🚪'}
                    {s.type === 'window' && '🪟'}
                    {s.type === 'garage' && '🚗'}
                    {s.type === 'smoke' && '🔥'}
                    {s.type === 'motion' && '🏃'}
                  </span>
                  <span className={styles.sensorName}>{s.name}</span>
                  <span
                    className={`${styles.sensorState} ${
                      s.state === 'open' ? styles.stateAlert : styles.stateOk
                    }`}
                  >
                    {s.state === 'closed' && 'Closed'}
                    {s.state === 'open' && 'Open'}
                    {s.state === 'ok' && 'Normal'}
                    {s.state === 'idle' && 'No motion'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Climate */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Climate</span>
            </div>
            <div className={styles.climateRow}>
              <div className={styles.climateBig}>
                <span className={styles.climateTemp}>72°</span>
                <span className={styles.climateLabel}>Indoor · Cooling</span>
              </div>
              <div className={styles.climateStats}>
                <div className={styles.climateStat}>
                  <span>💧 Humidity</span>
                  <span>44%</span>
                </div>
                <div className={styles.climateStat}>
                  <span>🌬️ Air quality</span>
                  <span className={styles.aqGood}>Good</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div className={styles.cardWide}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Recent activity</span>
            </div>
            <div className={styles.feedList}>
              {feed.map((f) => (
                <div className={styles.feedRow} key={f.id}>
                  <span className={`${styles.feedIcon} ${styles['feedIcon' + f.tone]}`}>{f.icon}</span>
                  <span className={styles.feedText}>{f.text}</span>
                  <span className={styles.feedTime}>{f.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}