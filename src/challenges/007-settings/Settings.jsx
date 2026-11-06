import { useState } from 'react'
import styles from './settings.module.css'

const sections = [
  { id: 'account', label: 'Account', icon: '👤' },
  { id: 'appearance', label: 'Appearance', icon: '🎨' },
  { id: 'focus', label: 'Focus sessions', icon: '⏱️' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'privacy', label: 'Privacy & security', icon: '🔒' },
]

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className={styles.toggleKnob} />
    </button>
  )
}

export default function Settings() {
  const [active, setActive] = useState('account')

  const [theme, setTheme] = useState('dark')
  const [accent, setAccent] = useState('purple')

  const [sessionLength, setSessionLength] = useState(25)
  const [autoBreak, setAutoBreak] = useState(true)
  const [blockApps, setBlockApps] = useState(true)
  const [ambientSound, setAmbientSound] = useState('rain')

  const [notifSession, setNotifSession] = useState(true)
  const [notifWeekly, setNotifWeekly] = useState(true)
  const [notifTeam, setNotifTeam] = useState(false)
  const [notifMarketing, setNotifMarketing] = useState(false)

  const [twoFactor, setTwoFactor] = useState(true)
  const [profileVisible, setProfileVisible] = useState(true)
  const [shareStats, setShareStats] = useState(false)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h1>Settings</h1>
          <p>Manage your account, focus preferences, and privacy.</p>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <nav className={styles.sidebar}>
            {sections.map((s) => (
              <button
                key={s.id}
                className={`${styles.navItem} ${active === s.id ? styles.navItemActive : ''}`}
                onClick={() => setActive(s.id)}
              >
                <span className={styles.navIcon}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className={styles.content}>
            {active === 'account' && (
              <div className={styles.panel}>
                <h2>Account</h2>

                <div className={styles.profileRow}>
                  <div className={styles.avatar}>MK</div>
                  <div>
                    <div className={styles.profileName}>Mina Khan</div>
                    <div className={styles.profileEmail}>hello@minakhan.design</div>
                  </div>
                  <button className={styles.secondaryBtn}>Change photo</button>
                </div>

                <div className={styles.field}>
                  <label>Display name</label>
                  <input type="text" defaultValue="Mina Khan" />
                </div>
                <div className={styles.field}>
                  <label>Email address</label>
                  <input type="email" defaultValue="hello@minakhan.design" />
                </div>
                <div className={styles.field}>
                  <label>Timezone</label>
                  <select defaultValue="pkt">
                    <option value="pkt">Pakistan Standard Time (UTC+5)</option>
                    <option value="pst">Pacific Time (UTC-8)</option>
                    <option value="gmt">GMT</option>
                  </select>
                </div>

                <div className={styles.dangerZone}>
                  <div>
                    <div className={styles.dangerTitle}>Delete account</div>
                    <div className={styles.dangerSub}>Permanently remove your account and all data.</div>
                  </div>
                  <button className={styles.dangerBtn}>Delete</button>
                </div>
              </div>
            )}

            {active === 'appearance' && (
              <div className={styles.panel}>
                <h2>Appearance</h2>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Theme</div>
                    <div className={styles.settingSub}>Choose how Flowmode looks on your device.</div>
                  </div>
                </div>
                <div className={styles.themeGrid}>
                  {[
                    { id: 'light', label: 'Light' },
                    { id: 'dark', label: 'Dark' },
                    { id: 'system', label: 'System' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      className={`${styles.themeCard} ${theme === t.id ? styles.themeCardActive : ''}`}
                      onClick={() => setTheme(t.id)}
                    >
                      <div className={`${styles.themePreview} ${styles['preview-' + t.id]}`} />
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className={styles.settingRow} style={{ marginTop: 28 }}>
                  <div>
                    <div className={styles.settingLabel}>Accent color</div>
                    <div className={styles.settingSub}>Used for buttons, links and highlights.</div>
                  </div>
                </div>
                <div className={styles.swatchRow}>
                  {[
                    { id: 'purple', color: '#7c6cff' },
                    { id: 'cyan', color: '#37e2ff' },
                    { id: 'pink', color: '#ff5fa2' },
                    { id: 'green', color: '#4dff88' },
                    { id: 'orange', color: '#ff8a5c' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      className={`${styles.swatch} ${accent === c.id ? styles.swatchActive : ''}`}
                      style={{ background: c.color }}
                      onClick={() => setAccent(c.id)}
                      aria-label={c.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {active === 'focus' && (
              <div className={styles.panel}>
                <h2>Focus sessions</h2>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Default session length</div>
                    <div className={styles.settingSub}>{sessionLength} minutes</div>
                  </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={sessionLength}
                  onChange={(e) => setSessionLength(+e.target.value)}
                  className={styles.slider}
                />

                <div className={styles.divider} />

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Auto-start breaks</div>
                    <div className={styles.settingSub}>Automatically start a break timer after each session.</div>
                  </div>
                  <Toggle checked={autoBreak} onChange={setAutoBreak} />
                </div>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Block distracting apps</div>
                    <div className={styles.settingSub}>Restrict social media & entertainment apps during sessions.</div>
                  </div>
                  <Toggle checked={blockApps} onChange={setBlockApps} />
                </div>

                <div className={styles.divider} />

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Ambient sound</div>
                    <div className={styles.settingSub}>Plays quietly in the background during sessions.</div>
                  </div>
                </div>
                <div className={styles.pillRow}>
                  {['none', 'rain', 'cafe', 'white noise', 'lofi'].map((s) => (
                    <button
                      key={s}
                      className={`${styles.pill} ${ambientSound === s ? styles.pillActive : ''}`}
                      onClick={() => setAmbientSound(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {active === 'notifications' && (
              <div className={styles.panel}>
                <h2>Notifications</h2>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Session reminders</div>
                    <div className={styles.settingSub}>Nudge me when a scheduled session is about to start.</div>
                  </div>
                  <Toggle checked={notifSession} onChange={setNotifSession} />
                </div>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Weekly summary</div>
                    <div className={styles.settingSub}>A digest of your focus trends every Monday.</div>
                  </div>
                  <Toggle checked={notifWeekly} onChange={setNotifWeekly} />
                </div>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Team activity</div>
                    <div className={styles.settingSub}>When teammates start or complete shared sessions.</div>
                  </div>
                  <Toggle checked={notifTeam} onChange={setNotifTeam} />
                </div>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Product news & offers</div>
                    <div className={styles.settingSub}>Occasional emails about new features.</div>
                  </div>
                  <Toggle checked={notifMarketing} onChange={setNotifMarketing} />
                </div>
              </div>
            )}

            {active === 'privacy' && (
              <div className={styles.panel}>
                <h2>Privacy & security</h2>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Two-factor authentication</div>
                    <div className={styles.settingSub}>Require a code from your phone when signing in.</div>
                  </div>
                  <Toggle checked={twoFactor} onChange={setTwoFactor} />
                </div>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Public profile</div>
                    <div className={styles.settingSub}>Let others find and view your profile.</div>
                  </div>
                  <Toggle checked={profileVisible} onChange={setProfileVisible} />
                </div>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Share anonymous usage stats</div>
                    <div className={styles.settingSub}>Helps us improve Flowmode. Never shared with third parties.</div>
                  </div>
                  <Toggle checked={shareStats} onChange={setShareStats} />
                </div>

                <div className={styles.divider} />

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Active sessions</div>
                    <div className={styles.settingSub}>2 devices currently signed in.</div>
                  </div>
                  <button className={styles.secondaryBtn}>Manage</button>
                </div>

                <div className={styles.settingRow}>
                  <div>
                    <div className={styles.settingLabel}>Change password</div>
                    <div className={styles.settingSub}>Last changed 3 months ago.</div>
                  </div>
                  <button className={styles.secondaryBtn}>Update</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}