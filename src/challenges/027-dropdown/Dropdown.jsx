import { useState, useRef, useEffect } from 'react'
import styles from './dropdown.module.css'

export default function Dropdown() {
  const [navOpen, setNavOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)
  const [loggedIn, setLoggedIn] = useState(true)

  const navRef = useRef(null)
  const accountRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setNavOpen(false)
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Dropdown patterns</div>
        <h1>Three ways a dropdown earns its place</h1>

        {/* ---- 1. Navigation menu dropdown ---- */}
        <section className={styles.section}>
          <div className={styles.sectionLabel}>1. Navigation menu</div>
          <p className={styles.sectionSub}>Groups related links under one nav item — shown on click.</p>

          <div className={styles.mockNav}>
            <span className={styles.mockLogo}>◆ Flowmode</span>
            <div className={styles.mockLinks}>
              <span>Home</span>
              <div className={styles.navDropdownWrap} ref={navRef}>
                <button className={styles.navTrigger} onClick={() => setNavOpen((o) => !o)}>
                  Product <span className={`${styles.chevron} ${navOpen ? styles.chevronOpen : ''}`}>▾</span>
                </button>
                {navOpen && (
                  <div className={styles.navMenu}>
                    <button className={styles.navMenuItem}>
                      <span className={styles.navIcon}>⏱️</span>
                      <div>
                        <span className={styles.navItemTitle}>Focus Sessions</span>
                        <span className={styles.navItemSub}>Timed deep-work blocks</span>
                      </div>
                    </button>
                    <button className={styles.navMenuItem}>
                      <span className={styles.navIcon}>📊</span>
                      <div>
                        <span className={styles.navItemTitle}>Analytics</span>
                        <span className={styles.navItemSub}>Track your focus trends</span>
                      </div>
                    </button>
                    <button className={styles.navMenuItem}>
                      <span className={styles.navIcon}>👥</span>
                      <div>
                        <span className={styles.navItemTitle}>Teams</span>
                        <span className={styles.navItemSub}>Shared focus for groups</span>
                      </div>
                    </button>
                    <div className={styles.navMenuDivider} />
                    <button className={styles.navMenuItemLink}>See all features →</button>
                  </div>
                )}
              </div>
              <span>Pricing</span>
              <span>Blog</span>
            </div>
          </div>
        </section>

        {/* ---- 2. Account dropdown (login/logout) ---- */}
        <section className={styles.section}>
          <div className={styles.sectionLabel}>2. Account menu</div>
          <p className={styles.sectionSub}>Shows session state — different content when logged in vs. out.</p>

          <div className={styles.mockNav}>
            <span className={styles.mockLogo}>◆ Flowmode</span>
            <div className={styles.accountWrap} ref={accountRef}>
              <button className={styles.accountTrigger} onClick={() => setAccountOpen((o) => !o)}>
                {loggedIn ? (
                  <span className={styles.avatarSmall}>MK</span>
                ) : (
                  <span className={styles.avatarSmall}>?</span>
                )}
                <span className={`${styles.chevron} ${accountOpen ? styles.chevronOpen : ''}`}>▾</span>
              </button>

              {accountOpen && (
                <div className={styles.accountMenu}>
                  {loggedIn ? (
                    <>
                      <div className={styles.accountHeader}>
                        <span className={styles.avatarMed}>MK</span>
                        <div>
                          <span className={styles.accountName}>Mina Khan</span>
                          <span className={styles.accountEmail}>hello@minakhan.design</span>
                        </div>
                      </div>
                      <div className={styles.navMenuDivider} />
                      <button className={styles.accountItem}>👤 View profile</button>
                      <button className={styles.accountItem}>⚙️ Settings</button>
                      <button className={styles.accountItem}>💬 Help & support</button>
                      <div className={styles.navMenuDivider} />
                      <button
                        className={styles.accountItemDanger}
                        onClick={() => { setLoggedIn(false); setAccountOpen(false) }}
                      >
                        ↪ Log out
                      </button>
                    </>
                  ) : (
                    <div className={styles.loggedOutBox}>
                      <span className={styles.loggedOutIcon}>👋</span>
                      <span className={styles.loggedOutTitle}>You're logged out</span>
                      <button
                        className={styles.loginBtn}
                        onClick={() => { setLoggedIn(true); setAccountOpen(false) }}
                      >
                        Log in
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---- 3. Tutorial tip dropdown ---- */}
        <section className={styles.section}>
          <div className={styles.sectionLabel}>3. Tutorial callout</div>
          <p className={styles.sectionSub}>Drops down to explain a feature during first use — dismissible, sequential.</p>

          <div className={styles.mockDashboard}>
            <div className={styles.mockToolbar}>
              <div className={`${styles.mockToolbarItem} ${tutorialStep === 1 ? styles.mockToolbarItemHighlight : ''}`}>
                ⏱️ Start Session
                {tutorialStep === 1 && (
                  <div className={styles.tutorialTip}>
                    <div className={styles.tutorialArrow} />
                    <span className={styles.tutorialBadge}>1 of 2</span>
                    <strong>Start your first session</strong>
                    <p>Tap here anytime to begin a timed focus block with optional ambient sound.</p>
                    <div className={styles.tutorialActions}>
                      <button className={styles.tutorialSkip} onClick={() => setTutorialStep(0)}>Skip</button>
                      <button className={styles.tutorialNext} onClick={() => setTutorialStep(2)}>Next →</button>
                    </div>
                  </div>
                )}
              </div>
              <div className={`${styles.mockToolbarItem} ${tutorialStep === 2 ? styles.mockToolbarItemHighlight : ''}`}>
                📊 Analytics
                {tutorialStep === 2 && (
                  <div className={styles.tutorialTip}>
                    <div className={styles.tutorialArrow} />
                    <span className={styles.tutorialBadge}>2 of 2</span>
                    <strong>Track your progress</strong>
                    <p>Your weekly focus trends, streaks, and category breakdown all live here.</p>
                    <div className={styles.tutorialActions}>
                      <button className={styles.tutorialSkip} onClick={() => setTutorialStep(0)}>Skip</button>
                      <button className={styles.tutorialNext} onClick={() => setTutorialStep(0)}>Finish</button>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.mockToolbarItem}>⚙️ Settings</div>
            </div>
            <div className={styles.mockDashboardBody}>
              {tutorialStep === 0 && (
                <button className={styles.restartTutorial} onClick={() => setTutorialStep(1)}>
                  ↻ Replay tutorial
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}