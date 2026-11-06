import styles from './appicon.module.css'

// The icon itself — reused at every size so it's provably one real design,
// not different mockups faked per-size.
function Icon({ size = 128, radius = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`bg-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8f7dff" />
          <stop offset="100%" stopColor="#4d3fd6" />
        </linearGradient>
        <linearGradient id={`mark-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dcecff" />
        </linearGradient>
        <radialGradient id={`glow-${size}`} cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="128" height="128" rx={radius} fill={`url(#bg-${size})`} />
      <rect width="128" height="128" rx={radius} fill={`url(#glow-${size})`} />

      {/* Abstract flowing "F" built from a diamond + swoosh — reads as a mark at any size */}
      <path
        d="M64 26 L86 48 L64 70 L42 48 Z"
        fill={`url(#mark-${size})`}
      />
      <path
        d="M40 62 C40 90 62 104 90 100 C74 104 54 96 54 74 L54 62 Z"
        fill="#37e2ff"
      />
    </svg>
  )
}

export default function AppIcon() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>App icon</div>
        <h1>Flowmode</h1>
        <p className={styles.sub}>
          One mark, three contexts — hero size, app-store size, and living
          on an actual home screen next to the competition.
        </p>
      </div>

      {/* Hero icon with rounded-square + circle (iOS/Android) previews */}
      <div className={styles.heroRow}>
        <div className={styles.heroCard}>
          <Icon size={128} radius={28} />
          <span className={styles.tag}>Square · 128px</span>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.circleMask}>
            <Icon size={128} radius={0} />
          </div>
          <span className={styles.tag}>Circle · Android</span>
        </div>
      </div>

      {/* Scale test — same icon shrunk down, to prove it holds up small */}
      <div className={styles.scaleSection}>
        <div className={styles.eyebrowSmall}>Scale test</div>
        <div className={styles.scaleRow}>
          {[96, 64, 48, 32, 20].map((s) => (
            <div className={styles.scaleItem} key={s}>
              <Icon size={s} radius={Math.round(s * 0.22)} />
              <span>{s}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Home screen mock — the real test: does it stand out */}
      <div className={styles.homeSection}>
        <div className={styles.eyebrowSmall}>On a home screen</div>
        <div className={styles.phone}>
          <div className={styles.notch} />
          <div className={styles.wallpaper}>
            <div className={styles.statusRow}>
              <span>9:41</span>
              <span>••• 📶 🔋</span>
            </div>

            <div className={styles.iconGrid}>
              {['🎵', '📷', '💬', '📅', '🗺️', '🎮', '📈', '☁️'].slice(0, 4).map((e, i) => (
                <div className={styles.fakeIcon} key={i}>{e}</div>
              ))}

              {/* Flowmode, sitting among the pack */}
              <div className={styles.realIconWrap}>
                <Icon size={58} radius={13} />
              </div>

              {['🎮', '📈', '☁️'].map((e, i) => (
                <div className={styles.fakeIcon} key={i}>{e}</div>
              ))}
            </div>
            <div className={styles.iconLabel}>Flowmode</div>

            <div className={styles.dock}>
              <div className={styles.fakeIconDock}>📞</div>
              <div className={styles.fakeIconDock}>✉️</div>
              <div className={styles.fakeIconDock}>🌐</div>
              <div className={styles.fakeIconDock}>🎧</div>
            </div>
          </div>
        </div>
      </div>

      {/* Design rationale */}
      <div className={styles.rationale}>
        <div className={styles.rationaleItem}>
          <span className={styles.rNum}>01</span>
          <div>
            <h3>Reads at a glance</h3>
            <p>A single bold silhouette (diamond + swoosh) instead of fine detail that disappears below 40px.</p>
          </div>
        </div>
        <div className={styles.rationaleItem}>
          <span className={styles.rNum}>02</span>
          <div>
            <h3>High-contrast palette</h3>
            <p>Saturated purple-to-violet background against a near-white mark and cyan accent — pops against both light and dark wallpapers.</p>
          </div>
        </div>
        <div className={styles.rationaleItem}>
          <span className={styles.rNum}>03</span>
          <div>
            <h3>Brand-consistent</h3>
            <p>Same gradient and diamond mark used across the landing page and product UI, so the icon isn't a one-off.</p>
          </div>
        </div>
      </div>
    </div>
  )
}