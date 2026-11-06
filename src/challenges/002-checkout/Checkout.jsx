import { useState } from 'react'
import styles from './checkout.module.css'

const cardBrand = (number) => {
  const n = number.replace(/\s/g, '')
  if (/^4/.test(n)) return 'visa'
  if (/^5[1-5]/.test(n)) return 'mastercard'
  if (/^3[47]/.test(n)) return 'amex'
  if (/^6(?:011|5)/.test(n)) return 'discover'
  return 'generic'
}

const formatCardNumber = (value, brand) => {
  const digits = value.replace(/\D/g, '')
  if (brand === 'amex') {
    return digits.slice(0, 15).replace(/(\d{4})(\d{0,6})(\d{0,5})/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(' ')
    )
  }
  return digits.slice(0, 16).replace(/(\d{4})/g, '$1 ').trim()
}

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

export default function Checkout() {
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  })
  const [flipped, setFlipped] = useState(false)
  const [errors, setErrors] = useState({})
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  const brand = cardBrand(card.number)
  const cvvLength = brand === 'amex' ? 4 : 3

  const handleChange = (e) => {
    const { name, value } = e.target
    let v = value

    if (name === 'number') v = formatCardNumber(value, brand)
    if (name === 'expiry') v = formatExpiry(value)
    if (name === 'cvv') v = value.replace(/\D/g, '').slice(0, cvvLength)
    if (name === 'name') v = value.toUpperCase().slice(0, 26)

    setCard((c) => ({ ...c, [name]: v }))
  }

  const validate = () => {
    const errs = {}
    const digits = card.number.replace(/\s/g, '')
    if (digits.length < (brand === 'amex' ? 15 : 16)) errs.number = 'Enter a valid card number'
    if (!card.name.trim()) errs.name = 'Enter the name on card'
    const [mm, yy] = card.expiry.split('/')
    if (!mm || !yy || mm.length < 2 || yy.length < 2 || +mm < 1 || +mm > 12) {
      errs.expiry = 'Enter a valid expiry'
    }
    if (card.cvv.length < cvvLength) errs.cvv = `Enter ${cvvLength}-digit CVV`
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return

    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      setPaid(true)
    }, 1600)
  }

  if (paid) {
    return (
      <div className={styles['checkout-page']}>
        <div className={`${styles['checkout-card']} ${styles['success-panel']}`}>
          <div className={styles.check}>✓</div>
          <h1>Payment successful</h1>
          <p className={styles.muted}>Your order total of $84.00 has been charged.</p>
          <button className={styles['pay-btn']} onClick={() => setPaid(false)}>
            Make another payment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles['checkout-page']}>
      <div className={styles['checkout-card']}>
        <h1>Checkout</h1>
        <p className={styles.muted}>Complete your purchase securely</p>

        <div className={styles['card-scene']}>
          <div
            className={`${styles['card-preview']} ${flipped ? styles.flipped : ''} ${styles['brand-' + brand]}`}
          >
            <div className={`${styles['card-face']} ${styles['card-front']}`}>
              <div className={styles['card-top']}>
                <span className={styles.chip} />
                <span className={styles['brand-label']}>{brand === 'generic' ? '' : brand}</span>
              </div>
              <div className={styles['card-number']}>
                {card.number || '•••• •••• •••• ••••'}
              </div>
              <div className={styles['card-bottom']}>
                <div>
                  <div className={styles['tiny-label']}>Card holder</div>
                  <div className={styles['card-name']}>{card.name || 'YOUR NAME'}</div>
                </div>
                <div>
                  <div className={styles['tiny-label']}>Expires</div>
                  <div className={styles['card-name']}>{card.expiry || 'MM/YY'}</div>
                </div>
              </div>
            </div>
            <div className={`${styles['card-face']} ${styles['card-back']}`}>
              <div className={styles['magnetic-strip']} />
              <div className={styles['signature-strip']}>
                <span>{card.cvv.replace(/./g, '•') || 'CVV'}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label>Card number</label>
            <input
              type="text"
              inputMode="numeric"
              name="number"
              placeholder="1234 5678 9012 3456"
              value={card.number}
              onChange={handleChange}
              onFocus={() => setFlipped(false)}
            />
            {errors.number && <span className={styles.err}>{errors.number}</span>}
          </div>

          <div className={styles.field}>
            <label>Name on card</label>
            <input
              type="text"
              name="name"
              placeholder="JOHN DOE"
              value={card.name}
              onChange={handleChange}
              onFocus={() => setFlipped(false)}
            />
            {errors.name && <span className={styles.err}>{errors.name}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Expiry date</label>
              <input
                type="text"
                inputMode="numeric"
                name="expiry"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={handleChange}
                onFocus={() => setFlipped(false)}
              />
              {errors.expiry && <span className={styles.err}>{errors.expiry}</span>}
            </div>

            <div className={`${styles.field} ${styles.cvv}`}>
              <label>CVV</label>
              <input
                type="text"
                inputMode="numeric"
                name="cvv"
                placeholder={cvvLength === 4 ? '1234' : '123'}
                value={card.cvv}
                onChange={handleChange}
                onFocus={() => setFlipped(true)}
                onBlur={() => setFlipped(false)}
              />
              {errors.cvv && <span className={styles.err}>{errors.cvv}</span>}
            </div>
          </div>

          <div className={styles.summary}>
            <div className={styles['summary-row']}>
              <span>Subtotal</span>
              <span>$79.00</span>
            </div>
            <div className={styles['summary-row']}>
              <span>Tax</span>
              <span>$5.00</span>
            </div>
            <div className={`${styles['summary-row']} ${styles.total}`}>
              <span>Total</span>
              <span>$84.00</span>
            </div>
          </div>

          <button type="submit" className={styles['pay-btn']} disabled={paying}>
            {paying ? <span className={styles.spinner} /> : 'Pay $84.00'}
          </button>

          <div className={styles['secure-note']}>🔒 Payments are encrypted and secure</div>
        </form>
      </div>
    </div>
  )
}