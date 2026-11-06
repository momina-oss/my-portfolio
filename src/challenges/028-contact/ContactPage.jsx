import { useState } from 'react'
import styles from './contactpage.module.css'

const topics = [
  { id: 'billing', icon: '💳', label: 'Billing & subscriptions', desc: 'Refunds, plan changes, invoices' },
  { id: 'bug', icon: '🐛', label: 'Something\'s not working', desc: 'App issues, sync problems, bugs' },
  { id: 'sales', icon: '💼', label: 'Sales & teams', desc: 'Pricing for teams, demos' },
  { id: 'other', icon: '💬', label: 'Something else', desc: 'General questions & feedback' },
]

export default function ContactPage() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Enter your name'
    if (!form.email.includes('@')) errs.email = 'Enter a valid email'
    if (form.message.trim().length < 10) errs.message = 'Tell us a bit more (10+ characters)'
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSubmitted(true)
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Contact us</div>
          <h1>How can we help?</h1>
          <p className={styles.sub}>
            Most questions get a reply within a few hours. Pick a topic below
            to get to the right place faster.
          </p>
        </div>

        {/* Quick contact strip — critical info, not buried */}
        <div className={styles.quickRow}>
          <div className={styles.quickItem}>
            <span className={styles.quickIcon}>⚡</span>
            <div>
              <span className={styles.quickTitle}>Avg. response time</span>
              <span className={styles.quickValue}>Under 4 hours</span>
            </div>
          </div>
          <div className={styles.quickItem}>
            <span className={styles.quickIcon}>✉️</span>
            <div>
              <span className={styles.quickTitle}>Email us directly</span>
              <span className={styles.quickValue}>support@flowmode.app</span>
            </div>
          </div>
          <div className={styles.quickItem}>
            <span className={styles.quickIcon}>📍</span>
            <div>
              <span className={styles.quickTitle}>Based in</span>
              <span className={styles.quickValue}>Lahore, Pakistan</span>
            </div>
          </div>
        </div>

        {!submitted ? (
          <>
            {/* Topic selector */}
            <div className={styles.topicSection}>
              <span className={styles.topicLabel}>What's this about?</span>
              <div className={styles.topicGrid}>
                {topics.map((t) => (
                  <button
                    key={t.id}
                    className={`${styles.topicCard} ${selectedTopic === t.id ? styles.topicCardActive : ''}`}
                    onClick={() => setSelectedTopic(t.id)}
                  >
                    <span className={styles.topicIcon}>{t.icon}</span>
                    <span className={styles.topicTitle}>{t.label}</span>
                    <span className={styles.topicDesc}>{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form — only appears once a topic is picked, keeps page from feeling long */}
            {selectedTopic && (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formHeader}>
                  <span>{topics.find((t) => t.id === selectedTopic).icon}</span>
                  {topics.find((t) => t.id === selectedTopic).label}
                  <button
                    type="button"
                    className={styles.changeTopicBtn}
                    onClick={() => setSelectedTopic(null)}
                  >
                    Change
                  </button>
                </div>

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label>Your name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
                    {errors.name && <span className={styles.err}>{errors.name}</span>}
                  </div>
                  <div className={styles.field}>
                    <label>Email address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
                    {errors.email && <span className={styles.err}>{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={
                      selectedTopic === 'bug'
                        ? "What happened, and what did you expect instead? Include your device/OS if relevant."
                        : "Tell us what's going on..."
                    }
                  />
                  {errors.message && <span className={styles.err}>{errors.message}</span>}
                </div>

                <button type="submit" className={styles.submitBtn}>Send message</button>
              </form>
            )}
          </>
        ) : (
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h2>Message sent</h2>
            <p className={styles.sub}>
              Thanks, {form.name.split(' ')[0]} — we'll reply to {form.email} within a few hours.
            </p>
            <span className={styles.ticketId}>Reference: FM-{Math.floor(10000 + Math.random() * 90000)}</span>
          </div>
        )}

        {/* FAQ — deflects repeat questions without leaving the page */}
        <div className={styles.faqSection}>
          <span className={styles.faqLabel}>Common questions</span>
          <details className={styles.faqItem}>
            <summary>How do I cancel my subscription?</summary>
            <p>Go to Settings → Account → Manage subscription, then choose "Cancel plan." You'll keep access until the end of your billing period.</p>
          </details>
          <details className={styles.faqItem}>
            <summary>Can I use Flowmode on multiple devices?</summary>
            <p>Yes — your account syncs across up to 3 devices on the Pro plan, and unlimited devices on Team plans.</p>
          </details>
          <details className={styles.faqItem}>
            <summary>Do you offer refunds?</summary>
            <p>We offer full refunds within 14 days of a new subscription. Reach out via the Billing topic above and we'll take care of it.</p>
          </details>
        </div>
      </div>
    </div>
  )
}