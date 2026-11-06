import { useState, useEffect, useRef } from 'react'
import styles from './musicplayer.module.css'

const queue = [
  { title: 'Midnight Drift', artist: 'Nova Ray', duration: 214, color: '#7c6cff' },
  { title: 'Static Bloom', artist: 'Halcyon Pier', duration: 187, color: '#37e2ff' },
  { title: 'Slow Orbit', artist: 'Nova Ray', duration: 241, color: '#ff5fa2' },
  { title: 'Glass Horizon', artist: 'Wren & Vale', duration: 198, color: '#4dff88' },
  { title: 'Paper Moon', artist: 'Kite Season', duration: 176, color: '#ff8a5c' },
]

const fmtTime = (s) => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [liked, setLiked] = useState({})
  const intervalRef = useRef(null)

  const track = queue[trackIndex]

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= track.duration) {
            handleNext()
            return 0
          }
          return p + 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, trackIndex])

  const handleNext = () => {
    setProgress(0)
    if (shuffle) {
      let next
      do { next = Math.floor(Math.random() * queue.length) } while (next === trackIndex && queue.length > 1)
      setTrackIndex(next)
    } else {
      setTrackIndex((i) => (i + 1) % queue.length)
    }
  }

  const handlePrev = () => {
    if (progress > 3) {
      setProgress(0)
    } else {
      setProgress(0)
      setTrackIndex((i) => (i - 1 + queue.length) % queue.length)
    }
  }

  const handleSeek = (e) => {
    const pct = e.target.value
    setProgress(Math.round((pct / 100) * track.duration))
  }

  const toggleLike = () => {
    setLiked((l) => ({ ...l, [trackIndex]: !l[trackIndex] }))
  }

  const progressPct = (progress / track.duration) * 100

  return (
    <div className={styles.page}>
      <div className={styles.playerCard}>
        {/* Album art + glow */}
        <div className={styles.artWrap}>
          <div
            className={`${styles.art} ${playing ? styles.artSpin : ''}`}
            style={{ background: `linear-gradient(135deg, ${track.color}, #12121c)` }}
          >
            <div className={styles.vinylHole} />
            <div className={styles.vinylRing} />
          </div>
          <div className={styles.artGlow} style={{ background: track.color }} />
        </div>

        {/* Track info */}
        <div className={styles.trackInfo}>
          <div className={styles.trackTitleRow}>
            <h2>{track.title}</h2>
            <button
              className={`${styles.likeBtn} ${liked[trackIndex] ? styles.likeBtnActive : ''}`}
              onClick={toggleLike}
              aria-label="Like"
            >
              {liked[trackIndex] ? '♥' : '♡'}
            </button>
          </div>
          <p className={styles.artist}>{track.artist}</p>
        </div>

        {/* Seek bar */}
        <div className={styles.seekRow}>
          <span className={styles.time}>{fmtTime(progress)}</span>
          <div className={styles.seekTrack}>
            <div className={styles.seekFill} style={{ width: `${progressPct}%` }} />
            <input
              type="range"
              min="0"
              max="100"
              value={progressPct || 0}
              onChange={handleSeek}
              className={styles.seekInput}
            />
          </div>
          <span className={styles.time}>{fmtTime(track.duration)}</span>
        </div>

        {/* Main controls */}
        <div className={styles.controls}>
          <button
            className={`${styles.iconBtn} ${shuffle ? styles.iconBtnActive : ''}`}
            onClick={() => setShuffle((s) => !s)}
            title="Shuffle"
          >
            🔀
          </button>
          <button className={styles.skipBtn} onClick={handlePrev} title="Previous">⏮</button>
          <button className={styles.playBtn} onClick={() => setPlaying((p) => !p)}>
            {playing ? '⏸' : '▶'}
          </button>
          <button className={styles.skipBtn} onClick={handleNext} title="Next">⏭</button>
          <button
            className={`${styles.iconBtn} ${repeat ? styles.iconBtnActive : ''}`}
            onClick={() => setRepeat((r) => !r)}
            title="Repeat"
          >
            🔁
          </button>
        </div>

        {/* Volume */}
        <div className={styles.volumeRow}>
          <span className={styles.volIcon}>{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}</span>
          <div className={styles.volTrack}>
            <div className={styles.volFill} style={{ width: `${volume}%` }} />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(+e.target.value)}
              className={styles.volInput}
            />
          </div>
        </div>
      </div>

      {/* Queue */}
      <div className={styles.queueCard}>
        <div className={styles.queueHeader}>Up next</div>
        {queue.map((t, i) => (
          <button
            key={t.title}
            className={`${styles.queueItem} ${i === trackIndex ? styles.queueItemActive : ''}`}
            onClick={() => { setTrackIndex(i); setProgress(0) }}
          >
            <div className={styles.queueArt} style={{ background: t.color }}>
              {i === trackIndex && playing && (
                <span className={styles.eqBars}>
                  <span /><span /><span />
                </span>
              )}
            </div>
            <div className={styles.queueInfo}>
              <span className={styles.queueTitle}>{t.title}</span>
              <span className={styles.queueArtist}>{t.artist}</span>
            </div>
            <span className={styles.queueDuration}>{fmtTime(t.duration)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}