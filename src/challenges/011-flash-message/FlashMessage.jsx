import { useState, useRef } from 'react'
import styles from './flashmessage.module.css'

const toastConfig = {
  success: { icon: '✓', title: 'Changes saved', color: 'success' },
  error: { icon: '✕', title: 'Something went wrong', color: 'error' },
  warning: { icon: '!', title: 'Storage almost full', color: 'warning' },
  info: { icon: 'i', title: 'New version available', color: 'info' },
}

const messages = {
  success: 'Your profile has been updated successfully.',
  error: 'We couldn\'t process your request. Please try again.',
  warning: 'You\'ve used 92% of your storage. Consider upgrading.',
  info: 'Flowmode 2.4 is ready — refresh to get the latest features.',
}

let idCounter = 0

export default function FlashMessage() {
  const [toasts, setToasts] = useState([])
  const [banners, setBanners] = useState({
    success: true,
    error: true,
  })
  const timers = useRef({})

  const pushToast = (type) => {
    const id = idCounter++
    setToasts((t) => [...t, { id, type }])
    timers.current[id] = setTimeout(() => {
      dismissToast(id)
    }, 4000)
  }

  const dismissToast = (id) => {
    clearTimeout(timers.current[id])
    setToasts((t) => t.filter((toast) => toast.id !== id))
  }

  const dismissBanner = (type) => {
    setBanners((b) => ({ ...b, [type]: false }))
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Flash messages</div>
        <h1>Success &amp; error states</h1>
        <p className={styles.sub}>
          Triggered toasts for one-off actions, and inline banners for
          persistent status. Click a button below to fire one.
        </p>

        {/* Triggers */}
        <div className={styles.triggerRow}>
          {Object.entries(toastConfig).map(([type, cfg]) => (
            <button
              key={type}
              className={`${styles.triggerBtn} ${styles['trigger-' + type]}`}
              onClick={() => pushToast(type)}
            >
              <span className={styles.triggerIcon}>{cfg.icon}</span>
              Trigger {type}
            </button>
          ))}
        </div>

        {/* Example: form with inline success/error flash */}
        <div className={styles.formDemo}>
          <div className={styles.formDemoHeader}>Example: sign-up form</div>
          <div className={styles.fakeField}>
            <span>Email address</span>
            <div className={styles.fakeInput}>jane@example.com</div>
          </div>
          {banners.error && (
            <div className={`${styles.inlineFlash} ${styles.flashError}`}>
              <span className={styles.flashIcon}>✕</span>
              <div className={styles.flashText}>
                <strong>Email already registered</strong>
                <span>Try signing in instead, or use a different address.</span>
              </div>
              <button className={styles.flashClose} onClick={() => dismissBanner('error')}>×</button>
            </div>
          )}
          {banners.success && (
            <div className={`${styles.inlineFlash} ${styles.flashSuccess}`}>
              <span className={styles.flashIcon}>✓</span>
              <div className={styles.flashText}>
                <strong>Account created</strong>
                <span>Check your inbox to verify your email address.</span>
              </div>
              <button className={styles.flashClose} onClick={() => dismissBanner('success')}>×</button>
            </div>
          )}
          {!banners.error && !banners.success && (
            <button
              className={styles.resetBtn}
              onClick={() => setBanners({ success: true, error: true })}
            >
              ↻ Reset demo banners
            </button>
          )}
        </div>

        {/* Persistent banner examples */}
        <div className={styles.bannerSection}>
          <div className={styles.eyebrowSmall}>Persistent banners</div>
          <div className={`${styles.banner} ${styles.bannerWarning}`}>
            <span className={styles.bannerIcon}>!</span>
            <span>Your trial ends in 3 days. <strong>Upgrade to Pro</strong> to keep all features.</span>
            <button className={styles.bannerAction}>Upgrade</button>
          </div>
          <div className={`${styles.banner} ${styles.bannerInfo}`}>
            <span className={styles.bannerIcon}>i</span>
            <span>Scheduled maintenance on Oct 3, 2:00–3:00 AM UTC.</span>
          </div>
        </div>
      </div>

      {/* Toast stack */}
      <div className={styles.toastStack}>
        {toasts.map((t) => {
          const cfg = toastConfig[t.type]
          return (
            <div className={`${styles.toast} ${styles['toast-' + t.type]}`} key={t.id}>
              <span className={styles.toastIcon}>{cfg.icon}</span>
              <div className={styles.toastText}>
                <strong>{cfg.title}</strong>
                <span>{messages[t.type]}</span>
              </div>
              <button className={styles.toastClose} onClick={() => dismissToast(t.id)}>×</button>
              <div className={styles.toastProgress} />
            </div>
          )
        })}
      </div>
    </div>
  )
}