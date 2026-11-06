import { useState } from 'react'
import styles from './leaderboard.module.css'

const data = {
  week: [
    { name: 'Amir R.', minutes: 1840, trend: 'up', avatarColor: '#ff8a5c', streak: 6 },
    { name: 'Mina Khan', minutes: 1720, trend: 'up', avatarColor: '#7c6cff', streak: 5, isMe: true },
    { name: 'Nadia K.', minutes: 1655, trend: 'down', avatarColor: '#4dff88', streak: 3 },
    { name: 'Zaid M.', minutes: 1420, trend: 'same', avatarColor: '#37e2ff', streak: 4 },
    { name: 'Sara T.', minutes: 1310, trend: 'up', avatarColor: '#ff5fa2', streak: 2 },
    { name: 'Bilal H.', minutes: 1180, trend: 'down', avatarColor: '#ffb84d', streak: 1 },
    { name: 'Emaan F.', minutes: 990, trend: 'up', avatarColor: '#9b8cff', streak: 3 },
    { name: 'Farhan A.', minutes: 860, trend: 'same', avatarColor: '#5fd4c8', streak: 0 },
  ],
  month: [
    { name: 'Nadia K.', minutes: 6820, trend: 'up', avatarColor: '#4dff88', streak: 12 },
    { name: 'Amir R.', minutes: 6510, trend: 'up', avatarColor: '#ff8a5c', streak: 9 },
    { name: 'Mina Khan', minutes: 5980, trend: 'down', avatarColor: '#7c6cff', streak: 6, isMe: true },
    { name: 'Zaid M.', minutes: 5340, trend: 'up', avatarColor: '#37e2ff', streak: 8 },
    { name: 'Sara T.', minutes: 4720, trend: 'same', avatarColor: '#ff5fa2', streak: 4 },
    { name: 'Bilal H.', minutes: 4200, trend: 'up', avatarColor: '#ffb84d', streak: 5 },
    { name: 'Emaan F.', minutes: 3600, trend: 'down', avatarColor: '#9b8cff', streak: 2 },
    { name: 'Farhan A.', minutes: 3100, trend: 'same', avatarColor: '#5fd4c8', streak: 1 },
  ],
}

const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2)
const fmtHours = (min) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}h ${m}m`
}

export default function Leaderboard() {
  const [period, setPeriod] = useState('week')

  const ranked = [...data[period]].sort((a, b) => b.minutes - a.minutes)
  const top3 = ranked.slice(0, 3)
  const rest = ranked.slice(3)
  const maxMinutes = ranked[0].minutes
  const myRank = ranked.findIndex((p) => p.isMe) + 1

  const podiumOrder = [top3[1], top3[0], top3[2]] // 2nd, 1st, 3rd for visual podium layout

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>Team leaderboard</div>
            <h1>Focus champions</h1>
          </div>
          <div className={styles.periodToggle}>
            <button
              className={`${styles.periodBtn} ${period === 'week' ? styles.periodBtnActive : ''}`}
              onClick={() => setPeriod('week')}
            >
              This week
            </button>
            <button
              className={`${styles.periodBtn} ${period === 'month' ? styles.periodBtnActive : ''}`}
              onClick={() => setPeriod('month')}
            >
              This month
            </button>
          </div>
        </div>

        {/* Podium — top 3 */}
        <div className={styles.podium}>
          {podiumOrder.map((p) => {
            const rank = ranked.indexOf(p) + 1
            return (
              <div
                key={p.name}
                className={`${styles.podiumCol} ${rank === 1 ? styles.podiumFirst : ''}`}
              >
                <div className={styles.podiumAvatarWrap}>
                  {rank === 1 && <span className={styles.crown}>👑</span>}
                  <div
                    className={`${styles.podiumAvatar} ${p.isMe ? styles.podiumAvatarMe : ''}`}
                    style={{ background: p.avatarColor }}
                  >
                    {initials(p.name)}
                  </div>
                  <span className={`${styles.rankBadge} ${styles['rankBadge' + rank]}`}>{rank}</span>
                </div>
                <span className={styles.podiumName}>{p.name.split(' ')[0]}</span>
                <span className={styles.podiumTime}>{fmtHours(p.minutes)}</span>
                <div
                  className={`${styles.podiumBar} ${styles['podiumBar' + rank]}`}
                  style={{ height: `${(p.minutes / maxMinutes) * 100}px` }}
                />
              </div>
            )
          })}
        </div>

        {/* Rest of the list */}
        <div className={styles.list}>
          {rest.map((p) => {
            const rank = ranked.indexOf(p) + 1
            return (
              <div
                key={p.name}
                className={`${styles.row} ${p.isMe ? styles.rowMe : ''}`}
              >
                <span className={styles.rowRank}>{rank}</span>
                <div className={styles.rowAvatar} style={{ background: p.avatarColor }}>
                  {initials(p.name)}
                </div>
                <div className={styles.rowInfo}>
                  <span className={styles.rowName}>
                    {p.name}{p.isMe && <span className={styles.youTag}>You</span>}
                  </span>
                  {p.streak > 0 && <span className={styles.rowStreak}>🔥 {p.streak} day streak</span>}
                </div>
                <div className={styles.rowBarTrack}>
                  <div
                    className={styles.rowBarFill}
                    style={{ width: `${(p.minutes / maxMinutes) * 100}%`, background: p.avatarColor }}
                  />
                </div>
                <span className={styles.rowTime}>{fmtHours(p.minutes)}</span>
                <span className={`${styles.trendIcon} ${styles['trend' + p.trend]}`}>
                  {p.trend === 'up' && '↑'}
                  {p.trend === 'down' && '↓'}
                  {p.trend === 'same' && '–'}
                </span>
              </div>
            )
          })}
        </div>

        {/* Your rank sticky footer */}
        <div className={styles.myRankBar}>
          <span className={styles.myRankLabel}>Your rank</span>
          <span className={styles.myRankValue}>#{myRank} of {ranked.length}</span>
        </div>
      </div>
    </div>
  )
}