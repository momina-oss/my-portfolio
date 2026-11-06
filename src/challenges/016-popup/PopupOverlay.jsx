import { useState, useEffect } from 'react'
import styles from './popupoverlay.module.css'

export default function PopupOverlay() {
  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [closing, setClosing] = useState(null)

  // Simulate exit-intent: trigger once after a short delay for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => setNewsletterOpen(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const closeModal = (which) => {
    setClosing(which)
    setTimeout(() => {
      if (which === 'newsletter') setNewsletterOpen(false)
      if (which === 'paywall') setPaywallOpen(false)
      setClosing(null)
    }, 200)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubscribed(true)
    setTimeout(() => closeModal('newsletter'), 1400)
  }

  return (
    <div className={styles.page}>
      {/* ---- Background "article" content ---- */}
      <div className={styles.articleWrap}>
        <div className={styles.demoControls}>
          <button className={styles.demoBtn} onClick={() => setNewsletterOpen(true)}>
            Trigger newsletter popup
          </button>
          <button className={styles.demoBtn} onClick={() => setPaywallOpen(true)}>
            Trigger paywall gate
          </button>
        </div>

        <span className={styles.articleTag}>Focus & Productivity</span>
        <h1>The science of protecting your deep work hours</h1>
        <p className={styles.articleMeta}>By Mina Khan · 8 min read</p>

        <div className={styles.articleBody}>
          <p>
            Every knowledge worker has a window each day when their focus is
            sharpest. For most people it's a 90-minute stretch somewhere in
            the first half of the day — and for most people, it gets
            destroyed by the first Slack notification.
          </p>
          <p>
            Researchers studying attention residue have found that switching
            tasks doesn't just cost you the interruption itself. It leaves a
            trailing fog that can take over twenty minutes to fully clear...
          </p>

          <div className={`${styles.gatedContent} ${paywallOpen ? styles.gatedBlurred : ''}`}>
            <p>
              The rest of this article covers three techniques from our
              research: time-blocking with hard boundaries, the two-minute
              re-entry ritual, and why "focus mode" settings on most phones
              don't actually work the way people assume.
            </p>
            <p>
              We also break down a four-week plan you can follow to
              rebuild your attention span, based on a study of 340 remote
              workers across sixteen companies...
            </p>
            <p>
              Continuing further, the data shows a surprising pattern
              around mid-afternoon focus dips that most productivity
              advice gets completely wrong...
            </p>
          </div>
        </div>
      </div>

      {/* ---- Newsletter popup (dismissible, low-stakes) ---- */}
      {newsletterOpen && (
        <div className={styles.overlayBg} onClick={() => closeModal('newsletter')}>
          <div
            className={`${styles.newsletterModal} ${closing === 'newsletter' ? styles.modalClosing : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={() => closeModal('newsletter')}>×</button>

            {!subscribed ? (
              <>
                <div className={styles.modalIcon}>✉️</div>
                <h2>Don't lose your focus</h2>
                <p className={styles.modalSub}>
                  Get one email a week with practical focus techniques.
                  No fluff, unsubscribe anytime.
                </p>
                <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="you@work.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">Subscribe free</button>
                </form>
                <button className={styles.skipLink} onClick={() => closeModal('newsletter')}>
                  No thanks, I'll figure it out myself
                </button>
              </>
            ) : (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h2>You're subscribed!</h2>
                <p className={styles.modalSub}>First email lands next Monday.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---- Paywall gate (blocking, member-only) ---- */}
      {paywallOpen && (
        <div className={styles.overlayBgDark}>
          <div className={`${styles.paywallModal} ${closing === 'paywall' ? styles.modalClosing : ''}`}>
            <button className={styles.closeBtnLight} onClick={() => closeModal('paywall')}>×</button>

            <div className={styles.paywallIcon}>🔒</div>
            <div className={styles.paywallBadge}>Members only</div>
            <h2>You've hit your free article limit</h2>
            <p className={styles.modalSub}>
              Subscribe to Flowmode Insights for unlimited access to research,
              guides, and the weekly deep-work newsletter.
            </p>

            <div className={styles.planRow}>
              <div className={styles.planOption}>
                <span className={styles.planLabel}>Monthly</span>
                <span className={styles.planPrice}>$6<span>/mo</span></span>
              </div>
              <div className={`${styles.planOption} ${styles.planOptionBest}`}>
                <span className={styles.planBadge}>Save 30%</span>
                <span className={styles.planLabel}>Annual</span>
                <span className={styles.planPrice}>$4.20<span>/mo</span></span>
              </div>
            </div>

            <button className={styles.subscribeBtn}>Continue to subscribe →</button>
            <button className={styles.signinLink}>Already a member? Sign in</button>
          </div>
        </div>
      )}
    </div>
  )
}