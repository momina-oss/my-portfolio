import { useState } from 'react'
import styles from './pricing.module.css'

const plans = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Try the basics',
    monthly: 0,
    annual: 0,
    highlight: false,
    features: ['3 focus sessions / day', 'Basic weekly summary', '1 device'],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For individuals',
    monthly: 9,
    annual: 6.75,
    highlight: true,
    features: ['Unlimited focus sessions', 'Full analytics & trends', '3 devices', 'All ambient soundscapes', 'Priority support'],
  },
  {
    id: 'team',
    name: 'Team',
    tagline: 'For groups of 3+',
    monthly: 7,
    perUser: true,
    annual: 5.25,
    highlight: false,
    features: ['Everything in Pro', 'Shared team dashboard', 'Admin controls & SSO', 'Unlimited devices', 'Dedicated onboarding'],
  },
]

const comparisonRows = [
  { label: 'Focus sessions', free: '3 / day', pro: 'Unlimited', team: 'Unlimited' },
  { label: 'Devices', free: '1', pro: '3', team: 'Unlimited' },
  { label: 'Analytics history', free: '7 days', pro: 'Full history', team: 'Full history' },
  { label: 'Ambient soundscapes', free: '2 sounds', pro: 'All 20+', team: 'All 20+' },
  { label: 'Team dashboard', free: '—', pro: '—', team: '✓' },
  { label: 'Admin & SSO', free: '—', pro: '—', team: '✓' },
  { label: 'Support', free: 'Community', pro: 'Priority email', team: 'Priority + onboarding' },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>Pricing</div>
          <h1>Simple pricing, no surprises</h1>
          <p className={styles.sub}>
            Every plan shows its real price right here. No hidden fees, no
            "contact sales" required to find out what it costs.
          </p>

          <div className={styles.toggleRow}>
            <span className={!annual ? styles.toggleLabelActive : styles.toggleLabel}>Monthly</span>
            <button
              className={`${styles.toggle} ${annual ? styles.toggleOn : ''}`}
              onClick={() => setAnnual((a) => !a)}
              role="switch"
              aria-checked={annual}
            >
              <span className={styles.toggleKnob} />
            </button>
            <span className={annual ? styles.toggleLabelActive : styles.toggleLabel}>
              Annual <span className={styles.saveTag}>Save 25%</span>
            </span>
          </div>
        </div>

        {/* Plan cards */}
        <div className={styles.planGrid}>
          {plans.map((p) => {
            const price = annual ? p.annual : p.monthly
            return (
              <div className={`${styles.planCard} ${p.highlight ? styles.planCardHighlight : ''}`} key={p.id}>
                {p.highlight && <div className={styles.popularBadge}>Most popular</div>}

                <span className={styles.planName}>{p.name}</span>
                <span className={styles.planTagline}>{p.tagline}</span>

                <div className={styles.priceBlock}>
                  <span className={styles.priceCurrency}>$</span>
                  <span className={styles.priceValue}>{price % 1 === 0 ? price : price.toFixed(2)}</span>
                  <span className={styles.pricePeriod}>
                    /mo{p.perUser ? ' per user' : ''}
                  </span>
                </div>

                {annual && price > 0 && (
                  <span className={styles.billedNote}>
                    Billed ${(price * 12).toFixed(2)} yearly{p.perUser ? ' per user' : ''}
                  </span>
                )}
                {!annual && price === 0 && (
                  <span className={styles.billedNote}>Free forever, no card required</span>
                )}
                {!annual && price > 0 && (
                  <span className={styles.billedNote}>Billed monthly, cancel anytime</span>
                )}

                <ul className={styles.featureList}>
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className={styles.checkIcon}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={p.highlight ? styles.ctaPrimary : styles.ctaSecondary}>
                  {p.id === 'free' ? 'Start free' : `Choose ${p.name}`}
                </button>
              </div>
            )
          })}
        </div>

        {/* Transparent comparison table */}
        <div className={styles.comparisonSection}>
          <h2>Compare every detail</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thFeature}></th>
                  <th>Free</th>
                  <th className={styles.thHighlight}>Pro</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td className={styles.tdFeature}>{row.label}</td>
                    <td>{row.free}</td>
                    <td className={styles.tdHighlight}>{row.pro}</td>
                    <td>{row.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Explicit no-surprises footnote */}
        <div className={styles.trustRow}>
          <div className={styles.trustItem}>
            <span>💳</span> No credit card required for Free
          </div>
          <div className={styles.trustItem}>
            <span>🔓</span> Cancel or downgrade anytime
          </div>
          <div className={styles.trustItem}>
            <span>🧾</span> Prices shown include everything — no add-on fees
          </div>
        </div>
      </div>
    </div>
  )
}