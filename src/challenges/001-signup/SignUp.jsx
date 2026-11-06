import { useState } from 'react'
import styles from './signup.module.css'

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    agree: false,
  })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const passwordStrength = () => {
    const p = form.password
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  }

  const strength = passwordStrength()
  const strengthLabel = ['Weak', 'Weak', 'Okay', 'Good', 'Strong'][strength]

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in every field.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (!form.agree) {
      setError('Please accept the terms to continue.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
    }, 1400)
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.blob} ${styles['blob-a']}`} />
      <div className={`${styles.blob} ${styles['blob-b']}`} />
      <div className={`${styles.blob} ${styles['blob-c']}`} />

      <div className={styles.card}>
        {!done ? (
          <>
            <div className={styles.badge}>#DailyUI 001</div>
            <h1>Join the Sprint 🚀</h1>
            <p className={styles.subtitle}>
              Sign up to enter this week's design giveaway.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=" "
                  value={form.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">Full name</label>
              </div>

              <div className={styles.field}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" "
                  value={form.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email address</label>
              </div>

              <div className={styles.field}>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder=" "
                  value={form.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className={styles['toggle-pass']}
                  onClick={() => setShowPass((s) => !s)}
                  tabIndex={-1}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>

              {form.password && (
                <div className={styles.strength}>
                  <div className={styles['strength-bar']}>
                    <span style={{ width: `${strength * 25}%` }} data-level={strength} />
                  </div>
                  <span className={styles['strength-label']}>{strengthLabel}</span>
                </div>
              )}

              <div className={styles.field}>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="confirm"
                  id="confirm"
                  placeholder=" "
                  value={form.confirm}
                  onChange={handleChange}
                />
                <label htmlFor="confirm">Confirm password</label>
              </div>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                <span className={styles['custom-box']} />
                I agree to the terms &amp; privacy policy
              </label>

              {error && <div className={styles.error}>{error}</div>}

              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : 'Create account'}
              </button>

              <div className={styles.divider}><span>or continue with</span></div>

              <div className={styles.social}>
                <button type="button" className={styles['social-btn']}>🌐 Google</button>
                <button type="button" className={styles['social-btn']}>🐙 GitHub</button>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.check}>✓</div>
            <h1>You're in!</h1>
            <p className={styles.subtitle}>
              Welcome aboard, {form.name.split(' ')[0] || 'friend'}. Check your
              inbox for a confirmation link.
            </p>
            <button className={styles.submit} onClick={() => setDone(false)}>
              Back to form
            </button>
          </div>
        )}
      </div>
    </div>
  )
}