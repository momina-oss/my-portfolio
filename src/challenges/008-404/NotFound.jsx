import { useState } from 'react'
import styles from './notfound.module.css'

const quickLinks = [
  { icon: '🏠', label: 'Homepage', sub: 'Back to where it all begins' },
  { icon: '⏱️', label: 'Start a session', sub: 'Get back into flow right now' },
  { icon: '📊', label: 'Your dashboard', sub: 'See your focus stats' },
  { icon: '💬', label: 'Contact support', sub: "Can't find it? We'll help" },
]

export default function NotFound() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setSearched(true)
  }

  return (
    <div className={styles.page}>
      <div className={styles.glow} />

      <div className={styles.wrap}>
        {/* Animated focus-timer that's "lost" its target */}
        <div className={styles.scene}>
          <svg viewBox="0 0 220 220" className={styles.ring}>
            <circle cx="110" cy="110" r="92" className={styles.ringTrack} />
            <circle cx="110" cy="110" r="92" className={styles.ringProgress} />
          </svg>
          <div className={styles.sceneCenter}>
            <span className={styles.code}>404</span>
            <span className={styles.eyes}>
              <span className={styles.eye} />
              <span className={styles.eye} />
            </span>
          </div>
          <div className={styles.floatIcon} style={{ '--d': '0s', '--x': '-70px', '--y': '-40px' }}>☁️</div>
          <div className={styles.floatIcon} style={{ '--d': '1.2s', '--x': '80px', '--y': '-20px' }}>🎧</div>
          <div className={styles.floatIcon} style={{ '--d': '2.1s', '--x': '-60px', '--y': '60px' }}>📎</div>
          <div className={styles.floatIcon} style={{ '--d': '0.6s', '--x': '75px', '--y': '55px' }}>✉️</div>
        </div>

        <div className={styles.badge}>Session interrupted</div>
        <h1>This page broke your focus.</h1>
        <p className={styles.sub}>
          The page you're looking for doesn't exist, got moved, or maybe it
          just needed a break too. Let's get you back on track.
        </p>

        {/* Search */}
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search Flowmode help & pages..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearched(false) }}
          />
          <button type="submit">Search</button>
        </form>
        {searched && (
          <div className={styles.searchResult}>
            {query.trim()
              ? <>No results for <strong>&ldquo;{query}&rdquo;</strong> — try one of the links below instead.</>
              : 'Type something to search, or pick a link below.'}
          </div>
        )}

        {/* Quick links */}
        <div className={styles.linkGrid}>
          {quickLinks.map((l) => (
            <button className={styles.linkCard} key={l.label}>
              <span className={styles.linkIcon}>{l.icon}</span>
              <span className={styles.linkText}>
                <span className={styles.linkLabel}>{l.label}</span>
                <span className={styles.linkSub}>{l.sub}</span>
              </span>
              <span className={styles.linkArrow}>→</span>
            </button>
          ))}
        </div>

        <button className={styles.homeBtn}>← Take me back home</button>

        <p className={styles.errorCode}>Error code: FM-404-PAGE-NOT-FOUND</p>
      </div>
    </div>
  )
}