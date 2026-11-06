import { useState } from 'react'
import styles from './smartpanel.module.css'

export default function SmartPanel() {
  const [awayMode, setAwayMode] = useState(false)
  const [lights, setLights] = useState({ living: true, kitchen: false, bedroom: true })
  const [brightness, setBrightness] = useState({ living: 70, kitchen: 40, bedroom: 55 })
  const [locked, setLocked] = useState(true)
  const [thermoOn, setThermoOn] = useState(true)
  const [temp, setTemp] = useState(72)
  const [fanOn, setFanOn] = useState(false)
  const [fanSpeed, setFanSpeed] = useState(2)

  const toggleLight = (room) => {
    if (awayMode) return
    setLights((l) => ({ ...l, [room]: !l[room] }))
  }

  const adjustBrightness = (room, delta) => {
    if (awayMode || !lights[room]) return
    setBrightness((b) => ({ ...b, [room]: Math.min(100, Math.max(10, b[room] + delta)) }))
  }

  const rooms = [
    { id: 'living', label: 'Living Room' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'bedroom', label: 'Bedroom' },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>Home control</div>
          <h1>Good evening, Mina</h1>
          <p className={styles.sub}>3 devices on · Front door locked</p>
        </div>

        {/* Master away toggle */}
        <div className={`${styles.awayCard} ${awayMode ? styles.awayCardActive : ''}`}>
          <div className={styles.awayText}>
            <span className={styles.awayIcon}>{awayMode ? '🌙' : '🏠'}</span>
            <div>
              <div className={styles.awayTitle}>Away Mode</div>
              <div className={styles.awaySub}>
                {awayMode ? 'All lights off · Doors locked · Thermostat set to eco' : 'Everything running as usual'}
              </div>
            </div>
          </div>
          <button
            className={`${styles.masterSwitch} ${awayMode ? styles.masterSwitchOn : ''}`}
            onClick={() => setAwayMode((a) => !a)}
            role="switch"
            aria-checked={awayMode}
          >
            <span className={styles.masterKnob} />
          </button>
        </div>

        {/* Lights */}
        <div className={styles.sectionLabel}>Lights</div>
        <div className={styles.lightGrid}>
          {rooms.map((r) => {
            const on = lights[r.id] && !awayMode
            return (
              <div className={`${styles.lightCard} ${on ? styles.lightCardOn : ''}`} key={r.id}>
                <div className={styles.lightTop}>
                  <span className={styles.bulbIcon}>{on ? '💡' : '⚫'}</span>
                  <button
                    className={`${styles.miniSwitch} ${on ? styles.miniSwitchOn : ''}`}
                    onClick={() => toggleLight(r.id)}
                    disabled={awayMode}
                    role="switch"
                    aria-checked={on}
                  >
                    <span className={styles.miniKnob} />
                  </button>
                </div>
                <div className={styles.lightName}>{r.label}</div>
                <div className={styles.brightnessRow}>
                  <button
                    className={styles.dimBtn}
                    onClick={() => adjustBrightness(r.id, -10)}
                    disabled={!on}
                  >−</button>
                  <div className={styles.brightnessBar}>
                    <div
                      className={styles.brightnessFill}
                      style={{ width: on ? `${brightness[r.id]}%` : '0%' }}
                    />
                  </div>
                  <button
                    className={styles.dimBtn}
                    onClick={() => adjustBrightness(r.id, 10)}
                    disabled={!on}
                  >+</button>
                </div>
                <span className={styles.brightnessLabel}>
                  {on ? `${brightness[r.id]}% brightness` : 'Off'}
                </span>
              </div>
            )
          })}
        </div>

        {/* Door lock + Thermostat + Fan row */}
        <div className={styles.deviceGrid}>
          {/* Door lock — distinct locked/unlocked, not a generic toggle */}
          <div className={styles.deviceCard}>
            <div className={styles.deviceHeader}>
              <span className={styles.deviceIcon}>{locked ? '🔒' : '🔓'}</span>
              <span className={styles.deviceName}>Front Door</span>
            </div>
            <button
              className={`${styles.lockToggle} ${locked ? styles.lockToggleLocked : styles.lockToggleUnlocked}`}
              onClick={() => setLocked((l) => !l)}
            >
              {locked ? 'Locked — tap to unlock' : 'Unlocked — tap to lock'}
            </button>
          </div>

          {/* Thermostat — on/off plus a value, not purely binary */}
          <div className={styles.deviceCard}>
            <div className={styles.deviceHeader}>
              <span className={styles.deviceIcon}>🌡️</span>
              <span className={styles.deviceName}>Thermostat</span>
              <button
                className={`${styles.miniSwitch} ${thermoOn && !awayMode ? styles.miniSwitchOn : ''}`}
                onClick={() => setThermoOn((t) => !t)}
                disabled={awayMode}
                role="switch"
                aria-checked={thermoOn}
              >
                <span className={styles.miniKnob} />
              </button>
            </div>
            <div className={styles.tempRow}>
              <button
                className={styles.tempBtn}
                onClick={() => setTemp((t) => t - 1)}
                disabled={!thermoOn || awayMode}
              >−</button>
              <span className={styles.tempValue}>
                {awayMode ? '62°' : thermoOn ? `${temp}°` : '—'}
              </span>
              <button
                className={styles.tempBtn}
                onClick={() => setTemp((t) => t + 1)}
                disabled={!thermoOn || awayMode}
              >+</button>
            </div>
          </div>

          {/* Fan — on/off plus speed */}
          <div className={styles.deviceCard}>
            <div className={styles.deviceHeader}>
              <span className={`${styles.deviceIcon} ${fanOn && !awayMode ? styles.spinning : ''}`}>🌀</span>
              <span className={styles.deviceName}>Ceiling Fan</span>
              <button
                className={`${styles.miniSwitch} ${fanOn && !awayMode ? styles.miniSwitchOn : ''}`}
                onClick={() => setFanOn((f) => !f)}
                disabled={awayMode}
                role="switch"
                aria-checked={fanOn}
              >
                <span className={styles.miniKnob} />
              </button>
            </div>
            <div className={styles.speedRow}>
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  className={`${styles.speedDot} ${fanOn && !awayMode && fanSpeed === s ? styles.speedDotActive : ''}`}
                  onClick={() => setFanSpeed(s)}
                  disabled={!fanOn || awayMode}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}