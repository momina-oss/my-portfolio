import { useState, useEffect } from 'react'
import styles from './landing.module.css'

const features = [
  {
    icon: '⚡',
    title: 'Instant focus sessions',
    desc: 'Start a deep-work block in one tap. Timers, ambient sound and app-blocking, all bundled together.',
  },
  {
    icon: '📊',
    title: 'Real insight, not vanity stats',
    desc: 'See exactly when your focus peaks during the day and plan your hardest work around it.',
  },
  {
    icon: '🔗',
    title: 'Works where you already do',
    desc: 'Native integrations for Slack, Notion, Linear and Google Calendar — no extra tabs required.',
  },
  {
    icon: '🛡️',
    title: 'Distraction-proof by default',
    desc: 'Site & app blocking that actually sticks, with a cooldown so you can\'t talk yourself out of it.',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    features: ['3 focus sessions / day', 'Basic insights', 'Calendar sync'],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/ month',
    features: ['Unlimited sessions', 'Deep insights & trends', 'All integrations', 'Priority support'],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Team',
    price: '$7',
    period: '/ user / month',
    features: ['Everything in Pro', 'Shared team dashboards', 'Admin controls', 'SSO'],
    cta: 'Talk to sales',
    highlight: false,
  },
]

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubmitted(true)
  }

  return (
    <div className={styles.page}>
      {/* NAV */}
      <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navInner}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>◆</span> Flowmode
          </div>
          <nav className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <button className={styles.navCta}>Get started</button>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.badge}>✨ Now with AI session planning</div>
        <h1 className={styles.headline}>
          Protect your best hours,<br />
          <span className={styles.gradientText}>every single day.</span>
        </h1>
        <p className={styles.subhead}>
          Flowmode blocks distractions, times your deep work, and shows you
          exactly when you're at your sharpest — so focus stops being a
          matter of willpower.
        </p>

        <form className={styles.heroForm} onSubmit={handleSubmit}>
          {submitted ? (
            <div className={styles.confirmMsg}>
              🎉 You're on the list — check {email} for next steps.
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="you@work.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.primaryBtn}>
                Get started free →
              </button>
            </>
          )}
        </form>
        <p className={styles.microcopy}>No credit card required · 14-day Pro trial</p>

        <div className={styles.socialProof}>
          <div className={styles.avatars}>
            <span /><span /><span /><span />
          </div>
          <span>Trusted by 12,000+ focused teams</span>
        </div>

        {/* Product preview mock */}
        <div className={styles.previewWrap}>
          <div className={styles.previewChrome}>
            <span /><span /><span />
          </div>
          <div className={styles.previewBody}>
            <div className={styles.previewSidebar}>
              <div className={styles.previewDot} />
              <div className={styles.previewLine} style={{ width: '60%' }} />
              <div className={styles.previewLine} style={{ width: '80%' }} />
              <div className={styles.previewLine} style={{ width: '45%' }} />
            </div>
            <div className={styles.previewMain}>
              <div className={styles.previewTimer}>25:00</div>
              <div className={styles.previewBars}>
                {[40, 70, 55, 90, 65, 30, 85].map((h, i) => (
                  <div key={i} className={styles.previewBar} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className={styles.logoStrip}>
        <span>ORION</span>
        <span>NIMBUS</span>
        <span>VERTEX LABS</span>
        <span>CASCADE</span>
        <span>HALO</span>
      </section>

      {/* FEATURES */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHead}>
          <div className={styles.eyebrow}>Why Flowmode</div>
          <h2>Everything focus needs, nothing it doesn't</h2>
        </div>
        <div className={styles.featureGrid}>
          {features.map((f) => (
            <div className={styles.featureCard} key={f.title}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.sectionHead}>
          <div className={styles.eyebrow}>Pricing</div>
          <h2>Simple plans, cancel anytime</h2>
        </div>
        <div className={styles.pricingGrid}>
          {plans.map((p) => (
            <div
              className={`${styles.planCard} ${p.highlight ? styles.planHighlight : ''}`}
              key={p.name}
            >
              {p.highlight && <div className={styles.planBadge}>Most popular</div>}
              <div className={styles.planName}>{p.name}</div>
              <div className={styles.planPrice}>
                {p.price}<span>{p.period}</span>
              </div>
              <ul className={styles.planFeatures}>
                {p.features.map((feat) => (
                  <li key={feat}>✓ {feat}</li>
                ))}
              </ul>
              <button className={p.highlight ? styles.primaryBtn : styles.secondaryBtn}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaBanner}>
        <h2>Ready to protect your focus?</h2>
        <p>Join thousands of teams doing their best work with Flowmode.</p>
        <button className={styles.primaryBtnLight}>Start your free trial →</button>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>◆</span> Flowmode
        </div>
        <p>© 2026 Flowmode Inc. All rights reserved.</p>
      </footer>
    </div>
  )
}