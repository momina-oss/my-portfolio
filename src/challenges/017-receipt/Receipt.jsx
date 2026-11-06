import { useState } from 'react'
import styles from './receipt.module.css'

const items = [
  { name: 'Cedar & Smoke', variant: '8oz Candle', qty: 2, price: 28 },
  { name: 'Fig & Vetiver', variant: '10oz Candle', qty: 1, price: 34 },
  { name: 'Ceramic Matchbox', variant: 'Standard', qty: 1, price: 18 },
]

export default function Receipt() {
  const [copied, setCopied] = useState(false)
  const [rated, setRated] = useState(0)

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0)
  const shipping = subtotal >= 50 ? 0 : 6.5
  const tax = +(subtotal * 0.08).toFixed(2)
  const total = +(subtotal + shipping + tax).toFixed(2)

  const orderNumber = 'EO-48291-PK'

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className={styles.page}>
      <div className={styles.receipt}>
        {/* ---- Top promo strip (underutilized space #1) ---- */}
        <div className={styles.topPromo}>
          🎉 Refer a friend and you both get <strong>15% off</strong> your next order
        </div>

        {/* ---- Vendor header ---- */}
        <div className={styles.header}>
          <div className={styles.logo}>🕯️ Ember &amp; Oak</div>
          <div className={styles.vendorInfo}>
            <span>142 Canal Bank Road, Lahore, PK</span>
            <span>+92 42 3555 0192 · hello@emberandoak.shop</span>
            <span>emberandoak.shop</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* ---- Order meta ---- */}
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Order number</span>
            <span className={styles.metaValue}>{orderNumber}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Date purchased</span>
            <span className={styles.metaValue}>Sep 24, 2026, 4:12 PM</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Payment method</span>
            <span className={styles.metaValue}>Visa •••• 4417</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Billed to</span>
            <span className={styles.metaValue}>Mina Khan</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* ---- Line items ---- */}
        <div className={styles.itemsBlock}>
          {items.map((it) => (
            <div className={styles.itemRow} key={it.name}>
              <div className={styles.itemThumb} />
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{it.name}</span>
                <span className={styles.itemVariant}>{it.variant} · Qty {it.qty}</span>
              </div>
              <span className={styles.itemPrice}>${(it.price * it.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        {/* ---- Totals ---- */}
        <div className={styles.totalsBlock}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.totalFinal}`}>
            <span>Total paid</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.perforation} />

        {/* ---- Shipping / tracking ---- */}
        <div className={styles.trackingBlock}>
          <div className={styles.trackingHeader}>
            <span>📦 Shipping to</span>
            <span className={styles.trackingStatus}>In transit</span>
          </div>
          <p className={styles.trackingAddress}>
            Mina Khan · 88 Gulberg III, Lahore, Punjab 54660, PK
          </p>
          <div className={styles.trackingRow}>
            <span className={styles.trackingLabel}>Tracking number</span>
            <button className={styles.trackingCopy} onClick={handleCopy}>
              <span className={styles.trackingNum}>TCS9284710558PK</span>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* ---- Support ---- */}
        <div className={styles.supportBlock}>
          <span className={styles.supportIcon}>💬</span>
          <div>
            <span className={styles.supportTitle}>Need help with this order?</span>
            <span className={styles.supportSub}>Contact support@emberandoak.shop or reply to this receipt</span>
          </div>
        </div>

        <div className={styles.perforation} />

        {/* ---- Feedback ask (bottom real estate #1) ---- */}
        <div className={styles.feedbackBlock}>
          <span className={styles.feedbackLabel}>How was your order?</span>
          <div className={styles.starRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`${styles.star} ${n <= rated ? styles.starFilled : ''}`}
                onClick={() => setRated(n)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* ---- QR + social (bottom real estate #2) ---- */}
        <div className={styles.bottomPromo}>
          <div className={styles.qrCode}>
            <div className={styles.qrGrid}>
              {Array.from({ length: 25 }).map((_, i) => (
                <span key={i} className={Math.random() > 0.5 ? styles.qrDark : ''} />
              ))}
            </div>
          </div>
          <div className={styles.promoText}>
            <span className={styles.promoTitle}>Follow @emberandoak</span>
            <span className={styles.promoSub}>Scan for new scent drops &amp; restock alerts</span>
          </div>
        </div>

        <p className={styles.footerNote}>
          Thank you for supporting a small, handmade business 🕯️<br />
          This receipt was generated automatically — no reply needed for records purposes.
        </p>
      </div>
    </div>
  )
}