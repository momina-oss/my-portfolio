import { useState } from 'react'
import styles from './subscribe.module.css'

const plans = [
  { id: 'monthly', name: 'Monthly', price: 8.99, period: '/mo', badge: null },
  { id: 'annual', name: 'Annual', price: 5.99, period: '/mo', badge: 'Save 33%', billedAs: 'Billed $71.88 yearly' },
  { id: 'family', name: 'Family', price: 12.99, period: '/mo', badge: 'Up to 5 profiles' },
]

export default function Subscribe() {
  const [mode, setMode] = useState('widget') // 'button' | 'widget'
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('annual')
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: 'Pakistan',
    ageConfirmed: false,
    marketingOptIn: true,
  })
  const [payment, setPayment] = useState({ card: '', expiry: '', cvv: '' })
  const [subscribed, setSubscribed] = useState(false)
  const [errors, setErrors] = useState({})

  const plan = plans.find((p) => p.id === selectedPlan)

  const handleField = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const validateStep2 = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Enter your name'
    if (!form.email.includes('@')) errs.email = 'Enter a valid email'
    if (!form.ageConfirmed) errs.age = 'You must confirm you are 18 or older'
    return errs
  }

  const goToPayment = () => {
    const errs = validateStep2()
    setErrors(errs)
    if (Object.keys(errs).length === 0) setStep(3)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    setSubscribed(true)
  }

  const resetAll = () => {
    setStep(1)
    setSubscribed(false)
    setErrors({})
  }

  if (mode === 'button') {
    return (
      <div className={styles.page}>
        <div className={styles.modeSwitch}>
          <button className={styles.modeBtn} onClick={() => setMode('button')} data-active={mode === 'button'}>Simple button</button>
          <button className={styles.modeBtn} onClick={() => setMode('widget')} data-active={mode === 'widget'}>Full widget</button>
        </div>

        <div className={styles.buttonDemo}>
          <div className={styles.eyebrow}>Flowmode TV</div>
          <h2>The Deep Work Protocol</h2>
          <p className={styles.demoSub}>A 6-part guided series on building an undistractable daily rhythm.</p>
          <button className={styles.ctaBtn} onClick={() => setMode('widget')}>
            🔒 Subscribe to unlock — $5.99/mo
          </button>
          <span className={styles.miniNote}>Cancel anytime</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.modeSwitch}>
        <button className={styles.modeBtn} onClick={() => setMode('button')} data-active={mode === 'button'}>Simple button</button>
        <button className={styles.modeBtn} onClick={() => setMode('widget')} data-active={mode === 'widget'}>Full widget</button>
      </div>

      <div className={styles.widget}>
        {subscribed ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h2>You're subscribed!</h2>
            <p className={styles.demoSub}>
              Welcome to Flowmode TV {plan.name}. A confirmation was sent to {form.email}.
            </p>
            <button className={styles.primaryBtn} onClick={resetAll}>Start watching →</button>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className={styles.stepBar}>
              {[1, 2, 3].map((s) => (
                <div key={s} className={styles.stepItem}>
                  <span className={`${styles.stepDot} ${step >= s ? styles.stepDotActive : ''}`}>
                    {step > s ? '✓' : s}
                  </span>
                  {s < 3 && <span className={`${styles.stepLine} ${step > s ? styles.stepLineActive : ''}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Plan */}
            {step === 1 && (
              <div className={styles.stepContent}>
                <h2>Choose your plan</h2>
                <p className={styles.demoSub}>Subscribe to unlock every focus session, soundscape, and talk.</p>
                <div className={styles.planList}>
                  {plans.map((p) => (
                    <button
                      key={p.id}
                      className={`${styles.planOption} ${selectedPlan === p.id ? styles.planOptionActive : ''}`}
                      onClick={() => setSelectedPlan(p.id)}
                    >
                      <div className={styles.planRadio}>
                        <span className={selectedPlan === p.id ? styles.radioFilled : ''} />
                      </div>
                      <div className={styles.planInfo}>
                        <div className={styles.planTop}>
                          <span className={styles.planName}>{p.name}</span>
                          {p.badge && <span className={styles.planBadge}>{p.badge}</span>}
                        </div>
                        {p.billedAs && <span className={styles.planNote}>{p.billedAs}</span>}
                      </div>
                      <div className={styles.planPrice}>
                        ${p.price}<span>{p.period}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <button className={styles.primaryBtn} onClick={() => setStep(2)}>Continue</button>
              </div>
            )}

            {/* Step 2: Account details */}
            {step === 2 && (
              <div className={styles.stepContent}>
                <h2>Create your account</h2>
                <p className={styles.demoSub}>{plan.name} plan · ${plan.price}{plan.period}</p>

                <div className={styles.field}>
                  <label>Full name</label>
                  <input type="text" name="name" value={form.name} onChange={handleField} placeholder="Jane Doe" />
                  {errors.name && <span className={styles.err}>{errors.name}</span>}
                </div>

                <div className={styles.field}>
                  <label>Email address</label>
                  <input type="email" name="email" value={form.email} onChange={handleField} placeholder="you@email.com" />
                  {errors.email && <span className={styles.err}>{errors.email}</span>}
                </div>

                <div className={styles.field}>
                  <label>Country</label>
                  <select name="country" value={form.country} onChange={handleField}>
                    <option>Pakistan</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>United Arab Emirates</option>
                    <option>Canada</option>
                  </select>
                </div>

                <label className={styles.checkboxRow}>
                  <input type="checkbox" name="ageConfirmed" checked={form.ageConfirmed} onChange={handleField} />
                  <span className={styles.customCheck} />
                  I confirm I am 18 years of age or older
                </label>
                {errors.age && <span className={styles.err}>{errors.age}</span>}

                <label className={styles.checkboxRow}>
                  <input type="checkbox" name="marketingOptIn" checked={form.marketingOptIn} onChange={handleField} />
                  <span className={styles.customCheck} />
                  Send me tips, new releases, and offers
                </label>

                <div className={styles.stepActions}>
                  <button className={styles.secondaryBtn} onClick={() => setStep(1)}>Back</button>
                  <button className={styles.primaryBtn} onClick={goToPayment}>Continue to payment</button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className={styles.stepContent}>
                <h2>Payment details</h2>
                <p className={styles.demoSub}>{plan.name} plan · ${plan.price}{plan.period}{plan.billedAs ? ` · ${plan.billedAs}` : ''}</p>

                <form onSubmit={handleSubscribe}>
                  <div className={styles.field}>
                    <label>Card number</label>
                    <input
                      type="text" inputMode="numeric" placeholder="1234 5678 9012 3456"
                      value={payment.card}
                      onChange={(e) => setPayment((p) => ({ ...p, card: e.target.value }))}
                      required
                    />
                  </div>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label>Expiry</label>
                      <input
                        type="text" placeholder="MM/YY"
                        value={payment.expiry}
                        onChange={(e) => setPayment((p) => ({ ...p, expiry: e.target.value }))}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label>CVV</label>
                      <input
                        type="text" inputMode="numeric" placeholder="123"
                        value={payment.cvv}
                        onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.stepActions}>
                    <button type="button" className={styles.secondaryBtn} onClick={() => setStep(2)}>Back</button>
                    <button type="submit" className={styles.primaryBtn}>
                      Subscribe · ${plan.price}{plan.period}
                    </button>
                  </div>
                  <p className={styles.legalNote}>
                    By subscribing you agree to auto-renewal at the listed price until cancelled.
                  </p>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}