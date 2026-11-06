import { useState } from 'react'
import styles from './profile.module.css'

const stats = [
  { label: 'Shots', value: '148' },
  { label: 'Followers', value: '12.4k' },
  { label: 'Following', value: '286' },
]

const skills = ['UI Design', 'Design Systems', 'Prototyping', 'Branding', 'Motion']

const shots = [
  { title: 'Flowmode — Landing page', likes: 312, color: '#7c6cff' },
  { title: 'Mortgage calculator UI', likes: 208, color: '#37e2ff' },
  { title: 'Checkout flow redesign', likes: 456, color: '#ff5fa2' },
  { title: 'App icon exploration', likes: 189, color: '#4dff88' },
  { title: 'Sign up screen', likes: 301, color: '#ffb84d' },
  { title: 'Dashboard concept', likes: 264, color: '#ff8a5c' },
]

const activity = [
  { text: 'Published a new shot', sub: '"Checkout flow redesign"', time: '2h ago' },
  { text: 'Got featured in', sub: 'Weekly Design Picks', time: '1d ago' },
  { text: 'Reached', sub: '12,000 followers', time: '4d ago' },
]

export default function Profile() {
  const [tab, setTab] = useState('work')
  const [following, setFollowing] = useState(false)

  return (
    <div className={styles.page}>
      {/* Cover + identity */}
      <div className={styles.cover}>
        <div className={styles.coverGlow} />
      </div>

      <div className={styles.wrap}>
        <div className={styles.identityRow}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>MK</div>
            <span className={styles.onlineDot} />
          </div>

          <div className={styles.identityText}>
            <div className={styles.nameRow}>
              <h1>Mina Khan</h1>
              <span className={styles.verified} title="Verified">✓</span>
            </div>
            <div className={styles.handleRow}>
              <span className={styles.handle}>@minakdesigns</span>
              <span className={styles.dotSep}>·</span>
              <span className={styles.location}>📍 Lahore, PK</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={following ? styles.followingBtn : styles.followBtn}
              onClick={() => setFollowing((f) => !f)}
            >
              {following ? '✓ Following' : '+ Follow'}
            </button>
            <button className={styles.messageBtn}>Message</button>
          </div>
        </div>

        <p className={styles.bio}>
          Product designer crafting interfaces for focus &amp; productivity tools.
          Currently designing Flowmode. Previously @NimbusTech.
        </p>

        <div className={styles.skillRow}>
          {skills.map((s) => (
            <span className={styles.skillChip} key={s}>{s}</span>
          ))}
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {stats.map((s) => (
            <div className={styles.statBlock} key={s.label}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'work' ? styles.tabActive : ''}`}
            onClick={() => setTab('work')}
          >
            Work
          </button>
          <button
            className={`${styles.tab} ${tab === 'about' ? styles.tabActive : ''}`}
            onClick={() => setTab('about')}
          >
            About
          </button>
          <button
            className={`${styles.tab} ${tab === 'activity' ? styles.tabActive : ''}`}
            onClick={() => setTab('activity')}
          >
            Activity
          </button>
        </div>

        {/* Tab content */}
        {tab === 'work' && (
          <div className={styles.shotsGrid}>
            {shots.map((s) => (
              <div className={styles.shotCard} key={s.title}>
                <div className={styles.shotThumb} style={{ background: s.color }} />
                <div className={styles.shotInfo}>
                  <span className={styles.shotTitle}>{s.title}</span>
                  <span className={styles.shotLikes}>♥ {s.likes}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'about' && (
          <div className={styles.aboutCard}>
            <div className={styles.aboutRow}>
              <span className={styles.aboutLabel}>Role</span>
              <span>Senior Product Designer</span>
            </div>
            <div className={styles.aboutRow}>
              <span className={styles.aboutLabel}>Company</span>
              <span>Flowmode</span>
            </div>
            <div className={styles.aboutRow}>
              <span className={styles.aboutLabel}>Joined</span>
              <span>March 2021</span>
            </div>
            <div className={styles.aboutRow}>
              <span className={styles.aboutLabel}>Website</span>
              <span className={styles.link}>minakhan.design</span>
            </div>
            <div className={styles.aboutRow}>
              <span className={styles.aboutLabel}>Email</span>
              <span className={styles.link}>hello@minakhan.design</span>
            </div>
          </div>
        )}

        {tab === 'activity' && (
          <div className={styles.activityList}>
            {activity.map((a, i) => (
              <div className={styles.activityRow} key={i}>
                <span className={styles.activityDot} />
                <div className={styles.activityText}>
                  <span>{a.text} <strong>{a.sub}</strong></span>
                  <span className={styles.activityTime}>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}