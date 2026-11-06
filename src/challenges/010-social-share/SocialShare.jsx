import { useState, useRef, useEffect } from 'react'
import styles from './socialshare.module.css'

const platforms = [
  { id: 'twitter', label: 'X / Twitter', icon: '𝕏', color: '#000000' },
  { id: 'facebook', label: 'Facebook', icon: 'f', color: '#1877f2' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'in', color: '#0a66c2' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '☎', color: '#25d366' },
  { id: 'email', label: 'Email', icon: '✉', color: '#7c6cff' },
]

const articleUrl = 'flowmode.app/blog/protect-your-deep-work'

export default function SocialShare() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)
  const sheetRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target)) {
        setSheetOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const handleShare = (platform) => {
    setToast(`Shared to ${platform}`)
    setSheetOpen(false)
    setTimeout(() => setToast(null), 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Social share</div>

        {/* ---- Article card with inline icon row ---- */}
        <div className={styles.articleCard}>
          <div className={styles.articleImage}>
            <span className={styles.articleTag}>Focus & Productivity</span>
          </div>
          <div className={styles.articleBody}>
            <h2>How to protect your deep work hours</h2>
            <p>
              Most people lose their best focus window to Slack pings and
              open tabs. Here's how to build a schedule that defends it.
            </p>
            <div className={styles.articleMeta}>
              <span>5 min read</span>
              <span className={styles.dot}>·</span>
              <span>Mina Khan</span>
            </div>

            {/* Inline share row — the "placed directly on the page" pattern */}
            <div className={styles.inlineRow}>
              <span className={styles.inlineLabel}>Share this article</span>
              <div className={styles.inlineIcons}>
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    className={styles.iconBtn}
                    style={{ '--brand': p.color }}
                    title={`Share on ${p.label}`}
                    onClick={() => handleShare(p.label)}
                  >
                    {p.icon}
                  </button>
                ))}
                <button className={styles.iconBtn} title="Copy link" onClick={handleCopy}>
                  {copied ? '✓' : '🔗'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Single share button + popover sheet pattern ---- */}
        <div className={styles.secondBlock}>
          <div className={styles.eyebrowSmall}>Compact trigger pattern</div>
          <p className={styles.helper}>
            For tighter spaces (a card footer, a toolbar), one button opens a
            share sheet instead of showing every icon inline.
          </p>

          <div className={styles.sheetAnchor} ref={sheetRef}>
            <button
              className={styles.shareTriggerBtn}
              onClick={() => setSheetOpen((o) => !o)}
            >
              <span className={styles.shareGlyph}>⤴</span> Share
            </button>

            {sheetOpen && (
              <div className={styles.sheet}>
                <div className={styles.sheetHeader}>
                  <span className={styles.sheetThumb} />
                  <div className={styles.sheetHeaderText}>
                    <span className={styles.sheetTitle}>Protect your deep work hours</span>
                    <span className={styles.sheetUrl}>{articleUrl}</span>
                  </div>
                </div>

                <div className={styles.sheetGrid}>
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      className={styles.sheetItem}
                      onClick={() => handleShare(p.label)}
                    >
                      <span className={styles.sheetIcon} style={{ background: p.color }}>
                        {p.icon}
                      </span>
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className={styles.sheetLinkRow}>
                  <span className={styles.sheetLinkText}>{articleUrl}</span>
                  <button className={styles.copyBtn} onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div className={styles.toast}>{toast} ✓</div>}
    </div>
  )
}